import { useQuiz } from "../QuizContext/QuizContext";

export default function Progress() {
  const { index, numQuestions, answer } = useQuiz();

  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
    </header>
  );
}

// <p>
//   <strong>{points}</strong> / {totalPoints} points
// </p>;
