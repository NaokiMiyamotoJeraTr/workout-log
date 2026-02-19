import { useNavigate } from "react-router-dom";
import { ShowExercises } from "./ShowExercises";
import { ShowWorkouts } from "./ShowWorkouts";

export const Home = (props) => {
  const { exercises, workouts } = props;
  let navigate = useNavigate();
  return (
    <div className="workout_log">
      <h1 className="title">Welcome to the Workout Log Apps!</h1>
      <p className="read-the-docs">頑張って運動していきましょう！</p>
      <div className="card">
        <h2>筋トレメニュー</h2>
        <button
          className="add-button"
          onClick={() => navigate("/add-exercise")}
        >
          ＋追加
        </button>
        <ShowExercises exercises={exercises} />
      </div>
      <div className="card">
        <h2>筋トレ記録</h2>
        <button className="add-button" onClick={() => navigate("/add-workout")}>
          ＋記録
        </button>
        <ShowWorkouts workouts={workouts} />
      </div>
    </div>
  );
};
