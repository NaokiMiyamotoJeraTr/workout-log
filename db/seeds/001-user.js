/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex.raw('TRUNCATE TABLE "users" RESTART IDENTITY CASCADE');

  const crypto = require("crypto");
  const createUser = (name, plainPassword) => {
    const salt = crypto.randomBytes(6).toString("hex");
    const hashedPassword = crypto
      .createHash("sha256")
      .update(`${salt}${plainPassword}`)
      .digest("hex");

    return {
      name,
      password: hashedPassword,
      salt,
      created_at: knex.fn.now(),
    };
  };

  await knex("users").insert([
    createUser("testuser", "password123"),
    createUser("admin", "admin123"),
  ]);
};
