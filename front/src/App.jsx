import { useState, useEffect } from "react";
// import "./App.css";
import { ShowExercises } from "./components/ShowExercises";
import { InputExercises } from "./components/InputExercises";
import { ShowWorkouts } from "./components/ShowWorkouts";

function App() {
  const [exercises, setExercises] = useState([]); //exercisesのデータ一覧が入るstate。
  const [workouts, setWorkouts] = useState([]); //筋トレ記録のデータ一覧が入るstate。

  const getExercises = async () => {
    const res = await fetch("/api/exercises");
    const data = await res.json();
    setExercises(data.exercises);
  };

  const getWorkouts = async () => {
    const res = await fetch("/api/workouts");
    const data = await res.json();
    setWorkouts(data.workouts);
  };

  useEffect(() => {
    getExercises();
    getWorkouts();
  }, []);

  // 筋トレメニュー一が追加された時も筋トレメニュー一覧を取得するように調整
  // useEffect(() => {
  //   getExercises();
  // }, [exercises]);

  return (
    <>
      <div className="workout_log">
        <h1 className="title">Welcome to the Workout Log Apps!</h1>
        <p className="read-the-docs">頑張って運動していきましょう！</p>
        <h2>筋トレメニュー一覧</h2>
        <ShowExercises exercises={exercises} />
        <InputExercises />
        <h2>筋トレ記録</h2>
        <ShowWorkouts workouts={workouts} />
      </div>
    </>
  );
}

export default App;
