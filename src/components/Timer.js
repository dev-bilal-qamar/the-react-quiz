import { useEffect } from "react";
import { useQuiz } from "../QuizContext/QuizContext";

export default function Timer() {
  const { totalTime, dispatch } = useQuiz();
  const mints = Math.floor(totalTime / 60);
  const sec = totalTime % 60;

  useEffect(() => {
    const timeStart = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => clearInterval(timeStart);
  }, [dispatch]);

  return (
    <div className="timer">
      {mints < 10 && "0"}
      {mints}:{sec < 10 && "0"}
      {sec}
    </div>
  );
}
