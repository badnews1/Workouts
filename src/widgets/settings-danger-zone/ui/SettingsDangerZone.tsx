/**
 * SettingsDangerZone - Секция опасных операций
 * 
 * Кнопки сброса данных и удаления аккаунта
 */

import { Trash2, UserX } from 'lucide-react';
import { SettingsSection, SettingsButton } from '@/shared';

interface SettingsDangerZoneProps {
  onResetData: () => void;
  onDeleteAccount?: () => void;
}

export function SettingsDangerZone({ onResetData, onDeleteAccount }: SettingsDangerZoneProps) {
  return (
    <SettingsSection title="Опасная зона" isDanger>
      <div className="space-y-3">
        <SettingsButton
          icon={Trash2}
          title="Сбросить все данные"
          description="Удалить историю тренировок"
          iconBgColor="var(--brand-red)"
          iconColor="var(--brand-white)"
          textColor="var(--brand-red)"
          onClick={onResetData}
        />
        <SettingsButton
          icon={UserX}
          title="Удалить аккаунт"
          description="Полностью удалить аккаунт"
          iconBgColor="var(--brand-red)"
          iconColor="var(--brand-white)"
          textColor="var(--brand-red)"
          onClick={onDeleteAccount}
        />
      </div>
    </SettingsSection>
  );
}