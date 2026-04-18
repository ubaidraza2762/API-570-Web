export type BookType = "Open Book" | "Close Book";

export type QuestionType = "single" | "multiple" | "matching";

export interface MatchingPair {
  left: string;
  right: string;
}

export interface Question {
  id: string;
  text: string;
  type?: QuestionType;
  options?: string[]; // Used for single and multiple
  correctAnswer?: number | number[]; // number for single, number[] for multiple
  matchingPairs?: MatchingPair[]; // for matching
  hint?: string;
  image?: string;
}

export interface Exam {
  id: string;
  title: string;
  year: string;
  category: string;
  bookType: BookType;
  duration: number; // in minutes
  questions: Question[];
  group?: string;
}

export type ExamMode = "Standard" | "Practice" | "Hint";

export interface ExamAttempt {
  id: string;
  examId: string;
  mode: ExamMode;
  date: string;
  score: number;
  total: number;
  answers: Record<string, any>; // questionId -> selected answer(s)
  flags: Record<string, boolean>; // questionId -> isFlagged
  timeTaken?: number; // in seconds
  completed?: boolean;
}
