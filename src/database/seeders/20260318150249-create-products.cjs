"use strict";

module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete("products", null, {});

    await queryInterface.bulkInsert(
      "products",
      [
        {
          name: "Texas Burger",
          price: 2500, // em centavos
          path: null,
          category_id: 1,
          offer: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Cheeseburger",
          price: 2000,
          path: null,
          category_id: 1,
          offer: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Coca-Cola",
          price: 500,
          path: null,
          category_id: 2,
          offer: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Batata Frita",
          price: 800,
          path: null,
          category_id: 3,
          offer: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete("products", null, {});
  },
};
