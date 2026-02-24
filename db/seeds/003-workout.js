/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  // await knex("workouts").del();
  await knex.raw('TRUNCATE TABLE "workouts" RESTART IDENTITY CASCADE');
  await knex("workouts").insert([
    { user_id: 1, date: "2026-02-15" },
    { user_id: 1, date: "2026-02-16" },
    { user_id: 2, date: "2026-02-17" },
  ]);
};
