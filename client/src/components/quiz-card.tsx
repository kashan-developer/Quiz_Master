import { Clock } from 'lucide-react';
import { QuizCategory } from '@/types/quiz';
import * as Icons from 'lucide-react';

interface QuizCardProps {
  category: QuizCategory;
  onClick: () => void;
}

export default function QuizCard({ category, onClick }: QuizCardProps) {
  const IconComponent = Icons[category.icon as keyof typeof Icons] as React.ComponentType<{ size?: number; className?: string }>;

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group cursor-pointer"
    >
      <div className={`bg-gradient-to-r ${category.gradient} h-32 flex items-center justify-center`}>
        {IconComponent && <IconComponent size={48} className="text-white" />}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
        <p className="text-gray-600 mb-4">{category.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 flex items-center">
            <Clock className="mr-1" size={16} />
            {category.estimatedTime}
          </span>
          <span className={`text-sm px-2 py-1 rounded-full ${category.badgeColor}`}>
            {category.badge}
          </span>
        </div>
      </div>
    </div>
  );
}
