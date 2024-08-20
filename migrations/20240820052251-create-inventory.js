"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Inventories", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      clothesId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Clothes",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      },
      size: {
        type: Sequelize.ENUM("XS", "S", "M", "L", "XL"),
      },
      stock: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // Add unique constraint on clothesId and size
    // await queryInterface.addConstraint("Inventories", {
    //   fields: ["clothesId", "size"],
    //   type: "unique",
    //   name: "unique_clothes_size_constraint", // Optional: You can name the constraint
    // });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Inventories");
  },
};
