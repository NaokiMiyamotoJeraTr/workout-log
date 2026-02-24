/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  // await knex("sets").del();
  await knex.raw('TRUNCATE TABLE "sets" RESTART IDENTITY CASCADE');
  await knex("sets").insert([
    // Workout 1
    { workout_id: 1, exercise_id: 1, weight: 70.0, reps: 10 },
    { workout_id: 1, exercise_id: 1, weight: 80.0, reps: 8 },
    { workout_id: 1, exercise_id: 2, weight: 100.0, reps: 5 },

    // Workout 2
    { workout_id: 2, exercise_id: 3, weight: 120.0, reps: 5 },
    { workout_id: 2, exercise_id: 4, weight: 30.0, reps: 10 },

    // Workout 3
    { workout_id: 3, exercise_id: 5, weight: 0.0, reps: 15 },
    { workout_id: 3, exercise_id: 1, weight: 70.0, reps: 6 },
  ]);
};
