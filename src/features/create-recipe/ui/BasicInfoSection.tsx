/**
 * BasicInfoSection - Секция основной информации о рецепте
 * 
 * Содержит: название, фото, описание, время готовки, количество порций
 */

import { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

interface BasicInfoSectionProps {
  name: string;
  description: string;
  cookTime: number;
  servings: number;
  onNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onCookTimeChange: (value: number) => void;
  onServingsChange: (value: number) => void;
}

export function BasicInfoSection({
  name,
  description,
  cookTime,
  servings,
  onNameChange,
  onDescriptionChange,
  onCookTimeChange,
  onServingsChange,
}: BasicInfoSectionProps) {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handlePhotoClick = () => {
    // TODO: Реализовать загрузку фото
    console.log('Photo upload clicked');
  };

  return (
    <div>
      {/* Таб "ОСНОВНОЕ" */}
      <div className="inline-block bg-black text-[#ffda54] px-4 py-2 font-black uppercase text-xs mb-4 border-4 border-black">
        Основное
      </div>

      {/* Белая карточка */}
      <Card backgroundColor="white" size="xl">
        <CardContent className="p-6 space-y-6">
          {/* Название рецепта */}
          <div>
            <label className="block font-black uppercase text-xs mb-2">
              Название рецепта
            </label>
            <Input
              type="text"
              placeholder="Например: Куриная грудка с овощами"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              className="border-4 border-black"
            />
          </div>

          {/* Фото блюда */}
          <div>
            <label className="block font-black uppercase text-xs mb-2">
              Фото блюда
            </label>
            <button
              onClick={handlePhotoClick}
              className="w-full h-40 border-4 border-black border-dashed bg-gray-100 flex flex-col items-center justify-center gap-3 hover:bg-gray-200 transition-colors"
            >
              <ImageIcon className="w-12 h-12 text-gray-400" strokeWidth={2} />
              <span className="text-sm text-gray-500 font-bold">
                Нажмите, чтобы добавить фото
              </span>
            </button>
          </div>

          {/* Описание */}
          <div>
            <label className="block font-black uppercase text-xs mb-2">
              Описание
            </label>
            <Textarea
              placeholder="Краткое описание рецепта..."
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
              rows={4}
              className="border-4 border-black resize-none"
            />
          </div>

          {/* Время готовки и порций */}
          <div className="grid grid-cols-2 gap-4">
            {/* Время готовки */}
            <div>
              <label className="block font-black uppercase text-xs mb-2">
                Время готовки
              </label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  placeholder="30"
                  value={cookTime || ''}
                  onChange={(e) => onCookTimeChange(Number(e.target.value))}
                  min="1"
                  className="border-4 border-black flex-1"
                />
                <span className="font-black text-sm">мин</span>
              </div>
            </div>

            {/* Порций */}
            <div>
              <label className="block font-black uppercase text-xs mb-2">
                Порций
              </label>
              <Input
                type="number"
                placeholder="4"
                value={servings || ''}
                onChange={(e) => onServingsChange(Number(e.target.value))}
                min="1"
                className="border-4 border-black"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}