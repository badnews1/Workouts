/**
 * AddMeasurementForm - Форма добавления/редактирования замера
 * 
 * Форма для ввода всех параметров тела
 */

import { MEASUREMENT_FIELDS } from '@/entities/measurement';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { MeasurementFormData } from '../model/types';
import { InputField } from './InputField';
import { DateField } from './DateField';

interface AddMeasurementFormProps {
  formData: MeasurementFormData;
  onUpdateField: (field: keyof MeasurementFormData, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  isEditing?: boolean;
}

export function AddMeasurementForm({
  formData,
  onUpdateField,
  onSave,
  onCancel,
  isEditing = false,
}: AddMeasurementFormProps) {
  return (
    <Card className="mb-6">
      <CardHeader variant="yellow">
        <CardTitle>
          {isEditing ? 'Редактировать замер' : 'Новый замер'}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {/* Поле выбора даты */}
        <DateField
          value={formData.date}
          onChange={(v) => onUpdateField('date', v)}
        />

        <div className="grid grid-cols-3 gap-3">
          {MEASUREMENT_FIELDS.map((field) => (
            <InputField
              key={field.type}
              label={field.label}
              value={formData[field.type]}
              onChange={(v) => onUpdateField(field.type, v)}
              unit={field.unit}
            />
          ))}
        </div>

        <div className="flex gap-2 mt-4">
          <Button
            onClick={onSave}
            variant="primary"
            className="flex-1 uppercase"
            size="sm"
          >
            {isEditing ? 'Обновить' : 'Сохранить'}
          </Button>
          <Button
            onClick={onCancel}
            variant="outline"
            className="flex-1 uppercase"
            size="sm"
          >
            Отмена
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
