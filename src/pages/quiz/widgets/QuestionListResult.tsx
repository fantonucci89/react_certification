import { useContext } from 'react';
import { QuizContext } from '../../../contexts/QuizContext';
import { QuestionDetail } from './QuestionDetail';
import { Link } from 'react-router-dom';
import { QuestionType } from '../../../models/question';

export const QuestionListResult = () => {
  const quiz = useContext(QuizContext);

  return (
    <div>
      {quiz?.questions?.map((question) => (
        <QuestionDetail key={question.question} question={question} showResult={true} />
      ))}
      <QuestionResult questions={quiz?.questions || []} />
      <div className={`py-8`}>
        <Link to="/" className={`block p-4 bg-slate-600 text-white rounded-lg w-full`}>
          Create a new quiz
        </Link>
      </div>
    </div>
  );
};

const QuestionResult = ({ questions }: { questions: QuestionType[] }) => {
  const correctAnswers = questions.filter((question) => question.passed).length;
  const backgroundColorResult =
    correctAnswers <= 1 ? 'bg-red-500' : correctAnswers <= 3 ? 'bg-yellow-500' : 'bg-green-500';
  return (
    <div className={`my-4 p-4 rounded text-center ${backgroundColorResult}`}>
      {`You scored ${correctAnswers} out of ${questions.length}`}
    </div>
  );
};
