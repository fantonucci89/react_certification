export type QuestionType = {
  id?: number;
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  chosen_answer?: string;
  passed?: boolean;
  choices: string[];
};
