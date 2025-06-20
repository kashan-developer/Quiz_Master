import { Quiz, QuizCategory } from '@/types/quiz';

export const quizCategories: QuizCategory[] = [
  {
    id: 'english',
    name: 'English Language',
    description: 'Test your grammar, vocabulary, and comprehension skills',
    icon: 'Languages',
    gradient: 'from-green-400 to-blue-500',
    estimatedTime: '15-30 min',
    badge: 'Popular',
    badgeColor: 'bg-green-100 text-green-800'
  },
  {
    id: 'geography',
    name: 'Geography Challenge',
    description: 'Explore world capitals, countries, and landmarks',
    icon: 'Globe',
    gradient: 'from-orange-400 to-red-500',
    estimatedTime: '20-35 min',
    badge: 'Featured',
    badgeColor: 'bg-blue-100 text-blue-800'
  },
  {
    id: 'science',
    name: 'Science & Nature',
    description: 'Discover biology, chemistry, and physics concepts',
    icon: 'Flask',
    gradient: 'from-purple-400 to-pink-500',
    estimatedTime: '25-40 min',
    badge: 'Challenging',
    badgeColor: 'bg-purple-100 text-purple-800'
  },
  {
    id: 'history',
    name: 'World History',
    description: 'Journey through ancient civilizations and modern events',
    icon: 'Landmark',
    gradient: 'from-yellow-400 to-orange-500',
    estimatedTime: '20-30 min',
    badge: 'Educational',
    badgeColor: 'bg-yellow-100 text-yellow-800'
  },
  {
    id: 'math',
    name: 'Mathematics',
    description: 'Solve problems from basic arithmetic to advanced calculus',
    icon: 'Calculator',
    gradient: 'from-teal-400 to-cyan-500',
    estimatedTime: '30-45 min',
    badge: 'Expert Level',
    badgeColor: 'bg-red-100 text-red-800'
  },
  {
    id: 'technology',
    name: 'Technology & IT',
    description: 'Test your knowledge of programming, AI, and tech trends',
    icon: 'Cpu',
    gradient: 'from-indigo-400 to-purple-500',
    estimatedTime: '20-35 min',
    badge: 'Trending',
    badgeColor: 'bg-indigo-100 text-indigo-800'
  }
];

export async function loadQuiz(category: string, difficulty: string): Promise<Quiz> {
  try {
    const response = await fetch(`/src/data/quizzes/${category}-${difficulty}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load quiz: ${category} - ${difficulty}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading quiz:', error);
    throw error;
  }
}
