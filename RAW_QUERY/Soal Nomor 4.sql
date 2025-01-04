SELECT
	employee.id as employee_id
	, employee.nik
	, employee.name
	, employee.is_active
	, employee_profile.gender as gender
-- 	, employee_profile.date_of_birth as age
	, DATE_PART('year', AGE(employee_profile.date_of_birth)) || ' Years Old' AS age
	, education.name as school_name
	, education.level
	, CASE
        WHEN COALESCE(SUM(CASE WHEN employee_family.relation_status = 'Istri' THEN 1 ELSE 0 END), 0) = 0
        THEN '-'
        ELSE CONCAT(
            COALESCE(SUM(CASE WHEN employee_family.relation_status = 'Istri' THEN 1 ELSE 0 END), 0), ' Istri',
            CASE WHEN SUM(CASE WHEN employee_family.relation_status = 'Anak' THEN 1 ELSE 0 END) > 0 
                 THEN CONCAT(' & ', SUM(CASE WHEN employee_family.relation_status = 'Anak' THEN 1 ELSE 0 END), ' Anak') 
                 ELSE '' 
            END
        )
    END AS "family data"
FROM
	employee
JOIN
	employee_profile on employee_profile.employee_id = employee.id
LEFT JOIN
	employee_family on employee_family.employee_id = employee.id
LEFT JOIN
	education on education.employee_id = employee.id
GROUP BY
    employee.id, employee.nik, employee.name, employee.is_active, 
    employee_profile.gender, employee_profile.date_of_birth, 
    education.name, education.level
ORDER BY
    employee.id;