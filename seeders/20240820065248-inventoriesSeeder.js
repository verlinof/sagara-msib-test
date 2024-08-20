"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert("Inventories", [
      {
        clothesId: 1,
        size: "S",
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        clothesId: 1,
        size: "M",
        stock: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        clothesId: 1,
        size: "L",
        stock: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        clothesId: 2,
        size: "S",
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        clothesId: 2,
        size: "M",
        stock: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        clothesId: 2,
        size: "L",
        stock: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        clothesId: 3,
        size: "M",
        stock: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        clothesId: 3,
        size: "L",
        stock: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
