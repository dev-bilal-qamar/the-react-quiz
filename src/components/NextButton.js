import { useQuiz } from "../QuizContext/QuizContext";

export default function Button() {
  const { dispatch, answer, index, numQuestions } = useQuiz();
  if (answer === null) return;

  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );

  if (index === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Quiz End
      </button>
    );
}
