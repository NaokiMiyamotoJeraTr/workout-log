import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const InputExercises = () => {
  const [exercise, setExercise] = useState("");
  const [target, setTarget] = useState("");
  let navigate = useNavigate();

  const handleSubmit = async () => {
    if (!exercise) {
      alert("新しいメニューを登録してください");
      return;
    }
    const payload = {
      exercise: exercise,
      target: target,
    };

    try {
      const response = await fetch("/api/exercises", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message);
        return;
      }
      setExercise("");
      setTarget("");
    } catch (error) {
      console.error("エラー内容です", error);
    }
  };

  return (
    <>
      <h2>新しい種目登録</h2>
      <form>
        <input
          type="text"
          placeholder="メニュー名"
          value={exercise}
          onChange={(e) => {
            setExercise(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="ターゲット部位"
          value={target}
          onChange={(e) => {
            setTarget(e.target.value);
          }}
        />
      </form>
      <button onClick={handleSubmit}>追加</button>
      <button onClick={() => navigate("/")}>Homeに戻る</button>
    </>
  );
};
