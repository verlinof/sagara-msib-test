"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Inventory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Inventory.belongsTo(models.Clothes, {
        foreignKey: "clothesId",
        as: "clothes",
      });
    }
  }
  Inventory.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      clothesId: DataTypes.INTEGER,
      size: DataTypes.ENUM("XS", "S", "M", "L", "XL"),
      stock: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Inventory",
    }
  );
  return Inventory;
};
