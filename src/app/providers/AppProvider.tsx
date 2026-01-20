/**
 * AppProvider - Провайдер приложения
 * 
 * Оборачивает приложение в необходимые провайдеры:
 * - BrowserRouter для роутинга
 * - Toaster для уведомлений
 */

import { BrowserRouter } from 'react-router';
import { Toaster } from 'sonner@2.0.3';

interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      {children}
    </BrowserRouter>
  );
}
