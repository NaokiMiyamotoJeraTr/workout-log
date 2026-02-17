/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("workouts").del();
  await knex("workouts").insert([
    { date: "2026-02-15" },
    { date: "2026-02-16" },
    { date: "2026-02-17" },
  ]);
};
