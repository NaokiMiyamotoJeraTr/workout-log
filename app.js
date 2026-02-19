const path = require("path");
const express = require("express");
const knex = require("./knex"); //knexのデータベースをゲット

function buildApp() {
  const app = express();

  // publicフォルダの中のファイルをそのままwebで見られるようにする設定
  app.use(express.static(path.join(__dirname, "/public")));

  app.use(express.json());

  //exercises種目一覧の取得
  app.get("/api/exercises", async (req, res) => {
    const exercises = await knex("exercises").select("*");
    res.status(200).json({ exercises: exercises });
  });

  //指定された種目の前回のメニューを取得するAPI
  app.get("/api/exercises/:id/", async (req, res) => {
    const id = Number(req.params.id);
    const lastWorkout = await knex("sets")
      .join("workouts", "sets.workout_id", "workouts.id")
      .where("sets.exercise_id", id)
      .orderBy("workouts.date", "desc")
      .select("sets.weight", "sets.reps", "workouts.date");

    if (!lastWorkout) {
      return res.json([]);
    }
    const result = lastWorkout.map((ele) => {
      return {
        ...ele,
        date: ele["date"].toISOString().slice(0, 10), //日付処理の応急処置
      };
    });
    res.json(result);
  });

  // exercise種目登録のAPI
  app.post("/api/exercises", async (req, res) => {
    const payload = req.body;
    const existingExercise = await knex("exercises")
      .where({ name: payload.exercise })
      .first();

    if (existingExercise) {
      return res.status(409).json({
        message: "この筋トレメニューはすでに登録されています",
      });
    }

    console.log("送られてきた内容2", payload);
    await knex("exercises").insert({
      name: payload.exercise,
      target: payload.target,
    });
  });

  // worukoutの記録を表示するAPI
  app.get("/api/workouts", async (req, res) => {
    const data = await knex("workouts")
      .join("sets", "workouts.id", "sets.workout_id")
      .join("exercises", "sets.exercise_id", "exercises.id")
      .select(
        "workouts.id as workout_id",
        "workouts.date",
        "exercises.name as exercise",
        "sets.weight",
        "sets.reps",
      )
      .orderBy("workouts.date", "desc");
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
  // {
  //   "date": "2026-02-17",
  //   "sets": [
  //     { "exercise_id": 1, "weight": 100, "reps": 8 },
  //     { "exercise_id": 1, "weight": 95, "reps": 10 }
  //   ]
  // }
  app.post("/api/workouts", async (req, res) => {
    const payload = req.body;

    const registeredDate = await knex("workouts")
      .insert({ date: payload.date })
      .returning("*");
    for (const set of payload.sets) {
      await knex("sets").insert({
        workout_id: registeredDate[0].id,
        exercise_id: set.exercise_id,
        weight: set.weight,
        reps: set.reps,
      });
    }
    res.end();
  });

  return app;
}

module.exports = { buildApp };
