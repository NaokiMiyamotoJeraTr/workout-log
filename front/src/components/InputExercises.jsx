import { useState } from "react";

export const InputExercises = (props) => {
  // const {} = props;
  const [exercise, setExercise] = useState("");
  const [target, setTarget] = useState("");

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
        throw new Error("登録失敗");
      }
      setExercise("");
      setTarget("");
    } catch (error) {
      console.error("エラー内容です", error);
    }
  };

  return (
    <>
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
    </>
  );
};
