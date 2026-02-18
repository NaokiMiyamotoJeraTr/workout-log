export const ShowExercises = (props) => {
  const { exercises } = props;
  return (
    <>
      <h2>筋トレメニュー一覧</h2>
      {exercises.map((exercise, index) => {
        return (
          <div key={index}>
            <p>
              {exercise.name}、{exercise.target}
            </p>
          </div>
        );
      })}
    </>
  );
};
