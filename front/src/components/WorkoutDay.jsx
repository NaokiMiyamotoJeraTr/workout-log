export const WorkoutDay = (props) => {
  const { date, workouts } = props;
  return (
    <div>
      <h3>📅 {date}の記録 📅</h3>
      <table border={1}>
        <thead>
          <tr>
            <th>種目</th>
            <th>重量</th>
            <th>回数</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map((workout, index) => {
            return (
              <tr key={index}>
                <td>{workout.exercise}</td>
                <td>{workout.weight}kg</td>
                <td>{workout.reps}回</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
