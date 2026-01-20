import { Clock, Check } from 'lucide-react';
import { Program } from '@/entities/program';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface ProgramCardProps {
  program: Program;
  isSelected: boolean;
  onSelect: () => void;
}

export function ProgramCard({ program, isSelected, onSelect }: ProgramCardProps) {
  return (
    <Card
      as="button"
      onClick={onSelect}
      state={isSelected ? 'current' : 'default'}
      size="lg"
      className="w-full text-left cursor-pointer"
      style={{
        boxShadow: isSelected ? '8px 8px 0 var(--brand-black)' : '6px 6px 0 var(--brand-black)',
        transform: isSelected ? 'translate(-2px, -2px)' : 'none',
        transition: 'all 0.15s ease-out',
      }}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div 
            className="w-16 h-16 flex items-center justify-center border-4 border-black"
            style={{ 
              backgroundColor: isSelected ? 'var(--brand-white)' : program.color,
            }}
          >
            <span className="text-4xl">{program.icon}</span>
          </div>
          {isSelected && (
            <Badge 
              size="md"
              className="bg-black text-white gap-1.5"
            >
              <Check className="w-4 h-4" strokeWidth={3} />
              <span className="uppercase">Выбрано</span>
            </Badge>
          )}
        </div>
        
        <h3 className="text-2xl font-black mb-2 uppercase tracking-tight text-black">
          {program.name}
        </h3>
        <p className="text-sm font-bold mb-4 leading-relaxed text-gray-600">
          {program.description}
        </p>
        
        <div className="flex items-center gap-3">
          <Badge 
            variant="default"
            size="md"
            className="gap-1.5"
          >
            <Clock className="w-4 h-4" strokeWidth={2.5} />
            <span>{program.duration}</span>
          </Badge>
          <Badge 
            variant="default"
            size="md"
            className="gap-1.5"
          >
            <Check className="w-4 h-4" strokeWidth={2.5} />
            <span>{program.equipment}</span>
          </Badge>
        </div>
      </div>
    </Card>
  );
}