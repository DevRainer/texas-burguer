"use strict";

module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete("categories", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });

    await queryInterface.bulkInsert(
      "categories",
      [
        {
          name: "Hambúrgueres",
          path: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Bebidas",
          path: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Acompanhamentos",
          path: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
