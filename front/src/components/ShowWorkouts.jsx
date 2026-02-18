import { WorkoutDay } from "./WorkoutDay";

export const ShowWorkouts = (props) => {
  const { workouts } = props;
  // wokoutsを日付ごとのデータにまとめたい
  //   {
  //   "2026-02-16": [ ...workout ],
  //   "2026-02-15": [ ...workout ]
  // }のイメージ
  const grouped = workouts.reduce((acc, workout) => {
    if (!acc[workout.date]) {
      acc[workout.date] = [];
    }
    acc[workout.date].push(workout);
    return acc;
  }, {});

  //上記のものを下記の形に変換するイメージ
  //   [
  //   {
  //     date: "2026-02-16",
  //     items: [ ... ]
  //   },
  //   {
  //     date: "2026-02-15",
  //     items: [ ... ]
  //   }
  // ]
  const workoutsByDate = Object.entries(grouped).map(([date, workouts]) => ({
    date: date,
    workouts: workouts,
  }));

  return (
    <>
      {workoutsByDate.map((item) => {
        return (
          <WorkoutDay
            date={item.date}
            workouts={item.workouts}
            key={item.date}
          />
        );
      })}
    </>
  );
};
