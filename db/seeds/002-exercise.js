// idをincrementで設定しているので、seedでは設定しないほうが良い。

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("sets").del();
  await knex("exercises").del();
  await knex.raw('TRUNCATE TABLE "exercises" RESTART IDENTITY CASCADE');
  await knex("exercises").insert([
    { user_id: 1, name: "ベンチプレス", target: "胸" },
    { user_id: 1, name: "スクワット", target: "脚" },
    { user_id: 1, name: "デッドリフト", target: "背中" },
    { user_id: 2, name: "オーバーヘッドプレス", target: "肩" },
    { user_id: 2, name: "懸垂", target: "背中" },
  ]);
};
