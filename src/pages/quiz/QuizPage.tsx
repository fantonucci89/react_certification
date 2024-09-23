import { useState } from 'react';
import { QuizChoices, QuizSelector } from './widgets/QuizSelector';
import { QuestionList } from './widgets/QuestionList';

export const QuizPage = () => {
  const [choices, setChoices] = useState<QuizChoices>({ category: null, difficulty: null });
  const handleQuizSelected = (category: number, difficulty: string) => {
    setChoices({ category, difficulty });
  };

  return (
    <div className={`min-h-screen`}>
      <QuizSelector onQuizSelected={(choice) => handleQuizSelected(choice.category!, choice.difficulty!)} />
      <div className={`px-10`}>
        <QuestionList category={choices.category} difficulty={choices.difficulty} />
      </div>
    </div>
  );
};
