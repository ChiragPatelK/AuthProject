'use strict';

const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const saltRounds = 10;
    const plainPassword = "password123";
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "Admin User",
          email: "admin@example.com",
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Test User",
          email: "test@example.com",
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "John Doe",
          email: "john@example.com",
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Jane Doe",
          email: "jane@example.com",
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Rahul Sharma",
          email: "rahul@example.com",
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Amit Patel",
          email: "amit@example.com",
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Sneha Verma",
          email: "sneha@example.com",
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Karan Mehta",
          email: "karan@example.com",
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Priya Singh",
          email: "priya@example.com",
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Dev Kapoor",
          email: "dev@example.com",
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  }
};
