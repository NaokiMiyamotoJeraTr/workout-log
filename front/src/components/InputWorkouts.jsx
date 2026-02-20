import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const InputWorkouts = (props) => {
  const { exercises, userID } = props;
  let navigate = useNavigate();

  const [sets, setSets] = useState([]);
  const [exerciseId, setExerciseId] = useState("");
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

    await fetch(`/api/${userID}/workouts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    setSets([]);
    setWeight("");
    setReps("");
    alert("登録完了！お疲れ様でした");
  };

  useEffect(() => {
    const getLastWorkouts = async () => {
      const res = await fetch(`/api/${userID}/exercises/${exerciseId}`);
      const lastWorkoutsData = await res.json();
      setLastWorkouts(lastWorkoutsData);
    };
    getLastWorkouts();
  }, [exerciseId, userID]);

  useEffect(() => {
    if (!userID) {
      navigate("/");
    }
  }, [navigate, userID]);

  const onClickDelete = (index) => {
    const newSets = [...sets];
    newSets.splice(index, 1);
    setSets(newSets);
  };

  return (
    <div className="card">
      <h2>トレーニング記録登録</h2>
      <p>種目を選択すると、前回の記録を参照できます</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddSet();
        }}
      >
        <div>
          <label>
            種目
            <select size="1" onChange={(e) => setExerciseId(e.target.value)}>
              <option value="">メニューを選択</option>
              {exercises.map((exercise) => {
                return (
                  <option key={exercise.id} value={exercise.id}>
                    {exercise.name}
                  </option>
                );
              })}
            </select>
          </label>
        </div>

        <div>
          <label>
            重量 (kg)
            <input
              type="number"
              placeholder="重量"
              onChange={(e) => {
                setWeight(e.target.value || 0);
              }}
            />
          </label>
        </div>

        <div>
          <label>
            回数
            <input
              type="number"
              placeholder="回数"
              onChange={(e) => {
                setReps(e.target.value);
              }}
            />
          </label>
        </div>
      </form>
      <button onClick={handleAddSet}>セット登録</button>
      <button onClick={() => navigate("/home")}>Homeに戻る</button>

      {lastWorkouts.length > 0 && (
        <div className="card">
          <h3>前回までの記録</h3>
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

      <br></br>

      {sets.length === 0 ? (
        <div></div>
      ) : (
        <div className="card">
          <h3>今日のトレーニング内容</h3>
          <ul>
            {sets.map((set, index) => {
              const exercise = exercises.find(
                (ex) => ex.id === set.exercise_id,
              );

              return (
                <li key={index}>
                  {exercise?.name} / {set.weight}kg / {set.reps}回
                  <button onClick={() => onClickDelete(index)}>削除🗑</button>
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
        </div>
      )}
    </div>
  );
};
