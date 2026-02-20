import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import { InputExercises } from "./components/InputExercises";
import { InputWorkouts } from "./components/InputWorkouts";
import { Home } from "./components/home";
import { Login } from "./components/Login";
import { Register } from "./components/register";

function App() {
  const [exercises, setExercises] = useState([]); //exercisesのデータ一覧が入るstate。
  const [workouts, setWorkouts] = useState([]); //筋トレ記録のデータ一覧が入るstate。
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

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

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Login
                user={user}
                password={password}
                setUser={setUser}
                setPassword={setPassword}
              />
            }
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/home"
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
