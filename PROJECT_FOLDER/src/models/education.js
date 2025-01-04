module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Education",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      employee_id: { type: DataTypes.INTEGER, allowNull: false },
      name: DataTypes.STRING,
      level: DataTypes.ENUM(
        "TK",
        "SD",
        "SMP",
        "SMA",
        "Strata 1",
        "Strata 2",
        "Doktor",
        "Profesor"
      ),
      description: DataTypes.STRING,
      created_by: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "admin",
      },
      updated_by: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "admin",
      },
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
      tableName: "education",
      timestamps: false,
    }
  );
};
