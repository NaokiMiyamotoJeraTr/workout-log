// workout_log　DBへアクセスできるknexをexportする。
const config = require("../knexfile");
const env = process.env.NODE_ENV || "development";
const knex = require("knex")(config[env]); //knexのデータベースをゲット

module.exports = knex;
