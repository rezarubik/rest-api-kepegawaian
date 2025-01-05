const { sequelize } = require("../models");

const getEmployeeReport = async (req, res) => {
  try {
    const query = `
      SELECT
        employee.id as employee_id,
        employee.nik,
        employee.name,
        employee.is_active,
        employee_profile.gender as gender,
        DATE_PART('year', AGE(employee_profile.date_of_birth)) || ' Years Old' AS age,
        education.name as school_name,
        education.level,
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
        employee_profile.gender, employee_profile.date_of_birth,
        education.name, education.level
      ORDER BY
        employee.id;
    `;

    const result = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });
    res.status(200).json({
      message: "Success Get Employee Report",
      total: result.length,
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getEmployeeReport,
};
