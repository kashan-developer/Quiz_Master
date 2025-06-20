import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { CheckCircle, Percent, Zap, Trophy, Shuffle, RotateCcw, Flame, Medal, Star, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { isAuthenticated, getCurrentUser } from '@/lib/auth';
import { getStoredResults } from '@/lib/storage';
import { QuizResult, User } from '@/types/quiz';
import { quizCategories } from '@/lib/quiz-data';

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [results, setResults] = useState<QuizResult[]>([]);

  useEffect(() => {
    if (!isAuthenticated()) {
      setLocation('/');
      return;
    }

    const currentUser = getCurrentUser();
    setUser(currentUser);

    if (currentUser) {
      const userResults = getStoredResults().filter(result => 
        result.quizId.includes(currentUser.id)
      );
      setResults(userResults.slice(-5)); // Get last 5 results
    }
  }, [setLocation]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const getCategoryIcon = (category: string) => {
    const cat = quizCategories.find(c => c.id === category);
    return cat?.icon || 'Brain';
  };

  const getCategoryGradient = (category: string) => {
    const cat = quizCategories.find(c => c.id === category);
    return cat?.gradient || 'from-blue-400 to-purple-500';
  };

  return (
    <div className="animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl text-white p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
              <p className="text-blue-100">Ready for your next challenge?</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{user.totalScore}</div>
              <div className="text-sm text-blue-100">Total Points</div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-full">
                  <CheckCircle className="text-green-600" size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Quizzes Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{user.completedQuizzes}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Percent className="text-blue-600" size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Average Score</p>
                  <p className="text-2xl font-bold text-gray-900">{user.averageScore}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Zap className="text-yellow-600" size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Current Streak</p>
                  <p className="text-2xl font-bold text-gray-900">{user.streak} days</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Trophy className="text-purple-600" size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Rank</p>
                  <p className="text-2xl font-bold text-gray-900">#{user.rank}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quiz History */}
          <div className="lg:col-span-2">
            <Card>
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Recent Quiz History</h2>
              </div>
              <CardContent className="p-6">
                {results.length > 0 ? (
                  <div className="space-y-4">
                    {results.map((result, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className={`bg-gradient-to-r ${getCategoryGradient(result.category)} p-2 rounded-full mr-4`}>
                            <Brain className="text-white" size={20} />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 capitalize">
                              {result.category} Quiz
                            </h3>
                            <p className="text-sm text-gray-500 capitalize">
                              {result.difficulty} Level
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-semibold ${
                            result.score >= 80 ? 'text-green-600' : 
                            result.score >= 60 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {result.score}%
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(result.completedAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Brain className="mx-auto text-gray-400 mb-4" size={48} />
                    <p className="text-gray-500">No quiz history yet</p>
                    <p className="text-sm text-gray-400">Take your first quiz to see results here</p>
                  </div>
                )}
                
                {results.length > 0 && (
                  <Button variant="ghost" className="w-full mt-4 text-blue-600 hover:text-blue-500">
                    View All History
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Start</h2>
                <div className="space-y-3">
                  <Button 
                    onClick={() => setLocation('/')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
                  >
                    <Shuffle className="mr-2" size={16} />
                    Browse Quizzes
                  </Button>
                  {results.length > 0 && (
                    <Button 
                      onClick={() => {
                        const lastResult = results[results.length - 1];
                        setLocation(`/quiz/${lastResult.category}/${lastResult.difficulty}`);
                      }}
                      className="w-full bg-green-600 hover:bg-green-700 text-white transition-colors duration-200"
                    >
                      <RotateCcw className="mr-2" size={16} />
                      Retry Last Quiz
                    </Button>
                  )}
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-200">
                    <Flame className="mr-2" size={16} />
                    Daily Challenge
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Achievements</h2>
                <div className="space-y-3">
                  <div className={`flex items-center ${user.completedQuizzes >= 5 ? '' : 'opacity-50'}`}>
                    <div className="bg-yellow-100 p-2 rounded-full mr-3">
                      <Medal className="text-yellow-600" size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Quiz Starter</p>
                      <p className="text-xs text-gray-500">Complete 5 quizzes ({user.completedQuizzes}/5)</p>
                    </div>
                  </div>
                  
                  <div className={`flex items-center ${user.averageScore >= 90 ? '' : 'opacity-50'}`}>
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <Star className="text-green-600" size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Perfect Score</p>
                      <p className="text-xs text-gray-500">Maintain 90%+ average</p>
                    </div>
                  </div>
                  
                  <div className={`flex items-center ${user.streak >= 7 ? '' : 'opacity-50'}`}>
                    <div className="bg-red-100 p-2 rounded-full mr-3">
                      <Flame className="text-red-600" size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Streak Master</p>
                      <p className="text-xs text-gray-500">7-day streak ({user.streak}/7)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
