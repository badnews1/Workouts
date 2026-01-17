import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner@2.0.3';
import { WorkoutsPage } from './pages/workouts';
import { ProgramsPage } from './pages/programs';
import { NutritionPage } from './pages/nutrition';
import { ProfilePage } from './pages/profile';
import { LevelDetailPage } from './pages/level-detail';
import { PeriodDetailPage } from './pages/period-detail';
import { WorkoutSessionPage } from './pages/workout-session';
import { BottomNavigation } from './widgets/bottom-navigation';

function AppContent() {
  const location = useLocation();
  const hideBottomNav = location.pathname.includes('/workout-session/');

  return (
    <div className="h-screen flex flex-col bg-white">
      <Toaster position="top-center" />
      <main className={`flex-1 overflow-auto ${hideBottomNav ? '' : 'pb-20'}`}>
        <Routes>
          <Route path="/" element={<Navigate to="/workouts" replace />} />
          <Route path="/workouts" element={<WorkoutsPage />} />
          <Route path="/workouts/:programId/:levelId" element={<LevelDetailPage />} />
          <Route path="/workouts/:programId/:levelId/intro" element={<PeriodDetailPage />} />
          <Route path="/workouts/:programId/:levelId/period/:periodNumber" element={<PeriodDetailPage />} />
          <Route path="/workout-session/:workoutId" element={<WorkoutSessionPage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/nutrition" element={<NutritionPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>
      {!hideBottomNav && <BottomNavigation />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}