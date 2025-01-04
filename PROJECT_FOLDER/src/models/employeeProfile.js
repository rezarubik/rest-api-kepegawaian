module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "EmployeeProfile",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      employee_id: { type: DataTypes.INTEGER, allowNull: false },
      place_of_birth: DataTypes.STRING,
      date_of_birth: DataTypes.DATE,
      gender: DataTypes.ENUM("Laki-Laki", "Perempuan"),
      is_married: DataTypes.BOOLEAN,
      prof_pict: DataTypes.STRING,
      created_by: DataTypes.STRING,
      updated_by: DataTypes.STRING,
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("NOW()"), // Isi otomatis dengan waktu sekarang
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("NOW()"),
      },
    },
    {
      tableName: "employee_profile",
      timestamps: false,
    }
  );
};
