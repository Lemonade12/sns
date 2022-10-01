module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "tag",
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      tableName: "tag",
      charset: "utf8mb4",
    }
  );
};
