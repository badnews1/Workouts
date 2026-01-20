/**
 * routes - Конфигурация роутов приложения
 * 
 * Определяет все маршруты приложения
 */

import { Routes, Route, Navigate } from 'react-router';
import { WorkoutsPage } from '@/pages/workouts';
import { ProgramsPage } from '@/pages/programs';
import { NutritionPage } from '@/pages/nutrition';
import { ProfilePage } from '@/pages/profile';
import { SettingsPage } from '@/pages/settings';
import { SettingsGoalsPage } from '@/pages/settings-goals';
import { MeasurementsPage } from '@/pages/measurements';
import { LevelDetailPage } from '@/pages/level-detail';
import { PeriodDetailPage } from '@/pages/period-detail';
import { WorkoutSessionPage } from '@/pages/workout-session';
import { AddFoodPage } from '@/pages/add-food';
import { CreateFoodPage } from '@/pages/create-food';
import { CreateRecipePage } from '@/pages/create-recipe';
import { FoodDetailPage } from '@/pages/food-detail';
import { RecipeDetailPage } from '@/pages/recipe-detail';
import { RecipesPage } from '@/pages/recipes';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/workouts" replace />} />
      <Route path="/recipes" element={<RecipesPage />} />
      <Route path="/workouts" element={<WorkoutsPage />} />
      <Route path="/workouts/:programId/:levelId" element={<LevelDetailPage />} />
      <Route path="/workouts/:programId/:levelId/intro" element={<PeriodDetailPage />} />
      <Route path="/workouts/:programId/:levelId/period/:periodNumber" element={<PeriodDetailPage />} />
      <Route path="/workout-session/:workoutId" element={<WorkoutSessionPage />} />
      <Route path="/programs" element={<ProgramsPage />} />
      <Route path="/nutrition" element={<NutritionPage />} />
      <Route path="/measurements" element={<MeasurementsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/settings/goals" element={<SettingsGoalsPage />} />
      <Route path="/add-food" element={<AddFoodPage />} />
      <Route path="/create-food" element={<CreateFoodPage />} />
      <Route path="/create-recipe" element={<CreateRecipePage />} />
      <Route path="/food-detail" element={<FoodDetailPage />} />
      <Route path="/recipe-detail" element={<RecipeDetailPage />} />
    </Routes>
  );
}