/**
 * ResultInput - Поле ввода результата упражнения с кнопкой подтверждения
 */

import { CheckCircle2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ResultInputProps {
  exerciseId: string;
  value: number | undefined;
  isConfirmed: boolean;
  onChange: (exerciseId: string, value: number) => void;
  onConfirm: (exerciseId: string) => void;
  disabled?: boolean;
}

export function ResultInput({ 
  exerciseId, 
  value, 
  isConfirmed,
  onChange, 
  onConfirm, 
  disabled 
}: ResultInputProps) {
  return (
    <div className="flex gap-2 flex-shrink-0">
      <Input
        type="number"
        value={value || ''}
        onChange={(e) => onChange(exerciseId, parseInt(e.target.value) || 0)}
        className="w-16 h-12 text-center"
        size="lg"
        fontSize="xl"
        fontWeight="black"
        disabled={disabled}
      />
      <Button
        onClick={() => onConfirm(exerciseId)}
        variant={isConfirmed ? 'primary' : 'outline'}
        size="icon"
        disabled={disabled}
        className={isConfirmed ? '' : 'bg-black text-white'}
        shadow={false}
      >
        <CheckCircle2 className="w-6 h-6" strokeWidth={4} />
      </Button>
    </div>
  );
}