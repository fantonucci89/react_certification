import { useContext, useEffect } from 'react';
import { QuestionType } from '../../../models/question';
import { QuestionDetail } from './QuestionDetail';
import { QuizContext } from '../../../contexts/QuizContext';
import { Link } from 'react-router-dom';

type QuestionListProps = {
  category: number | null;
  difficulty: string | null;
};

const checkQuizCompletion = (questions: QuestionType[] = []) => {
  return questions.length && questions.every((question) => question.chosen_answer);
};

export const QuestionList = ({ category, difficulty }: QuestionListProps) => {
  const quiz = useContext(QuizContext);

  useEffect(() => {
    if (category && difficulty) {
      const fetchQuestions = async (category: number, difficulty: string) => {
        try {
          const response = await fetch(
            `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`
          );
          const questions = (await response.json()).results as QuestionType[];
          quiz?.setQuestions(questions);
        } catch (error) {
          console.error(error);
        }
      };
      fetchQuestions(category, difficulty);
    } else {
      quiz?.setQuestions([]);
    }
  }, [category, difficulty]);

  // If there are no questions, show a message to the user
  if (quiz?.questions?.length === 0) {
    return <div>Create a new Quiz</div>;
  }

  // Else show the questions
  return (
    <div>
      {quiz?.questions?.map((question) => (
        <QuestionDetail key={question.question} question={question} />
      ))}
      {checkQuizCompletion(quiz?.questions) && (
        <div className={`py-8`}>
          <Link to="/results" className={`block p-4 bg-orange-500 text-white rounded-lg w-full`}>
            Submit quiz
          </Link>
        </div>
      )}
    </div>
  );
};
