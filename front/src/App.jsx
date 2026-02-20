import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import { InputExercises } from "./components/InputExercises";
import { InputWorkouts } from "./components/InputWorkouts";
import { Home } from "./components/home";
import { Login } from "./components/Login";
import { Register } from "./components/Register";

function App() {
  const [exercises, setExercises] = useState([]); //exercisesのデータ一覧が入るstate。
  const [workouts, setWorkouts] = useState([]); //筋トレ記録のデータ一覧が入るstate。
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [userID, setUserID] = useState("");

  const getExercises = async () => {
    const res = await fetch(`/api/${userID}/exercises`);
    const data = await res.json();
    setExercises(data.exercises);
  };

  const getWorkouts = async () => {
    const res = await fetch(`/api/${userID}/workouts`);
    const data = await res.json();
    setWorkouts(data.workouts);
  };

  useEffect(() => {
    if (!userID) return;

    getExercises();
    getWorkouts();
  }, [userID]);

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
                setUserID={setUserID}
              />
            }
          />
          <Route
            path="/register"
            element={
              <Register
                user={user}
                password={password}
                setUser={setUser}
                setPassword={setPassword}
              />
            }
          />
          <Route
            path="/home"
            element={
              <Home exercises={exercises} workouts={workouts} userID={userID} />
            }
          />
          <Route
            path="/add-exercise"
            element={
              <InputExercises userID={userID} getExercises={getExercises} />
            }
          />
          <Route
            path="/add-workout"
            element={
              <InputWorkouts
                exercises={exercises}
                userID={userID}
                getWorkouts={getWorkouts}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
