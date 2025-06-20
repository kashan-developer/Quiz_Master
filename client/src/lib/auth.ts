import { User } from '@/types/quiz';

const AUTH_KEY = 'quizmaster_auth';
const USER_KEY = 'quizmaster_user';

export function isAuthenticated(): boolean {
  return localStorage.getItem(AUTH_KEY) === 'true';
}

export function getCurrentUser(): User | null {
  const userStr = localStorage.getItem(USER_KEY);
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
}

export function login(email: string, password: string): Promise<User> {
  return new Promise((resolve, reject) => {
    // Simulate API call delay
    setTimeout(() => {
      // Check if user exists in localStorage
      const users = getStoredUsers();
      const user = users.find(u => u.email === email);
      
      if (!user) {
        reject(new Error('User not found'));
        return;
      }
      
      // In a real app, you'd verify the password here
      localStorage.setItem(AUTH_KEY, 'true');
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      resolve(user);
    }, 1000);
  });
}

export function register(name: string, email: string, password: string): Promise<User> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = getStoredUsers();
      
      // Check if user already exists
      if (users.some(u => u.email === email)) {
        reject(new Error('User already exists'));
        return;
      }
      
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        createdAt: new Date(),
        totalScore: 0,
        completedQuizzes: 0,
        averageScore: 0,
        streak: 0,
        rank: users.length + 1
      };
      
      users.push(newUser);
      localStorage.setItem('quizmaster_users', JSON.stringify(users));
      localStorage.setItem(AUTH_KEY, 'true');
      localStorage.setItem(USER_KEY, JSON.stringify(newUser));
      
      resolve(newUser);
    }, 1000);
  });
}

export function logout(): void {
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(USER_KEY);
}

function getStoredUsers(): User[] {
  const usersStr = localStorage.getItem('quizmaster_users');
  return usersStr ? JSON.parse(usersStr) : [];
}

export function updateUser(updatedUser: User): void {
  const users = getStoredUsers();
  const index = users.findIndex(u => u.id === updatedUser.id);
  
  if (index !== -1) {
    users[index] = updatedUser;
    localStorage.setItem('quizmaster_users', JSON.stringify(users));
    localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
  }
}
