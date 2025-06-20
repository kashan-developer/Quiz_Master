import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Trophy, Home, RotateCcw, Shuffle, Check, X, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { QuizResult } from '@/types/quiz';

export default function Results() {
  const [, setLocation] = useLocation();
  const [result, setResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    const savedResult = localStorage.getItem('quizResult');
    if (savedResult) {
      setResult(JSON.parse(savedResult));
      localStorage.removeItem('quizResult');
    } else {
      setLocation('/dashboard');
    }
  }, [setLocation]);

  if (!result) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading results...</p>
        </div>
      </div>
    );
  }

  const handleRetakeQuiz = () => {
    setLocation(`/quiz/${result.category}/${result.difficulty}`);
  };

  const handleTryAnother = () => {
    setLocation('/');
  };

  const handleBackToDashboard = () => {
    setLocation('/dashboard');
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPerformanceMessage = (score: number) => {
    if (score >= 90) return 'Excellent work!';
    if (score >= 80) return 'Great job!';
    if (score >= 70) return 'Good effort!';
    if (score >= 60) return 'Not bad!';
    return 'Keep practicing!';
  };

  const speedBonus = Math.max(0, Math.round((result.timeSpent < 300 ? 200 : 100) * (result.score / 100)));
  const difficultyMultiplier = result.difficulty === 'expert' ? 1.5 : result.difficulty === 'intermediate' ? 1.2 : 1;
  const difficultyBonus = Math.round(result.score * difficultyMultiplier - result.score);

  return (
    <div className="animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Header */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
            <Trophy className="text-white" size={48} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Quiz Complete!</h1>
          <p className="text-lg text-gray-600">
            {getPerformanceMessage(result.score)} You completed the {result.category} quiz
          </p>
        </div>

        {/* Score Summary */}
        <Card className="mb-6">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className={`text-4xl font-bold mb-2 ${getScoreColor(result.score)}`}>
                  {result.score}%
                </div>
                <div className="text-gray-600">Your Score</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {result.correctAnswers}/{result.totalQuestions}
                </div>
                <div className="text-gray-600">Correct Answers</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  {formatTime(result.timeSpent)}
                </div>
                <div className="text-gray-600">Time Taken</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Breakdown */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Performance Breakdown</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Correct Answers</span>
                <div className="flex items-center">
                  <Progress value={result.score} className="w-32 mr-3" />
                  <span className="text-green-600 font-semibold">
                    {result.correctAnswers}/{result.totalQuestions}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Speed Bonus</span>
                <div className="flex items-center">
                  <Progress value={Math.min(speedBonus, 200) / 2} className="w-32 mr-3" />
                  <span className="text-blue-600 font-semibold">+{speedBonus}pts</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Difficulty Bonus ({result.difficulty})</span>
                <div className="flex items-center">
                  <Progress value={Math.min(difficultyBonus, 100)} className="w-32 mr-3" />
                  <span className="text-purple-600 font-semibold">+{difficultyBonus}pts</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Question Review */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Question Review</h2>
            <div className="space-y-4 max-h-64 overflow-y-auto">
              {result.answers.map((answer, index) => (
                <div 
                  key={index}
                  className={`flex items-start p-3 rounded-lg border ${
                    answer.isCorrect 
                      ? 'bg-green-50 border-green-200' 
                      : answer.selectedAnswer === null
                      ? 'bg-yellow-50 border-yellow-200'
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                    answer.isCorrect 
                      ? 'bg-green-100' 
                      : answer.selectedAnswer === null
                      ? 'bg-yellow-100'
                      : 'bg-red-100'
                  }`}>
                    {answer.isCorrect ? (
                      <Check className="text-green-600" size={16} />
                    ) : answer.selectedAnswer === null ? (
                      <Minus className="text-yellow-600" size={16} />
                    ) : (
                      <X className="text-red-600" size={16} />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 mb-1">
                      Question {index + 1}
                    </p>
                    {answer.isCorrect ? (
                      <p className="text-xs text-green-600">Correct!</p>
                    ) : answer.selectedAnswer === null ? (
                      <p className="text-xs text-yellow-600">Skipped</p>
                    ) : (
                      <p className="text-xs text-red-600">Incorrect</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={handleRetakeQuiz}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
          >
            <RotateCcw className="mr-2" size={16} />
            Retake Quiz
          </Button>
          <Button
            onClick={handleTryAnother}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
          >
            <Shuffle className="mr-2" size={16} />
            Try Another Quiz
          </Button>
          <Button
            onClick={handleBackToDashboard}
            variant="outline"
            className="px-8 py-3"
          >
            <Home className="mr-2" size={16} />
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
