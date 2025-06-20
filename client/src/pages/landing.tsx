import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { BarChart3, Trophy, Users } from 'lucide-react';
import { quizCategories } from '@/lib/quiz-data';
import { isAuthenticated } from '@/lib/auth';
import QuizCard from '@/components/quiz-card';
import DifficultyModal from '@/components/difficulty-modal';
import AuthModal from '@/components/auth-modal';

export default function Landing() {
  const [, setLocation] = useLocation();
  const [showDifficultyModal, setShowDifficultyModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategorySelect = (categoryId: string) => {
    if (!isAuthenticated()) {
      setShowAuthModal(true);
      return;
    }
    setSelectedCategory(categoryId);
    setShowDifficultyModal(true);
  };

  const handleDifficultySelect = (difficulty: string) => {
    setShowDifficultyModal(false);
    setLocation(`/quiz/${selectedCategory}/${difficulty}`);
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    setSelectedCategory('');
    setShowDifficultyModal(true);
  };

  return (
    <main className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up">
              Test Your Knowledge
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Challenge yourself with our interactive quizzes and track your progress
            </p>
            <Button 
              onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold animate-slide-up" 
              style={{ animationDelay: '0.2s' }}
            >
              Get Started
            </Button>
          </div>
        </div>
      </section>

      {/* Quiz Categories */}
      <section id="categories" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Choose Your Challenge</h2>
            <p className="text-lg text-gray-600">Select from our diverse range of quiz categories</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {quizCategories.map((category) => (
              <QuizCard
                key={category.id}
                category={category}
                onClick={() => handleCategorySelect(category.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose QuizMaster?</h2>
            <p className="text-lg text-gray-600">Enhance your learning experience with our advanced features</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Track Progress</h3>
              <p className="text-gray-600">Monitor your performance and see improvement over time</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Achievements</h3>
              <p className="text-gray-600">Unlock badges and rewards as you complete challenges</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-purple-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Community</h3>
              <p className="text-gray-600">Compete with friends and join global leaderboards</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">QuizMaster</h3>
              <p className="text-gray-300 mb-4">Challenge yourself with our interactive quizzes and expand your knowledge across various subjects.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">Home</a></li>
                <li><a href="#" className="hover:text-white">All Quizzes</a></li>
                <li><a href="#" className="hover:text-white">Leaderboard</a></li>
                <li><a href="#" className="hover:text-white">About</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">English</a></li>
                <li><a href="#" className="hover:text-white">Geography</a></li>
                <li><a href="#" className="hover:text-white">Science</a></li>
                <li><a href="#" className="hover:text-white">History</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 QuizMaster. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <DifficultyModal
        isOpen={showDifficultyModal}
        onClose={() => setShowDifficultyModal(false)}
        onSelect={handleDifficultySelect}
        category={selectedCategory}
      />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
    </main>
  );
}
