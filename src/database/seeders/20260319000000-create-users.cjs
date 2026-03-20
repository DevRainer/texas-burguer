"use strict";

const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, _Sequelize) {
    const passwordHash = await bcrypt.hash("123456", 6);

    await queryInterface.bulkDelete("users", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });

    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Rainer",
          email: "rainer@gmail.com",
          password_hash: passwordHash,
          admin: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
