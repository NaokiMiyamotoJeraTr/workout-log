import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import { ShowExercises } from "./components/ShowExercises";
import { InputExercises } from "./components/InputExercises";
import { ShowWorkouts } from "./components/ShowWorkouts";
import { InputWorkouts } from "./components/InputWorkouts";
import { Home } from "./components/home";

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
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Home exercises={exercises} workouts={workouts} />}
          />
          <Route path="/add-exercise" element={<InputExercises />} />
          <Route
            path="/add-workout"
            element={<InputWorkouts exercises={exercises} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
