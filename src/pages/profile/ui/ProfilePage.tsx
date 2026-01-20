/**
 * ProfilePage - Страница профиля пользователя
 * 
 * Отображает аватар, никнейм, статистику тренировок и достижения.
 * 
 * Роут: /profile
 * Доступ: Через нижнюю навигацию
 */

import { User, Settings, Trophy, TrendingUp, Apple, Ruler, Flame, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Header } from '@/shared';
import { IconBox } from '@/shared/ui/icon-box';
import { useWorkoutStats } from '@/entities/workout-session';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export function ProfilePage() {
  const navigate = useNavigate();
  const { stats } = useWorkoutStats();
  
  // Безопасное получение значений с дефолтами
  const completedWorkouts = stats?.completedWorkouts ?? 0;
  const currentStreak = stats?.currentStreak ?? 0;
  const totalMinutes = stats?.totalMinutes ?? 0;
  
  const settingsButton = (
    <Button
      onClick={() => navigate('/settings')}
      variant="secondary"
      size="icon-sm"
      shadow={true}
      aria-label="Настройки"
      className="shadow-[3px_3px_0px_var(--brand-black)]"
    >
      <Settings className="w-5 h-5" strokeWidth={3} />
    </Button>
  );

  return (
    <div className="h-full bg-white">
      <Header title="Профиль" rightAction={settingsButton} />
      
      <div className="px-4 py-6 pb-24 space-y-6">
        {/* Карточка профиля */}
        <Card size="lg" backgroundColor="var(--brand-white)" className="p-6">
          <div className="flex items-center gap-4">
            {/* Аватар */}
            <Avatar shape="square" size="lg" className="bg-[var(--brand-yellow)] shadow-[4px_4px_0px_var(--brand-black)]">
              <AvatarFallback shape="square" className="bg-[var(--brand-yellow)] text-4xl font-black">💪</AvatarFallback>
            </Avatar>
            
            {/* Информация о пользователе */}
            <div className="flex-1">
              <h2 className="text-2xl font-black uppercase">АТЛЕТ</h2>
              <p className="text-sm font-bold text-gray-600 mt-1">@workout_warrior</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="bg-[var(--brand-green)] border-2 border-black px-2 py-1">
                  <span className="text-xs font-black text-white">НОВИЧОК</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Статистика */}
        <div>
          <h3 className="text-xs font-black text-gray-500 uppercase tracking-wide mb-3 px-1">
            Статистика
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {/* Завершено тренировок */}
            <Card size="md" backgroundColor="var(--brand-white)" className="p-4">
              <div className="flex items-start justify-between mb-2">
                <IconBox size="sm" backgroundColor="var(--brand-green)">
                  <TrendingUp className="w-5 h-5 text-white" strokeWidth={3} />
                </IconBox>
              </div>
              <div className="text-3xl font-black">{completedWorkouts}</div>
              <div className="text-xs font-bold text-gray-600 mt-1">ТРЕНИРОВОК</div>
            </Card>

            {/* Серия дней */}
            <Card size="md" backgroundColor="var(--brand-white)" className="p-4">
              <div className="flex items-start justify-between mb-2">
                <IconBox size="sm" backgroundColor="var(--brand-yellow)">
                  <Flame className="w-5 h-5" strokeWidth={3} />
                </IconBox>
              </div>
              <div className="text-3xl font-black">{currentStreak}</div>
              <div className="text-xs font-bold text-gray-600 mt-1">ДНЕЙ ПОДРЯД</div>
            </Card>

            {/* Время тренировок */}
            <Card size="md" backgroundColor="var(--brand-white)" className="p-4">
              <div className="flex items-start justify-between mb-2">
                <IconBox size="sm" backgroundColor="var(--brand-white)">
                  <Calendar className="w-5 h-5" strokeWidth={3} />
                </IconBox>
              </div>
              <div className="text-3xl font-black">{totalMinutes}</div>
              <div className="text-xs font-bold text-gray-600 mt-1">МИНУТ</div>
            </Card>

            {/* Достижения */}
            <Card size="md" backgroundColor="var(--brand-white)" className="p-4">
              <div className="flex items-start justify-between mb-2">
                <IconBox size="sm" backgroundColor="var(--brand-yellow)">
                  <Trophy className="w-5 h-5" strokeWidth={3} />
                </IconBox>
              </div>
              <div className="text-3xl font-black">0</div>
              <div className="text-xs font-bold text-gray-600 mt-1">НАГРАД</div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}