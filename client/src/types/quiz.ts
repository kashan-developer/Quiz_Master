export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface Quiz {
  id: string;
  title: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'expert';
  questions: QuizQuestion[];
  timeLimit: number; // in minutes
  description: string;
}

export interface QuizResult {
  quizId: string;
  category: string;
  difficulty: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number;
  completedAt: Date;
  answers: {
    questionId: string;
    selectedAnswer: number | null;
    isCorrect: boolean;
  }[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  totalScore: number;
  completedQuizzes: number;
  averageScore: number;
  streak: number;
  rank: number;
}

export interface QuizCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  gradient: string;
  estimatedTime: string;
  badge: string;
  badgeColor: string;
}
