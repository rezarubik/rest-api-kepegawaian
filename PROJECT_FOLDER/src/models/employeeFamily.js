module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "EmployeeFamily",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      employee_id: { type: DataTypes.INTEGER, allowNull: false },
      name: DataTypes.STRING,
      identifier: DataTypes.STRING,
      job: DataTypes.STRING,
      place_of_birth: DataTypes.STRING,
      date_of_birth: DataTypes.DATE,
      religion: DataTypes.ENUM(
        "Islam",
        "Katolik",
        "Buda",
        "Protestan",
        "Konghucu"
      ),
      is_life: DataTypes.BOOLEAN,
      is_divorced: DataTypes.BOOLEAN,
      relation_status: DataTypes.ENUM("Suami", "Istri", "Anak", "Anak Sambung"),
      created_by: DataTypes.STRING,
      updated_by: DataTypes.STRING,
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("NOW()"),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("NOW()"),
      },
    },
    {
      tableName: "employee_family",
      timestamps: false,
    }
  );
};
