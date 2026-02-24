const path = require("path");
const express = require("express");
const knex = require("./src/knex"); //knexのデータベースをゲット
const session = require("express-session");

function buildApp() {
  const app = express();

  // publicフォルダの中のファイルをそのままwebで見られるようにする設定
  app.use(express.static(path.join(__dirname, "/public")));

  app.use(express.json());

  //セッションの設定
  app.use(
    session({
      secret: "my-secret-key",
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: false,
        httpOnly: false,
      },
    }),
  );

  //exercises種目一覧の取得
  app.get("/api/:userId/exercises", async (req, res) => {
    const userId = Number(req.params.userId);
    const exercises = await knex("exercises")
      .where({ user_id: userId })
      .select("*");
    res.status(200).json({ exercises: exercises });
  });

  //指定された種目の前回のメニューを取得するAPI
  app.get("/api/:userId/exercises/:id/", async (req, res) => {
    const userId = Number(req.params.userId);
    const id = Number(req.params.id);
    const lastWorkout = await knex("sets")
      .join("workouts", "sets.workout_id", "workouts.id")
      .where("sets.exercise_id", id)
      .andWhere("workouts.user_id", userId)
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
  app.post("/api/:userId/exercises", async (req, res) => {
    const userId = Number(req.params.userId);
    const payload = req.body;
    const existingExercise = await knex("exercises")
      .where({ user_id: userId, name: payload.exercise })
      .first();

    if (existingExercise) {
      return res.status(409).json({
        message: "この筋トレメニューはすでに登録されています",
      });
    }

    await knex("exercises").insert({
      user_id: userId,
      name: payload.exercise,
      target: payload.target,
    });

    return res.status(201).json({
      message: "種目登録完了",
    });
  });

  // worukoutの記録を表示するAPI
  app.get("/api/:userId/workouts", async (req, res) => {
    const userId = Number(req.params.userId);
    const data = await knex("workouts")
      .where({ "workouts.user_id": userId })
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
  app.post("/api/:userId/workouts", async (req, res) => {
    const userId = Number(req.params.userId);
    const payload = req.body;

    const registeredDate = await knex("workouts")
      .insert({ user_id: userId, date: payload.date })
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

  // user登録をするAPI
  app.post("/api/register", async (req, res) => {
    const payload = req.body;

    const crypto = require("crypto");
    const salt = crypto.randomBytes(6).toString("hex");
    const saltAndPassword = `${salt}${payload.password}`;
    const hash = crypto.createHash("sha256");
    const hashedPassword = hash.update(saltAndPassword).digest("hex");

    if (!payload.name || !payload.password) {
      return res.status(400).json({
        message: "name と password は必須です",
      });
    }

    const existingUser = await knex("users")
      .where({ name: payload.name })
      .first();

    if (existingUser) {
      return res.status(409).json({
        message: "そのユーザーはすでに登録されています",
      });
    }

    await knex("users").insert({
      name: payload.name,
      password: hashedPassword, //hash化
      salt: salt,
    });

    return res.status(200).json({
      message: "ユーザー登録完了",
    });
  });

  // ログインするAPI
  app.post("/api/login", async (req, res) => {
    const payload = req.body;

    if (!payload.name || !payload.password) {
      return res.status(400).json({
        message: "name と password は必須です",
      });
    }

    const existingUser = await knex("users")
      .where({ name: payload.name })
      .first();

    if (!existingUser) {
      return res.status(400).json({
        message: "そのユーザーは登録していません",
      });
    }

    const crypto = require("crypto");

    const hashedInputPassword = crypto
      .createHash("sha256")
      .update(`${existingUser.salt}${payload.password}`)
      .digest("hex");

    if (existingUser.password !== hashedInputPassword) {
      return res.status(401).json({
        message: "パスワードが間違っています",
      });
    } else {
      req.session.user = {
        id: existingUser.id,
        name: existingUser.name,
      };
      return res.status(200).json({
        message: "ログイン成功",
        user: {
          id: existingUser.id,
          name: existingUser.name,
        },
      });
    }
  });

  return app;
}

//ログアウトAPI
app.post("/api/logout", (req, res) => {
  req.session.destroy(() => {
    res.status(200).json({ message: "ログアウトしました" });
  });
});

module.exports = { buildApp };
