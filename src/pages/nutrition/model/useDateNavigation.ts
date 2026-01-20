/**
 * useDateNavigation - Хук для навигации по датам в дневнике питания
 * 
 * Управляет выбранной датой и переключением между днями
 */

import { useState } from 'react';
import { useNavigate } from 'react-router';
import { getDateKey } from '@/shared/lib/utils';

interface UseDateNavigationProps {
  initialDate?: Date;
}

export function useDateNavigation({ initialDate = new Date() }: UseDateNavigationProps = {}) {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(initialDate);

  const changeDate = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
    navigate(`/nutrition?date=${getDateKey(newDate)}`);
  };

  return {
    selectedDate,
    changeDate,
  };
}