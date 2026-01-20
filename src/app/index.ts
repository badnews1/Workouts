/**
 * app - Главный модуль приложения
 * 
 * Композиция всех слоев приложения:
 * - Провайдеры (роутер, уведомления)
 * - Layout (структура страниц)
 * - Роутинг (маршруты)
 */

import { AppProvider } from './providers/AppProvider';
import { AppLayout } from './layout/AppLayout';
import { AppRoutes } from './routing/routes';

export function App() {
  return (
    <AppProvider>
      <AppLayout>
        <AppRoutes />
      </AppLayout>
    </AppProvider>
  );
}
