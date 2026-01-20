/**
 * navigationConfig - Конфигурация нижней навигации
 * 
 * Определяет элементы навигационного меню
 */

import { Dumbbell, Apple, User, Ruler } from 'lucide-react';

export const NAV_ITEMS = [
  { path: '/workouts', label: 'Тренировки', Icon: Dumbbell, color: '#ffda54' },
  { path: '/nutrition', label: 'Питание', Icon: Apple, color: '#10b981' },
  { path: '/measurements', label: 'Замеры', Icon: Ruler, color: '#93c5fd' },
  { path: '/profile', label: 'Профиль', Icon: User, color: '#ffda54' },
] as const;