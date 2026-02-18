export const ShowExercises = (props) => {
  const { exercises } = props;
  return (
    <>
      <table border={1}>
        <thead>
          <tr>
            <th>メニュー</th>
            <th>ターゲット部位</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((exercise, index) => {
            return (
              <tr key={index}>
                <td>{exercise.name}</td>
                <td>{exercise.target}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
