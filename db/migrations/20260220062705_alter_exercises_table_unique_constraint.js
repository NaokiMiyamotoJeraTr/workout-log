exports.up = async (knex) => {
  await knex.schema.alterTable("exercises", (table) => {
    table.dropUnique(["name"]); // 既存unique削除
    table.unique(["user_id", "name"]); // 複合unique追加
  });
};

exports.down = async (knex) => {
  await knex.schema.alterTable("exercises", (table) => {
    table.dropUnique(["user_id", "name"]);
    table.unique(["name"]);
  });
};
