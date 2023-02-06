'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const gamersData = [
      {
        name: 'Boomerator2023',
        score: 100500,
      },
      {
        name: 'SergeyPetrovich',
        score: 10,
      },
    ];
    const gamers = gamersData.map((gamer) => ({
      ...gamer,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await queryInterface.bulkInsert('Gamers', gamers);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Gamers');
  },
};
