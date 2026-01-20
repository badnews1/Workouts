/**
 * PortionSelector - Форма выбора размера порции
 * 
 * Позволяет указать количество продукта
 */

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface PortionSelectorProps {
  amount: string;
  unit: string;
  onAmountChange: (value: string) => void;
}

export function PortionSelector({ 
  amount, 
  unit, 
  onAmountChange 
}: PortionSelectorProps) {
  return (
    <Card className="p-6" shadow="large">
      <h2 className="font-black text-lg uppercase mb-4">Размер порции</h2>
      <Input
        type="number"
        value={amount}
        onChange={(e) => onAmountChange(e.target.value)}
        min="0"
        step="1"
        className="text-center min-w-0"
        fontWeight="black"
        fontSize="2xl"
        size="lg"
        rightText={unit}
      />
    </Card>
  );
}