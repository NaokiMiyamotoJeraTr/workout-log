const path = require("path");
const express = require("express");
const knex = require("./knex"); //knexのデータベースをゲット

function buildApp() {
  const app = express();

  // publicフォルダの中のファイルをそのままwebで見られるようにする設定
  app.use(express.static(path.join(__dirname, "/public")));

  //exercises種目一覧の取得
  app.get("/exercises", async (req, res) => {
    const exercises = await knex("exercises").select("*");
    res.status(200).json({ exercises: exercises });
  });

  // exercise種目登録のAPI
  // app.post("/exercises", (ree, res));

  // workoutの記録を保存するAPI
  // app.post("/workouts", (rewq, res));

  return app;
}

module.exports = { buildApp };
