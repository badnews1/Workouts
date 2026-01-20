/**
 * SettingsPage - Страница настроек приложения
 * 
 * Содержит настройки приложения: выбор программы, уровня, сброс данных и другие параметры.
 * 
 * Роут: /settings
 * Доступ: Через иконку в хедере или кнопку в профиле
 */

import { useNavigate } from 'react-router';
import { Bell, Info, Target, UserPen, Key, LogOut } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Header, SettingsSection, SettingsButton } from '@/shared';
import { clearAllWorkoutData } from '@/entities/workout-session';
import { SettingsWorkouts } from '@/widgets/settings-workouts';
import { SettingsDangerZone } from '@/widgets/settings-danger-zone';

export function SettingsPage() {
  const navigate = useNavigate();
  
  const handleResetWorkouts = () => {
    // Подтверждение действия
    if (!window.confirm('Вы уверены, что хотите удалить всю историю тренировок? Это действие нельзя отменить.')) {
      return;
    }

    try {
      const deletedCount = clearAllWorkoutData();
      toast.success(`Удалено записей: ${deletedCount}`);
    } catch (error) {
      toast.error('Ошибка при удалении данных');
      console.error(error);
    }
  };

  const handleDeleteAccount = () => {
    // TODO: Реализовать удаление аккаунта после подключения Supabase
    toast.info('Функция удаления аккаунта будет доступна после подключения Supabase');
  };

  const handleEditProfile = () => {
    // TODO: Реализовать редактирование профиля после подключения Supabase
    toast.info('Функция редактирования профиля будет доступна после подключения Supabase');
  };

  const handleLoginData = () => {
    // TODO: Реализовать изменение данных для входа после подключения Supabase
    toast.info('Функция изменения данных для входа будет доступна после подключения Supabase');
  };

  const handleLogout = () => {
    // TODO: Реализовать выход из аккаунта после подключения Supabase
    toast.info('Функция выхода из аккаунта будет доступна после подключения Supabase');
  };
  
  return (
    <div className="h-full bg-white">
      <Header title="Настройки" onBack={() => navigate(-1)} />
      
      <div className="px-4 py-6 pb-24 space-y-4">
        {/* Секция: Профиль */}
        <SettingsSection title="Профиль">
          <div className="space-y-3">
            <SettingsButton
              icon={UserPen}
              title="Редактировать профиль"
              description="Имя, фото, информация"
              iconBgColor="var(--brand-blue)"
              onClick={handleEditProfile}
            />
            <SettingsButton
              icon={Key}
              title="Данные для входа"
              description="Email и пароль"
              iconBgColor="white"
              onClick={handleLoginData}
            />
            <SettingsButton
              icon={LogOut}
              title="Выйти из аккаунта"
              description="Завершить сеанс"
              iconBgColor="white"
              onClick={handleLogout}
            />
          </div>
        </SettingsSection>

        {/* Секция: Тренировки */}
        <SettingsWorkouts onNavigateToPrograms={() => navigate('/programs')} />

        {/* Секция: Цель */}
        <SettingsSection title="Цель">
          <SettingsButton
            icon={Target}
            title="Настройка целей"
            description="Цель, вес, питание"
            iconBgColor="var(--brand-yellow)"
            onClick={() => navigate('/settings/goals')}
          />
        </SettingsSection>

        {/* Секция: Уведомления */}
        <SettingsSection title="Уведомления">
          <SettingsButton
            icon={Bell}
            title="Напоминания"
            description="Настроить уведомления"
            iconBgColor="white"
          />
        </SettingsSection>

        {/* Секция: О приложении */}
        <SettingsSection title="О приложении">
          <SettingsButton
            icon={Info}
            title="Информация"
            description="Версия 1.0.0"
            iconBgColor="white"
          />
        </SettingsSection>

        {/* Секция: Опасная зона */}
        <SettingsDangerZone onResetData={handleResetWorkouts} onDeleteAccount={handleDeleteAccount} />
      </div>
    </div>
  );
}