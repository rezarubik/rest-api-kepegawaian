module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Employee",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nik: DataTypes.STRING,
      name: DataTypes.STRING,
      is_active: DataTypes.BOOLEAN,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
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
      tableName: "employee",
      timestamps: false,
    }
  );
};
