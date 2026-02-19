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
    { name: "ベンチプレス", target: "胸" },
    { name: "スクワット", target: "脚" },
    { name: "デッドリフト", target: "背中" },
    { name: "オーバーヘッドプレス", target: "肩" },
    { name: "懸垂", target: "背中" },
  ]);
};
