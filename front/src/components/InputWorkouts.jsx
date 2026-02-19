import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const InputWorkouts = (props) => {
  const { exercises } = props;
  let navigate = useNavigate();

  const [sets, setSets] = useState([]);
  const [exerciseId, setexerciseId] = useState("");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [lastWorkouts, setLastWorkouts] = useState([]);

  const handleAddSet = () => {
    if (!exerciseId || !weight || !reps) {
      alert("全部入力してください");
      return;
    }
    const newSet = {
      exercise_id: Number(exerciseId),
      weight: Number(weight),
      reps: Number(reps),
    };

    setSets([...sets, newSet]);
  };

  const handleSubmit = async () => {
    if (sets.length === 0) {
      alert("setを入力してください");
      return;
    }

    const payload = {
      date: new Date().toISOString().slice(0, 10),
      sets: sets,
    };

    await fetch("/api/workouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  };

  useEffect(() => {
    const getLastWorkouts = async () => {
      const res = await fetch(`/api/exercises/${exerciseId}`);
      const lastWorkoutsData = await res.json();
      setLastWorkouts(lastWorkoutsData);
    };
    getLastWorkouts();
  }, [exerciseId]);

  return (
    <div className="card">
      <form>
        <select size="1" onChange={(e) => setexerciseId(e.target.value)}>
          <option value="">メニューを選択</option>
          {exercises.map((exercise) => {
            return (
              <option key={exercise.id} value={exercise.id}>
                {exercise.name}
              </option>
            );
          })}
        </select>
        <input
          type="number"
          placeholder="重量"
          onChange={(e) => {
            setWeight(e.target.value || 0);
          }}
        />

        <input
          type="number"
          placeholder="回数"
          onChange={(e) => {
            setReps(e.target.value);
          }}
        />
      </form>
      {lastWorkouts.length > 0 && (
        <div>
          <h3>これまでの記録</h3>
          <ul>
            {lastWorkouts.map((lastWorkout, index) => (
              <li key={index}>
                {lastWorkout.weight}kg / {lastWorkout.reps}回 実施日：
                {lastWorkout.date}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button onClick={handleAddSet}>セット登録</button>
      <button onClick={() => navigate("/")}>Homeに戻る</button>

      <br></br>

      {sets.length === 0 ? (
        <div></div>
      ) : (
        <>
          <h3>登録予定セット</h3>
          <ul>
            {sets.map((set, index) => {
              const exercise = exercises.find(
                (ex) => ex.id === set.exercise_id,
              );

              return (
                <li key={index}>
                  {exercise?.name} / {set.weight}kg / {set.reps}回
                </li>
              );
            })}
          </ul>
          <button
            onClick={() => {
              if (confirm("記録を登録してもよいですか？")) {
                handleSubmit();
              }
            }}
          >
            今日の記録を登録
          </button>
        </>
      )}
    </div>
  );
};
