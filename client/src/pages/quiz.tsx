import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { ChevronLeft, ChevronRight, Clock, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { loadQuiz } from '@/lib/quiz-data';
import { saveQuizResult } from '@/lib/storage';
import { getCurrentUser, updateUser } from '@/lib/auth';
import { Quiz, QuizQuestion, QuizResult } from '@/types/quiz';

interface QuizParams {
  category: string;
  difficulty: string;
}

export default function QuizPage() {
  const [location, setLocation] = useLocation();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  // Extract params from URL
  const params = location.split('/').slice(2) as [string, string];
  const [category, difficulty] = params;

  useEffect(() => {
    const initQuiz = async () => {
      try {
        const quizData = await loadQuiz(category, difficulty);
        setQuiz(quizData);
        setAnswers(new Array(quizData.questions.length).fill(null));
        setTimeRemaining(quizData.timeLimit * 60); // Convert minutes to seconds
        setLoading(false);
      } catch (error) {
        console.error('Failed to load quiz:', error);
        setLocation('/');
      }
    };

    if (category && difficulty) {
      initQuiz();
    }
  }, [category, difficulty, setLocation]);

  useEffect(() => {
    if (timeRemaining > 0 && quiz) {
      const timer = setTimeout(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && quiz) {
      handleFinishQuiz();
    }
  }, [timeRemaining, quiz]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers];
      newAnswers[currentQuestionIndex] = selectedAnswer;
      setAnswers(newAnswers);
    }

    if (currentQuestionIndex < quiz!.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(answers[currentQuestionIndex + 1]);
    } else {
      handleFinishQuiz();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedAnswer(answers[currentQuestionIndex - 1]);
    }
  };

  const handleSkipQuestion = () => {
    if (currentQuestionIndex < quiz!.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(answers[currentQuestionIndex + 1]);
    } else {
      handleFinishQuiz();
    }
  };

  const handleFinishQuiz = () => {
    if (!quiz) return;

    const finalAnswers = [...answers];
    if (selectedAnswer !== null) {
      finalAnswers[currentQuestionIndex] = selectedAnswer;
    }

    const correctAnswers = finalAnswers.reduce((count, answer, index) => {
      return answer === quiz.questions[index].correctAnswer ? count + 1 : count;
    }, 0);

    const score = Math.round((correctAnswers / quiz.questions.length) * 100);
    const timeSpent = (quiz.timeLimit * 60) - timeRemaining;

    const result: QuizResult = {
      quizId: `${getCurrentUser()?.id}-${Date.now()}`,
      category: quiz.category,
      difficulty: quiz.difficulty,
      score,
      correctAnswers,
      totalQuestions: quiz.questions.length,
      timeSpent,
      completedAt: new Date(),
      answers: finalAnswers.map((answer, index) => ({
        questionId: quiz.questions[index].id,
        selectedAnswer: answer,
        isCorrect: answer === quiz.questions[index].correctAnswer
      }))
    };

    saveQuizResult(result);

    // Update user stats
    const user = getCurrentUser();
    if (user) {
      const updatedUser = {
        ...user,
        totalScore: user.totalScore + score,
        completedQuizzes: user.completedQuizzes + 1,
        averageScore: Math.round(((user.averageScore * user.completedQuizzes) + score) / (user.completedQuizzes + 1))
      };
      updateUser(updatedUser);
    }

    // Navigate to results with state
    localStorage.setItem('quizResult', JSON.stringify(result));
    setLocation('/results');
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600">Quiz not found</p>
          <Button onClick={() => setLocation('/')} className="mt-4">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;
  const correctCount = answers.slice(0, currentQuestionIndex).reduce((count, answer, index) => {
    return answer === quiz.questions[index].correctAnswer ? count + 1 : count;
  }, 0);

  return (
    <div className="animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quiz Header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 capitalize">
                  {quiz.category} Quiz
                </h1>
                <p className="text-gray-600 capitalize">{quiz.difficulty} Level</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600">
                  {formatTime(timeRemaining)}
                </div>
                <div className="text-sm text-gray-500">Time Remaining</div>
              </div>
            </div>

            <Progress value={progress} className="mb-2" />
            <div className="flex justify-between text-sm text-gray-500">
              <span>Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
              <span>{correctCount} correct</span>
            </div>
          </CardContent>
        </Card>

        {/* Question Card */}
        <Card className="mb-6">
          <CardContent className="p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {currentQuestion.question}
              </h2>
            </div>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-colors duration-200 group ${
                    selectedAnswer === index
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4 font-semibold ${
                      selectedAnswer === index
                        ? 'border-blue-500 text-blue-600'
                        : 'border-gray-300 text-gray-600 group-hover:border-blue-500 group-hover:text-blue-600'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className={`${
                      selectedAnswer === index
                        ? 'text-blue-900'
                        : 'text-gray-900 group-hover:text-blue-900'
                    }`}>
                      {option}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quiz Navigation */}
        <div className="flex justify-between items-center">
          <Button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            variant="outline"
            className="text-gray-700"
          >
            <ChevronLeft className="mr-2" size={16} />
            Previous
          </Button>
          
          <div className="flex space-x-2">
            <Button
              onClick={handleSkipQuestion}
              variant="outline"
              className="bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500"
            >
              <SkipForward className="mr-2" size={16} />
              Skip Question
            </Button>
            <Button
              onClick={handleNextQuestion}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {currentQuestionIndex === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next'}
              <ChevronRight className="ml-2" size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
