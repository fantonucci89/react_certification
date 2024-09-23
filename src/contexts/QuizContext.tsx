import { createContext, PropsWithChildren, useCallback, useMemo, useState } from 'react';
import { QuestionType } from '../models/question';

type QuizContextType = {
  questions: QuestionType[] | undefined;
  setQuestions: (questions: QuestionType[]) => void;
  setQuestionResponse: (index: number, answer: string) => void;
};

export const QuizContext = createContext<QuizContextType | null>(null);

export const QuizProvider = ({ children }: PropsWithChildren) => {
  // Data used for trigger quiz components rerender
  const [questions, setData] = useState<QuestionType[]>([]);

  const setQuestions = useCallback((questions: QuestionType[]) => {
    setData(
      questions.map((question: QuestionType, index: number) => ({
        ...question,
        id: index,
        choices: [question.correct_answer, ...question.incorrect_answers].sort(() => Math.random() - 0.5),
      }))
    );
  }, []);

  const setQuestionResponse = useCallback(
    (questionIndex: number, questionResponse: string) => {
      if (questions.length) {
        const selectedQuestionIndex = questions.findIndex((question) => question.id === questionIndex);

        if (selectedQuestionIndex > -1) {
          questions[selectedQuestionIndex].chosen_answer = questionResponse;
          questions[selectedQuestionIndex].passed =
            questions[selectedQuestionIndex].correct_answer === questionResponse;
          setData([...questions]);
        }
      }
    },
    [questions]
  );

  const value = useMemo(
    () => ({ questions, setQuestions, setQuestionResponse }),
    [questions, setQuestions, setQuestionResponse]
  );

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
