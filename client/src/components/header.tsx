import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Brain, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { isAuthenticated, getCurrentUser, logout } from '@/lib/auth';
import AuthModal from './auth-modal';

export default function Header() {
  const [location] = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = isAuthenticated();
      setIsLoggedIn(authenticated);
      if (authenticated) {
        setUser(getCurrentUser());
      }
    };

    checkAuth();
    // Listen for storage changes to update auth state across tabs
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setUser(null);
    window.location.href = '/';
  };

  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    setUser(getCurrentUser());
    setShowAuthModal(false);
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <h1 className="text-2xl font-bold text-blue-600">
                  <Brain className="inline mr-2" size={28} />
                  QuizMaster
                </h1>
              </Link>
            </div>
            
            <nav className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link 
                  href="/"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    location === '/' 
                      ? 'text-blue-600' 
                      : 'text-gray-500 hover:text-blue-600'
                  }`}
                >
                  Home
                </Link>
                {isLoggedIn && (
                  <Link 
                    href="/dashboard"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      location === '/dashboard' 
                        ? 'text-blue-600' 
                        : 'text-gray-500 hover:text-blue-600'
                    }`}
                  >
                    Dashboard
                  </Link>
                )}
              </div>
            </nav>

            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors duration-200"
                    onClick={handleLogout}
                  >
                    <User className="mr-2" size={16} />
                    {user?.name || 'User'}
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
}
