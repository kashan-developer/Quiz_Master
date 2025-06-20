import { QuizResult } from '@/types/quiz';

const QUIZ_RESULTS_KEY = 'quizmaster_results';

export function saveQuizResult(result: QuizResult): void {
  const results = getStoredResults();
  results.push(result);
  localStorage.setItem(QUIZ_RESULTS_KEY, JSON.stringify(results));
}

export function getStoredResults(): QuizResult[] {
  const resultsStr = localStorage.getItem(QUIZ_RESULTS_KEY);
  return resultsStr ? JSON.parse(resultsStr) : [];
}

export function getUserResults(userId: string): QuizResult[] {
  const results = getStoredResults();
  return results.filter(result => result.quizId.startsWith(userId));
}

export function clearResults(): void {
  localStorage.removeItem(QUIZ_RESULTS_KEY);
}
