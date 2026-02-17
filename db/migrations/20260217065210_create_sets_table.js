/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
  await knex.schema.createTable("sets", (table) => {
    table.increments("id").primary();
    table
      .integer("exercise_id")
      .notNullable()
      .references("id")
      .inTable("exercises");
    table
      .integer("workout_id")
      .notNullable()
      .references("id")
      .inTable("workouts");
    table.decimal("weight", 5, 2);
    table.integer("reps").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
  await knex.schema.dropTable("sets");
};
