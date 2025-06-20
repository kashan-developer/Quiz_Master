import { Sprout, Mountain, Flame, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DifficultyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (difficulty: string) => void;
  category?: string;
}

const difficulties = [
  {
    id: 'beginner',
    name: 'Beginner',
    description: 'Easy questions to get started',
    icon: Sprout,
    bgColor: 'bg-green-50 hover:bg-green-100',
    borderColor: 'border-green-200 hover:border-green-300',
    textColor: 'text-green-800',
    iconColor: 'text-green-600'
  },
  {
    id: 'intermediate',
    name: 'Intermediate',
    description: 'Moderate challenge for learners',
    icon: Mountain,
    bgColor: 'bg-yellow-50 hover:bg-yellow-100',
    borderColor: 'border-yellow-200 hover:border-yellow-300',
    textColor: 'text-yellow-800',
    iconColor: 'text-yellow-600'
  },
  {
    id: 'expert',
    name: 'Expert',
    description: 'Advanced questions for pros',
    icon: Flame,
    bgColor: 'bg-red-50 hover:bg-red-100',
    borderColor: 'border-red-200 hover:border-red-300',
    textColor: 'text-red-800',
    iconColor: 'text-red-600'
  }
];

export default function DifficultyModal({ isOpen, onClose, onSelect, category }: DifficultyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 animate-slide-up relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Choose Difficulty</h3>
          <p className="text-gray-600">Select your preferred challenge level</p>
        </div>

        <div className="space-y-4">
          {difficulties.map((difficulty) => {
            const IconComponent = difficulty.icon;
            return (
              <button
                key={difficulty.id}
                onClick={() => onSelect(difficulty.id)}
                className={`w-full ${difficulty.bgColor} border-2 ${difficulty.borderColor} rounded-lg p-4 text-left transition-colors duration-200`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className={`font-semibold ${difficulty.textColor}`}>
                      {difficulty.name}
                    </h4>
                    <p className={`text-sm ${difficulty.iconColor}`}>
                      {difficulty.description}
                    </p>
                  </div>
                  <IconComponent className={difficulty.iconColor} size={24} />
                </div>
              </button>
            );
          })}
        </div>

        <Button
          onClick={onClose}
          variant="secondary"
          className="w-full mt-6"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
