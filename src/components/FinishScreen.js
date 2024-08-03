import React from "react";
import { useQuiz } from "../QuizContext/QuizContext";

export default function FinishScreen() {
  const { points, totalPoints, highScore, dispatch, totalCorrectAnswer } =
    useQuiz();
  const percentage = (points / totalPoints) * 100;

  let emoji;

  if (percentage === 100) emoji = "🥇Excellent";
  if (percentage >= 80 && percentage < 100) emoji = "😍Good";
  if (percentage >= 50 && percentage < 80) emoji = "🤗Average";
  if (percentage >= 0 && percentage < 50) emoji = "🙁Poor";
  if (percentage === 0) emoji = "👎Bad";

  return (
    <React.Fragment>
      <p className="result">
        <span>{emoji}:</span> You scored <strong>{points}</strong> out of{" "}
        {totalPoints} ({Math.ceil(percentage)}%)
      </p>
      <div className="highscore">
        <p>HighScore: {highScore} Point's</p>
        <p>
          {totalCorrectAnswer === 100 ? "🥳 Congratulations" : "Only "}
          {totalCorrectAnswer} Right Answer's
        </p>
      </div>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </React.Fragment>
  );
}
