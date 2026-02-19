import { useState } from "react";

export const InputWorkouts = (props) => {
  const { exercises } = props;
  const [sets, setSets] = useState([]);
  const [exerciseId, setexerciseId] = useState("");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");

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

  return (
    <>
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

      <button onClick={handleAddSet}>セット登録</button>

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
    </>
  );
};
