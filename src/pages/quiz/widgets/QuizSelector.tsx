import { useEffect, useState } from 'react';
import { Category } from '../../../models/category';

export type QuizChoices = {
  category: number | null;
  difficulty: string | null;
};

type QuizSelectorProps = {
  onQuizSelected: (choice: QuizChoices) => void;
};

export const QuizSelector = ({ onQuizSelected }: QuizSelectorProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [choices, setChoices] = useState<QuizChoices>({ category: null, difficulty: null });
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`https://opentdb.com/api_category.php`);
        const categories = (await response.json()).trivia_categories as Category[];

        setCategories(categories);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  const submitChoices = () => {
    if (choices.category && choices.difficulty) {
      onQuizSelected(choices);
    }
  };

  return (
    <div id="quiz-selector" className={`flex flex-col items-center uppercase p-8`}>
      <h1 className={`mb-4`}>Quiz maker</h1>
      <div className={`flex w-full`}>
        <select
          id="categorySelect"
          name="category"
          className={`block w-full rounded-l-md border-0 p-4 bg-white text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          value={choices.category ?? ''}
          onChange={(e) => setChoices({ ...choices, category: +e.target.value })}
        >
          <option disabled value="">
            Select a category
          </option>
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <select
          id="difficultySelect"
          name="difficulty"
          className={`block w-full rounded-0 border-0 p-4 bg-white text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          value={choices.difficulty ?? ''}
          onChange={(e) => setChoices({ ...choices, difficulty: e.target.value })}
        >
          <option disabled value="">
            Select a difficulty
          </option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button
          id="createBtn"
          onClick={submitChoices}
          className={`block w-full rounded-r-md border-slate-900 border max-w-24 text-sm`}
        >
          Create
        </button>
      </div>
    </div>
  );
};
