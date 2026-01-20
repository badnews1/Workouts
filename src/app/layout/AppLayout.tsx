/**
 * AppLayout - Основной layout приложения
 * 
 * Определяет общую структуру страниц:
 * - Контейнер с фиксированной высотой
 * - Основной контент с overflow
 * - Нижняя навигация (скрывается на определенных страницах)
 */

import { useLocation } from 'react-router';
import { BottomNavigation } from '@/widgets/bottom-navigation';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();
  
  // Определяем на каких страницах скрывать нижнюю навигацию
  const hideBottomNav = location.pathname.includes('/workout-session/') || 
                        location.pathname.includes('/add-food') || 
                        location.pathname.includes('/create-food') ||
                        location.pathname.includes('/create-recipe') ||
                        location.pathname.includes('/food-detail') ||
                        location.pathname.includes('/recipe-detail');

  return (
    <div className="h-screen flex flex-col bg-white">
      <main className={`flex-1 overflow-auto ${hideBottomNav ? '' : 'pb-20'}`}>
        {children}
      </main>
      {!hideBottomNav && <BottomNavigation />}
    </div>
  );
}