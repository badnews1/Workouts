/**
 * ProfilePage - Страница профиля пользователя
 * 
 * Отображает статистику тренировок, достижения и настройки профиля (в разработке).
 * 
 * Роут: /profile
 * Доступ: Через нижнюю навигацию
 */

import { Trash2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Header } from '../../../shared/ui/header';

export function ProfilePage() {
  const handleResetWorkouts = () => {
    // Подтверждение действия
    if (!window.confirm('Вы уверены, что хотите удалить всю историю тренировок? Это действие нельзя отменить.')) {
      return;
    }

    try {
      // Находим все ключи в localStorage, связанные с тренировками
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('workout_')) {
          keysToRemove.push(key);
        }
      }

      // Удаляем все найденные ключи
      keysToRemove.forEach(key => localStorage.removeItem(key));

      toast.success(`Удалено записей: ${keysToRemove.length}`);
    } catch (error) {
      toast.error('Ошибка при удалении данных');
      console.error(error);
    }
  };

  return (
    <div className="h-full bg-white">
      <Header title="Профиль" />
      <div className="px-4 py-6">
        {/* Временная заглушка */}
        <div className="text-center mb-8 py-12">
          <p className="text-gray-500">Страница в разработке</p>
        </div>

        {/* Раздел для разработчика */}
        <div className="mt-auto">
          <div className="bg-gray-50 rounded-2xl p-4 mb-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Инструменты разработчика
            </h3>
            <button
              onClick={handleResetWorkouts}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 className="w-5 h-5" />
              Сбросить данные тренировок
            </button>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Удаляет всю историю завершенных тренировок из localStorage
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}