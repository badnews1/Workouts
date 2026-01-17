import { Clock, Check } from 'lucide-react';
import { Program } from '../../../entities/program';

interface ProgramCardProps {
  program: Program;
  isSelected: boolean;
  onSelect: () => void;
}

export function ProgramCard({ program, isSelected, onSelect }: ProgramCardProps) {
  // Конвертируем hex в rgba для светлого фона
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const lightBg = hexToRgba(program.color, 0.1);

  return (
    <button
      onClick={onSelect}
      className="w-full text-left p-6 rounded-3xl bg-white border-2 hover:border-gray-300"
      style={{ 
        borderColor: isSelected ? program.color : '#e5e7eb',
        transform: isSelected ? 'scale(1.02)' : 'scale(1)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div 
          className="w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: lightBg }}
        >
          <span className="text-3xl">{program.icon}</span>
        </div>
        <div
          style={{
            opacity: isSelected ? 1 : 0,
            transform: isSelected ? 'scale(1)' : 'scale(0.8)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {isSelected && (
            <span 
              className="flex items-center gap-1.5 px-3 py-1.5 text-white text-sm font-medium rounded-xl"
              style={{ backgroundColor: program.color }}
            >
              <Check className="w-4 h-4" />
              Выбрано
            </span>
          )}
        </div>
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{program.name}</h3>
      <p className="text-sm text-gray-500 mb-4 leading-relaxed">{program.description}</p>
      
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          <span>{program.duration}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Check className="w-4 h-4" />
          <span>{program.equipment}</span>
        </div>
      </div>
    </button>
  );
}