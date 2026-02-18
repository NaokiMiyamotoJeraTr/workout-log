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

  // worukoutの記録を表示するAPI
  app.get("/workouts", async (req, res) => {
    const data = await knex("workouts")
      .join("sets", "workouts.id", "sets.workout_id")
      .join("exercises", "sets.exercise_id", "exercises.id")
      .select(
        "workouts.id as workout_id",
        "workouts.date",
        "exercises.name as exercise",
        "sets.weight",
        "sets.reps",
      );
    const result = data.map((ele) => {
      return {
        ...ele,
        date: ele["date"].toISOString().slice(0, 10), //日付処理の応急処置
      };
    });
    // console.log("resultとは", result);
    res.status(200).json({ workouts: result });
  });

  // workoutの記録を保存するAPI
  // app.post("/workouts", (rewq, res));

  return app;
}

module.exports = { buildApp };
