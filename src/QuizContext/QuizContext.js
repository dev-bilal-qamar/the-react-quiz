/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer, useEffect } from "react";

const QuizContext = createContext();
const SEC_PER_QUESTION = 60;

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  totalTime: SEC_PER_QUESTION,
  totalCorrectAnswer: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };

    case "dataFailed":
      return { ...state, status: "error" };

    case "quizStart":
      return { ...state, status: "active" };

    case "newAnswer":
      const question = state.questions.at(state.index);
      const isCorrectAnswer = action.payload === question.correctOption;
      return {
        ...state,
        answer: action.payload,
        points: isCorrectAnswer ? state.points + question.points : state.points,
        totalCorrectAnswer: isCorrectAnswer
          ? state.totalCorrectAnswer++
          : state.totalCorrectAnswer,
      };
    case "nextQuestion":
      return {
        ...state,
        totalTime: SEC_PER_QUESTION,
        index: state.index + 1,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "tick":
      return {
        ...state,
        totalTime: state.totalTime - 1,
      };
    case "restart":
      return {
        ...initialState,
        highScore: state.highScore,
        questions: state.questions,
        status: "ready",
      };
    default:
      throw new Error("Action Unknown ");
  }
};

function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    questions,
    status,
    index,
    answer,
    points,
    highScore,
    totalTime,
    totalCorrectAnswer,
  } = state;

  const numQuestions = questions.length;
  const totalPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  useEffect(() => {
    if (totalTime === 0 && index < numQuestions - 1) {
      dispatch({ type: "nextQuestion" });
    }
    if (totalTime === 0 && index === numQuestions - 1) {
      dispatch({ type: "finish" });
    }
  }, [dispatch, index, numQuestions, totalTime]);

  useEffect(() => {
    async function questionsData() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch (err) {
        dispatch({ type: "dataFailed" });
      }
    }
    questionsData();
  }, []);
  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highScore,
        totalTime,
        totalCorrectAnswer,
        numQuestions,
        totalPoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("QuizContext was used outside the QuizProvider");
  return context;
}

export { QuizProvider, useQuiz };
