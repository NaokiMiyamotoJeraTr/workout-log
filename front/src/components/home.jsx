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
      <h2>筋トレメニュー一覧</h2>
      <ShowExercises exercises={exercises} />
      <button onClick={() => navigate("/add-exercise")}>＋追加</button>
      <h2>筋トレ記録</h2>
      <ShowWorkouts workouts={workouts} />
      <button onClick={() => navigate("/add-workout")}>＋記録</button>
      {/* <div>今日の記録追加↓</div>
      <InputWorkouts exercises={exercises} /> */}
    </div>
  );
};
