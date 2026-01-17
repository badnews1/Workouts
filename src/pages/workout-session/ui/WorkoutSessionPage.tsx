/**
 * WorkoutSessionPage - Страница выполнения тренировки
 * 
 * Активная тренировочная сессия с двумя таймерами (общий и текущего упражнения).
 * Позволяет пошагово проходить упражнения, вводить результаты и автоматически переходить к следующему упражнению.
 * 
 * Роут: /workout-session/:workoutId
 * Query параметры: ?autostart=true - автоматический запуск тренировки
 * Навигация:
 *   - Назад/Завершить → возврат на предыдущую страницу (обычно PeriodDetailPage)
 */

import { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ChevronLeft, Clock, Check, Lock } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Header } from '../../../shared/ui/header';
import { calisthenicsLevel1 } from '../../../entities/workout';
import type { Exercise, Workout } from '../../../entities/workout';

// Тип для сохраненного состояния тренировки
interface SavedWorkoutState {
  workoutId: string;
  isCompleted: boolean;
  totalTime: number;
  completedExercises: number[];
  results: Record<string, number>;
  completionDate: string | null;
}

// Функции для работы с localStorage
function saveWorkoutState(state: SavedWorkoutState) {
  const key = `workout_${state.workoutId}`;
  localStorage.setItem(key, JSON.stringify(state));
}

function loadWorkoutState(workoutId: string): SavedWorkoutState | null {
  const key = `workout_${workoutId}`;
  const saved = localStorage.getItem(key);
  if (!saved) return null;
  try {
    return JSON.parse(saved);
  } catch {
    return null;
  }
}

