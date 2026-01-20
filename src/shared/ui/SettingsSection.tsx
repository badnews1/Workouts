/**
 * SettingsSection - Секция настроек с заголовком
 * 
 * Обёртка для группы настроек с единым стилем
 */

interface SettingsSectionProps {
  title: string;
  isDanger?: boolean;
  children: React.ReactNode;
}

export function SettingsSection({ title, isDanger = false, children }: SettingsSectionProps) {
  return (
    <div>
      <h2 className={`text-xs font-black uppercase tracking-wide mb-3 px-1 ${
        isDanger ? 'text-red-500' : 'text-gray-500'
      }`}>
        {title}
      </h2>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
}
