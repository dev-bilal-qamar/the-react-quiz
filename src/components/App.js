import React from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";
import { useQuiz } from "../QuizContext/QuizContext";

export default function App() {
  const { status } = useQuiz();
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <ErrorMessage />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <React.Fragment>
            <Progress />
            <Questions />
            <footer>
              <Timer />
              <NextButton />
            </footer>
          </React.Fragment>
        )}
        {status === "finished" && <FinishScreen />}
      </Main>
    </div>
  );
}