export function WorkoutSessionPage() {
  const navigate = useNavigate();
  const { workoutId } = useParams();
  const [searchParams] = useSearchParams();
  
  // Найдем тренировку
  const workout = findWorkoutById(workoutId || '');
  
  // Найдем период и день
  const workoutInfo = getWorkoutInfo(workoutId || '');
  
  const [isRunning, setIsRunning] = useState(true); // Тренировка запускается автоматически
  const [totalTime, setTotalTime] = useState(0);
  const [exerciseTimer, setExerciseTimer] = useState(0);
  const [exerciseTimerRunning, setExerciseTimerRunning] = useState(false);
  const [results, setResults] = useState<Record<string, number>>({});
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);
  const [isWorkoutCompleted, setIsWorkoutCompleted] = useState(false);
  const [completionDate, setCompletionDate] = useState<Date | null>(null);
  const [expandedExercises, setExpandedExercises] = useState<number[]>([]);
  const [confirmedResults, setConfirmedResults] = useState<Set<string>>(new Set());

  // Загружаем сохраненное состояние тренировки
  useEffect(() => {
    const savedState = loadWorkoutState(workoutId || '');
    if (savedState && savedState.isCompleted) {
      // Если тренировка уже завершена - загружаем данные и НЕ запускаем таймер
      setTotalTime(savedState.totalTime);
      setCompletedExercises(savedState.completedExercises);
      setResults(savedState.results);
      setIsWorkoutCompleted(true);
      setCompletionDate(savedState.completionDate ? new Date(savedState.completionDate) : null);
      setIsRunning(false); // Таймер не запускается для завершенной тренировки
    } else {
      // Новая тренировка - таймер запускается автоматически
      setIsRunning(true);
    }
  }, [workoutId]);

  // Общий таймер - всегда идет когда isRunning = true
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setTotalTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  // Таймер упражнения - простой прямой отсчет (считает вверх)
  useEffect(() => {
    if (!exerciseTimerRunning) return;
    
    const interval = setInterval(() => {
      setExerciseTimer((prev) => prev + 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [exerciseTimerRunning]);

  const handleResetTotalTimer = () => {
    setTotalTime(0);
    setIsRunning(false);
    setCurrentExerciseIndex(0);
    setCompletedExercises([]);
    setExerciseTimer(0);
    setExerciseTimerRunning(false);
    setResults({});
    setIsWorkoutCompleted(false);
    setCompletionDate(null);
  };

  const handleFinish = () => {
    if (!isWorkoutCompleted) {
      // Первое нажатие - завершаем тренировку
      setIsRunning(false);
      setExerciseTimerRunning(false);
      setIsWorkoutCompleted(true);
      const now = new Date();
      setCompletionDate(now);
      // Отмечаем все упражнения как выполненные
      const allCompleted = workout.exercises.map((_, index) => index);
      setCompletedExercises(allCompleted);
      
      // Сохраняем состояние в localStorage
      saveWorkoutState({
        workoutId: workoutId || '',
        isCompleted: true,
        totalTime,
        completedExercises: allCompleted,
        results,
        completionDate: now.toISOString(),
      });
    } else {
      // Второе нажатие - возвращаемся на страницу периода
      navigate(-1);
    }
  };

  const handleResultChange = (exerciseId: string, value: number) => {
    setResults((prev) => ({ ...prev, [exerciseId]: value }));
    // При изменении значения снимаем подтверждение
    setConfirmedResults((prev) => {
      const newSet = new Set(prev);
      newSet.delete(exerciseId);
      return newSet;
    });
  };

  const handleConfirmResult = (exerciseId: string) => {
    const value = results[exerciseId];
    if (value !== undefined && value > 0) {
      setConfirmedResults((prev) => new Set(prev).add(exerciseId));
      toast.success('Результат сохранён');
    } else {
      toast.error('Введите результат');
    }
  };

  const handleStartExerciseTimer = () => {
    setExerciseTimerRunning(true);
  };

  const handleCompleteExercise = (index: number) => {
    if (isWorkoutCompleted) {
      return; // Если тренировка завершена, нельзя изменять галочки
    }
    
    setCompletedExercises((prev) => {
      // Если упражнение уже выполнено - снимаем отметку
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      }
      // Иначе добавляем в выполненные
      return [...prev, index];
    });
    
    // Сбрасываем таймер
    setExerciseTimer(0);
    setExerciseTimerRunning(false);
  };

  const toggleExercise = (index: number) => {
    setExpandedExercises((prev) => {
      if (prev.includes(index)) {
        // Сворачиваем упражнение
        return prev.filter((i) => i !== index);
      } else {
        // Раскрываем упражнение
        return [...prev, index];
      }
    });
    
    // Устанавливаем текущее упражнение
    setCurrentExerciseIndex(index);
    
    // Сбрасываем таймер упражнения при переключении
    setExerciseTimer(0);
    setExerciseTimerRunning(false);
  };

  if (!workout) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500">Тренировка не найдена</p>
      </div>
    );
  }

  const currentExercise = workout.exercises[currentExerciseIndex];
  const hasTimerExercise = currentExercise && (currentExercise.type === 'time' || currentExercise.type === 'circuit' || currentExercise.type === 'static') && currentExercise.duration;

  // Сортируем упражнения: невыполненные первыми, выполненные в конце
  const sortedExercises = workout.exercises
    .map((exercise, index) => ({ exercise, originalIndex: index }))
    .sort((a, b) => {
      const aCompleted = completedExercises.includes(a.originalIndex) || isWorkoutCompleted;
      const bCompleted = completedExercises.includes(b.originalIndex) || isWorkoutCompleted;
      
      // Если статус выполнения разный - невыполненные идут первыми
      if (aCompleted !== bCompleted) {
        return aCompleted ? 1 : -1;
      }
      
      // Если статус одинаковый - сохраняем исходный порядок
      return a.originalIndex - b.originalIndex;
    });

  return (
    <div className="h-screen flex flex-col bg-white">
      <Header
        title={workout.name}
        subtitle={workoutInfo?.subtitle || ''}
        leftAction={
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors -ml-2"
            aria-label="Назад"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
        }
      />

      <div className="flex-1 overflow-auto">
        <div className="px-4 pt-4 pb-32">
          {/* Компактная карточка общего таймера */}
          <div className={`rounded-2xl p-4 flex items-center gap-3 mb-6 ${
            isWorkoutCompleted ? 'bg-[#0db37d]/10' : 'bg-indigo-50'
          }`}>
            <div className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center ${
              isWorkoutCompleted ? 'bg-[#0db37d]' : 'bg-indigo-100'
            }`}>
              {isWorkoutCompleted ? (
                <Check className="w-6 h-6 text-white" strokeWidth={3} />
              ) : (
                <Clock className="w-5 h-5 text-indigo-600" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-600 font-medium mb-0.5">
                {isWorkoutCompleted ? 'Тренировка завершена' : 'Время тренировки'}
              </p>
              <p className="text-2xl font-bold text-gray-900 tracking-tight">{formatTime(totalTime)}</p>
            </div>
          </div>

          {/* Единый таймер упражнения - показывается только во время тренировки */}
          {!isWorkoutCompleted && (
            <div className="bg-[#615fff] rounded-3xl p-6 shadow-lg mb-6">
              <div className="text-center">
                <p className="text-white/90 text-sm font-medium mb-3">
                  Таймер
                </p>
                <div className="text-6xl font-bold text-white mb-4 tracking-tight">
                  {formatTime(exerciseTimer)}
                </div>
                <div className="flex gap-2 justify-center">
                  {!exerciseTimerRunning && exerciseTimer === 0 && (
                    <button
                      onClick={handleStartExerciseTimer}
                      className="px-8 py-2.5 bg-white text-[#615fff] rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-md text-sm"
                    >
                      Старт
                    </button>
                  )}
                  {exerciseTimerRunning && (
                    <>
                      <button
                        onClick={() => setExerciseTimerRunning(false)}
                        className="px-8 py-2.5 bg-white text-[#615fff] rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-md text-sm"
                      >
                        Пауза
                      </button>
                      <button
                        onClick={() => {
                          setExerciseTimer(0);
                          setExerciseTimerRunning(false);
                        }}
                        className="px-7 py-2.5 bg-white/20 text-white rounded-xl font-semibold hover:bg-white/30 transition-colors backdrop-blur-sm text-sm"
                      >
                        Сброс
                      </button>
                    </>
                  )}
                  {!exerciseTimerRunning && exerciseTimer > 0 && (
                    <>
                      <button
                        onClick={() => setExerciseTimerRunning(true)}
                        className="px-8 py-2.5 bg-white text-[#615fff] rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-md text-sm"
                      >
                        Продолжить
                      </button>
                      <button
                        onClick={() => {
                          setExerciseTimer(0);
                          setExerciseTimerRunning(false);
                        }}
                        className="px-7 py-2.5 bg-white/20 text-white rounded-xl font-semibold hover:bg-white/30 transition-colors backdrop-blur-sm text-sm"
                      >
                        Сброс
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Все упражнения */}
          <div className="space-y-4">
          {sortedExercises.map(({ exercise, originalIndex }, index) => {
            const isCompleted = completedExercises.includes(originalIndex) || isWorkoutCompleted;
            // Первое невыполненное упражнение - активное, остальные невыполненные - заблокированы
            const isLocked = !isCompleted && index > 0 && !completedExercises.includes(sortedExercises[index - 1].originalIndex);

            return (
              /* Карточка упражнения в стиле Neubrutalism */
              <div 
                key={exercise.id}
                className={`bg-white border-4 border-black overflow-hidden transition-all ${
                  isCompleted ? 'opacity-50' : ''
                } ${
                  isLocked ? 'opacity-60' : ''
                }`}
                style={{
                  boxShadow: '6px 6px 0px 0px #000000'
                }}
              >
                {/* Шапка упражнения */}
                {(exercise.type === 'circuit' || exercise.type === 'combo') && (
                  <div className="bg-[#FFD93D] border-b-4 border-black px-4 py-2 flex items-center gap-2">
                    <div className="bg-black text-white px-3 py-1 font-black text-sm">
                      {exercise.exercises?.length || 0}X
                    </div>
                    <span className="font-black text-black text-lg uppercase tracking-tight">
                      {exercise.type === 'circuit' ? 'Круговая работа' : exercise.name}
                    </span>
                  </div>
                )}

                {/* Основной контент */}
                <div className="p-4">
                  {/* Заголовок для не-круговых */}
                  {exercise.type !== 'circuit' && exercise.type !== 'combo' && (
                    <div className="mb-3">
                      <h2 className="text-xl font-black text-black mb-1">
                        {exercise.name}
                      </h2>
                      {exercise.description && (
                        <p className="text-sm text-gray-600 font-medium">
                          {exercise.description}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Вложенные упражнения для circuit/combo/time */}
                  {(exercise.type === 'circuit' || exercise.type === 'combo' || exercise.type === 'time') && exercise.exercises && (
                    <div className="space-y-3">
                      {exercise.exercises.map((subExercise, subIndex) => (
                        <div 
                          key={subExercise.id}
                          className="border-4 border-black bg-white overflow-hidden"
                          style={{
                            boxShadow: '4px 4px 0px 0px #000000'
                          }}
                        >
                          <div className="flex">
                            {/* Черная панель с номером для вложенного упражнения */}
                            <div className="bg-black border-r-4 border-black w-16 flex items-center justify-center py-4">
                              <span className="text-white font-black text-3xl">{subIndex + 1}</span>
                            </div>

                            {/* Контент вложенного упражнения */}
                            <div className="flex-1 p-3">
                              <h3 className="font-black text-black text-base mb-1">
                                {subExercise.name}
                              </h3>
                              
                              {/* Параметры */}
                              <div className="text-sm text-gray-600 font-medium mb-2">
                                {subExercise.type === 'reps' && subExercise.targetReps && (
                                  <span>{subExercise.targetReps} повторений</span>
                                )}
                                {subExercise.type === 'static' && subExercise.duration && (
                                  <span>{subExercise.duration} секунд</span>
                                )}
                                {subExercise.type === 'time' && subExercise.duration && (
                                  <span>{Math.floor(subExercise.duration / 60)} минут</span>
                                )}
                              </div>
                              
                              {/* Поле ввода результата для вложенного упражнения */}
                              {subExercise.recordResult && !isCompleted && (
                                <div className="flex gap-2">
                                  <input
                                    type="number"
                                    value={results[subExercise.id] || ''}
                                    onChange={(e) =>
                                      handleResultChange(subExercise.id, parseInt(e.target.value) || 0)
                                    }
                                    className="flex-1 px-4 py-3 border-4 border-black text-2xl font-black text-center focus:outline-none focus:ring-0"
                                    placeholder="0"
                                    style={{
                                      boxShadow: '4px 4px 0px 0px #000000'
                                    }}
                                  />
                                  <button
                                    onClick={() => handleConfirmResult(subExercise.id)}
                                    className={`flex-shrink-0 w-14 h-14 border-4 border-black flex items-center justify-center transition-all font-black ${
                                      confirmedResults.has(subExercise.id) 
                                        ? 'bg-[#00D26A] text-white' 
                                        : 'bg-black text-white hover:bg-gray-800'
                                    }`}
                                    style={{
                                      boxShadow: '4px 4px 0px 0px #000000'
                                    }}
                                  >
                                    <Check className="w-7 h-7" strokeWidth={4} />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Информация для простых упражнений */}
                  {exercise.type !== 'circuit' && exercise.type !== 'combo' && exercise.type !== 'time' && (
                    <div>
                      {exercise.type === 'reps' && exercise.targetReps && (
                        <p className="text-sm text-gray-600 font-medium mb-3">
                          {exercise.targetReps} повторения
                        </p>
                      )}

                      {exercise.type === 'total' && exercise.totalTarget && (
                        <p className="text-sm text-gray-600 font-medium mb-3">
                          Тотал: {exercise.totalTarget} повторений
                        </p>
                      )}
                    </div>
                  )}

                  {/* Поле ввода результата для основного упражнения */}
                  {exercise.recordResult && !isCompleted && exercise.type !== 'circuit' && exercise.type !== 'combo' && (
                    <div className="flex gap-2 mt-3">
                      <input
                        type="number"
                        value={results[exercise.id] || ''}
                        onChange={(e) =>
                          handleResultChange(exercise.id, parseInt(e.target.value) || 0)
                        }
                        className="flex-1 px-4 py-3 border-4 border-black text-2xl font-black text-center focus:outline-none focus:ring-0"
                        placeholder="0"
                        style={{
                          boxShadow: '4px 4px 0px 0px #000000'
                        }}
                      />
                      <button
                        onClick={() => handleConfirmResult(exercise.id)}
                        className={`flex-shrink-0 w-14 h-14 border-4 border-black flex items-center justify-center transition-all font-black ${
                          confirmedResults.has(exercise.id) 
                            ? 'bg-[#00D26A] text-white' 
                            : 'bg-black text-white hover:bg-gray-800'
                        }`}
                        style={{
                          boxShadow: '4px 4px 0px 0px #000000'
                        }}
                      >
                        <Check className="w-7 h-7" strokeWidth={4} />
                      </button>
                    </div>
                  )}

                  {/* Чекбокс завершения */}
                  <div className="mt-4 flex items-center gap-3">
                    <button
                      onClick={() => !isLocked && handleCompleteExercise(originalIndex)}
                      disabled={isLocked}
                      className={`flex-shrink-0 w-12 h-12 border-4 border-black flex items-center justify-center transition-all ${
                        isLocked
                          ? 'bg-gray-300 cursor-not-allowed'
                          : isCompleted
                          ? 'bg-[#00D26A]'
                          : 'bg-white hover:bg-gray-100'
                      }`}
                      style={{
                        boxShadow: '3px 3px 0px 0px #000000'
                      }}
                    >
                      {isLocked ? (
                        <Lock className="w-5 h-5 text-gray-600" strokeWidth={3} />
                      ) : isCompleted ? (
                        <Check className="w-6 h-6 text-white" strokeWidth={4} />
                      ) : null}
                    </button>
                    <span className="text-sm font-bold text-gray-700">
                      {isCompleted ? 'Выполнено' : isLocked ? 'Заблокировано' : 'Отметить выполнение'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </div>

      {/* Фиксированная кнопка внизу */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <button
          onClick={handleFinish}
          className={`w-full py-4 text-white rounded-2xl font-semibold transition-colors shadow-lg ${
            isWorkoutCompleted 
              ? 'bg-[#0db37d] hover:bg-[#0ca171]' 
              : 'bg-indigo-500 hover:bg-indigo-600'
          }`}
        >
          {isWorkoutCompleted ? 'Тренировка завершена' : 'Завершить тренировку'}
        </button>
      </div>
    </div>
  );
}

// Утилиты
function findWorkoutById(id: string): Workout | null {
  // Ищем в вводных тренировках
  const introWorkout = calisthenicsLevel1.introWorkouts.find((w) => w.id === id);
  if (introWorkout) return introWorkout;

  // Ищем в периодах
  for (const period of calisthenicsLevel1.periods) {
    const workout = period.workouts.find((w) => w.id === id);
    if (workout) return workout;
  }

  return null;
}

function getWorkoutInfo(id: string): { subtitle: string } | null {
  // Ищем в вводных тренировах
  const introWorkout = calisthenicsLevel1.introWorkouts.find((w) => w.id === id);
  if (introWorkout) return { subtitle: 'Вводная тренировка' };

  // Ищем в периодах
  let periodNumber = 0;
  for (const period of calisthenicsLevel1.periods) {
    if (period.id === 'period-intro') continue; // Пропускаем вводный период
    periodNumber++;
    const workout = period.workouts.find((w) => w.id === id);
    if (workout) {
      return { subtitle: `Период ${periodNumber} • День ${period.currentDay || 3}` };
    }
  }

  return null;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}