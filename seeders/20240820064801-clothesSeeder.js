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

    await queryInterface.bulkInsert("Clothes", [
      {
        name: "Kemeja Thxinsomnia",
        color: "Merah",
        price: 100000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Kemeja Thxinsomnia",
        color: "Hijau",
        price: 120000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Kemeja Thxinsomnia",
        color: "Biru",
        price: 130000,
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
