SELECT
    employee.id AS employee_id,
    employee.nik,
    employee.name,
    employee.is_active,
    employee_profile.gender AS gender,
    DATE_PART('year', AGE(employee_profile.date_of_birth)) || ' Years Old' AS age,
    STRING_AGG(DISTINCT CONCAT(education.name, ' (', education.level, ')'), ', ') AS school_name_and_level,
    CASE
        WHEN COALESCE(SUM(CASE WHEN employee_family.relation_status = 'Istri' THEN 1 ELSE 0 END), 0) = 0
        THEN '-'
        ELSE CONCAT(
            COALESCE(SUM(CASE WHEN employee_family.relation_status = 'Istri' THEN 1 ELSE 0 END), 0), ' Istri',
            CASE WHEN SUM(CASE WHEN employee_family.relation_status = 'Anak' THEN 1 ELSE 0 END) > 0 
                 THEN CONCAT(' & ', SUM(CASE WHEN employee_family.relation_status = 'Anak' THEN 1 ELSE 0 END), ' Anak') 
                 ELSE '' 
            END
        )
    END AS "family_data"
FROM
    employee
JOIN
    employee_profile ON employee_profile.employee_id = employee.id
LEFT JOIN
    employee_family ON employee_family.employee_id = employee.id
LEFT JOIN
    education ON education.employee_id = employee.id
GROUP BY
    employee.id, employee.nik, employee.name, employee.is_active, 
    employee_profile.gender, employee_profile.date_of_birth
ORDER BY
    employee.id;
