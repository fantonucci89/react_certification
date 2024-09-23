import { useContext } from 'react';
import { QuestionType } from '../../../models/question';
import { QuizContext } from '../../../contexts/QuizContext';
import { decode } from 'he';

export const QuestionDetail = ({ question, showResult = false }: { question: QuestionType; showResult?: boolean }) => {
  return (
    <>
      <p className={`my-4 text-left`}>{decode(question.question)}</p>
      <div className={`flex gap-4`}>
        {question.choices.map((option) => {
          return <div key={option}>{renderChoiceButton(option, question, showResult)}</div>;
        })}
      </div>
    </>
  );
};

const renderChoiceButton = (option: string, question: QuestionType, showResult: boolean) => {
  if (showResult) {
    switch (option) {
      case question.correct_answer:
        return <SuccessChoiceButton option={option} />;
      case question.chosen_answer:
        return question.passed ? <SuccessChoiceButton option={option} /> : <FailureChoiceButton option={option} />;
      default:
        return <ChoiceButton option={option} question={question} />;
    }
  } else {
    return <ChoiceButton option={option} question={question} />;
  }
};

const ChoiceButton = ({ option, question }: { option: string; question: QuestionType }) => {
  const quiz = useContext(QuizContext);
  const optionClasses = `rounded-lg border text-sm px-4 py-3 border-emerald-500 text-emerald-900 hover:text-white hover:bg-emerald-500 cursor-pointer`;
  return (
    <button
      onClick={() => quiz?.setQuestionResponse(question.id!, option)}
      key={option}
      className={`${optionClasses} ${question.chosen_answer === option && 'bg-emerald-500 text-white'}`}
    >
      {option}
    </button>
  );
};

const SuccessChoiceButton = ({ option }: { option: string }) => {
  const optionClasses = `rounded-lg border text-sm px-4 py-3 border-green-500 text-white bg-emerald-500`;
  return (
    <button key={option} className={`${optionClasses}`}>
      {option}
    </button>
  );
};

const FailureChoiceButton = ({ option }: { option: string }) => {
  const optionClasses = `rounded-lg border text-sm px-4 py-3 border-red-500 text-white bg-red-500`;
  return (
    <button key={option} className={`${optionClasses}`}>
      {option}
    </button>
  );
};
