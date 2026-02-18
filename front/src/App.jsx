import { useState, useEffect } from "react";
import "./App.css";
import { ShowExercises } from "./components/ShowExercises";

function App() {
  const [exercises, setExercises] = useState([]); //exercisesのデータ一覧が入るstate。

  const getExercises = async () => {
    const res = await fetch("/exercises");
    const data = await res.json();
    setExercises(data.exercises);
  };

  useEffect(() => {
    getExercises();
  }, []);

  return (
    <>
      <div className="workout_log">
        <h1 className="title">Welcome to the Workout Log Apps!</h1>
        <ShowExercises exercises={exercises} />
      </div>

      <p className="read-the-docs">頑張って運動していきましょう！</p>
    </>
  );
}

export default App;
