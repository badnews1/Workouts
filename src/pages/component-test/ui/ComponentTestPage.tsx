/**
 * ComponentTestPage - Временная страница для тестирования переиспользуемых компонентов
 * 
 * ⚠️ ВРЕМЕННАЯ СТРАНИЦА - удалить перед продакшеном
 */

import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardAction } from '@/components/ui/card';
import { IconBox } from '@/shared/ui/icon-box';
import { Empty, EmptyIcon, EmptyTitle, EmptyDescription, EmptyActions } from '@/components/ui/empty';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Weight, Calendar, Dumbbell, TrendingUp, Award, Activity } from 'lucide-react';

export function ComponentTestPage() {
  const [defaultValue, setDefaultValue] = useState('');
  const [smallValue, setSmallValue] = useState('');
  const [largeValue, setLargeValue] = useState('');
  const [errorValue, setErrorValue] = useState('');
  const [disabledValue] = useState('Disabled input');

  return (
    <div className="min-h-screen bg-white p-4 pb-24">
      <div className="max-w-md mx-auto space-y-6">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">🧪 Тесты компонентов</h1>
          <p className="text-gray-600">Neubrutalism UI Kit</p>
        </div>

        {/* Empty States */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Empty - Пустые состояния</h2>
          
          <Card className="p-4 space-y-6">
            <div>
              <label className="block font-bold mb-3 text-sm">С эмодзи</label>
              <Empty>
                <EmptyIcon variant="emoji">🍎</EmptyIcon>
                <EmptyTitle>Нет продуктов</EmptyTitle>
                <EmptyDescription>Добавьте свой первый продукт</EmptyDescription>
              </Empty>
            </div>

            <div>
              <label className="block font-bold mb-3 text-sm">С IconBox</label>
              <Empty>
                <EmptyIcon variant="iconbox">
                  <Weight className="w-8 h-8" strokeWidth={3} />
                </EmptyIcon>
                <EmptyTitle>Пока нет замеров</EmptyTitle>
                <EmptyDescription>Добавьте первый замер для отслеживания прогресса</EmptyDescription>
              </Empty>
            </div>

            <div>
              <label className="block font-bold mb-3 text-sm">С кнопкой действия</label>
              <Empty>
                <EmptyIcon variant="emoji">⭐</EmptyIcon>
                <EmptyTitle>Нет избранных продуктов</EmptyTitle>
                <EmptyDescription>Добавьте продукты в избранное для быстрого доступа</EmptyDescription>
                <EmptyActions>
                  <Button size="md" variant="default">
                    Добавить продукт
                  </Button>
                </EmptyActions>
              </Empty>
            </div>

            <div>
              <label className="block font-bold mb-3 text-sm">В Card (bg-gray-50)</label>
              <Card className="bg-gray-50">
                <Empty>
                  <EmptyIcon variant="iconbox">
                    <Dumbbell className="w-8 h-8" strokeWidth={3} />
                  </EmptyIcon>
                  <EmptyTitle>Нет сохраненных тренировок</EmptyTitle>
                </Empty>
              </Card>
            </div>
          </Card>
        </section>

        {/* Card Headers */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Card - Карточки с заголовками</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block font-bold mb-3 text-sm">Yellow Header (прием пищи)</label>
              <Card>
                <CardHeader variant="yellow">
                  <CardTitle>Завтрак</CardTitle>
                  <CardDescription>450 ккал</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-bold text-sm">Содержимое карточки</p>
                </CardContent>
              </Card>
            </div>

            <div>
              <label className="block font-bold mb-3 text-sm">Yellow Header (форма)</label>
              <Card>
                <CardHeader variant="yellow">
                  <CardTitle>Новый замер</CardTitle>
                </CardHeader>
                <CardContent>
                  <Input placeholder="Вес" rightText="кг" />
                </CardContent>
              </Card>
            </div>

            <div>
              <label className="block font-bold mb-3 text-sm">Green Header</label>
              <Card>
                <CardHeader variant="green">
                  <CardTitle className="text-white">Завершено</CardTitle>
                  <CardDescription className="text-white">100%</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-bold text-sm">Прогресс выполнен</p>
                </CardContent>
              </Card>
            </div>

            <div>
              <label className="block font-bold mb-3 text-sm">Blue Header</label>
              <Card>
                <CardHeader variant="blue">
                  <CardTitle>Информация</CardTitle>
                  <CardDescription>Детали</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-bold text-sm">Информационная карточка</p>
                </CardContent>
              </Card>
            </div>

            <div>
              <label className="block font-bold mb-3 text-sm">Default Header (без цвета)</label>
              <Card>
                <CardHeader variant="default">
                  <CardTitle>Обычный заголовок</CardTitle>
                  <CardDescription>Без фона</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-bold text-sm">Обычная карточка</p>
                </CardContent>
              </Card>
            </div>

            <div>
              <label className="block font-bold mb-3 text-sm">Header с Action</label>
              <Card>
                <CardHeader variant="yellow">
                  <CardTitle>Обед</CardTitle>
                  <CardAction>
                    <Button size="icon-sm" variant="ghost">
                      ✕
                    </Button>
                  </CardAction>
                </CardHeader>
                <CardContent>
                  <p className="font-bold text-sm">С кнопкой в заголовке</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* IconBox */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">IconBox - Желтые квадраты с иконками</h2>
          
          <Card className="p-4 space-y-6">
            {/* Размеры */}
            <div>
              <label className="block font-bold mb-3 text-sm">Размеры</label>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <IconBox size="sm">
                    <Calendar className="w-5 h-5" strokeWidth={3} />
                  </IconBox>
                  <p className="text-xs font-bold mt-2">sm (40x40)</p>
                </div>
                <div className="text-center">
                  <IconBox size="lg">
                    <Weight className="w-8 h-8" strokeWidth={3} />
                  </IconBox>
                  <p className="text-xs font-bold mt-2">lg (64x64)</p>
                </div>
              </div>
            </div>

            {/* Разные иконки */}
            <div>
              <label className="block font-bold mb-3 text-sm">Разные иконки (size="sm")</label>
              <div className="flex items-center gap-3 flex-wrap">
                <IconBox size="sm">
                  <Calendar className="w-5 h-5" strokeWidth={3} />
                </IconBox>
                <IconBox size="sm">
                  <Weight className="w-5 h-5" strokeWidth={3} />
                </IconBox>
                <IconBox size="sm">
                  <Dumbbell className="w-5 h-5" strokeWidth={3} />
                </IconBox>
                <IconBox size="sm">
                  <TrendingUp className="w-5 h-5" strokeWidth={3} />
                </IconBox>
                <IconBox size="sm">
                  <Award className="w-5 h-5" strokeWidth={3} />
                </IconBox>
                <IconBox size="sm">
                  <Activity className="w-5 h-5" strokeWidth={3} />
                </IconBox>
              </div>
            </div>

            {/* Разные цвета фона */}
            <div>
              <label className="block font-bold mb-3 text-sm">Разные цвета фона</label>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="text-center">
                  <IconBox size="sm" backgroundColor="var(--brand-yellow)">
                    <Dumbbell className="w-5 h-5" strokeWidth={3} />
                  </IconBox>
                  <p className="text-xs font-bold mt-2">Желтый</p>
                </div>
                <div className="text-center">
                  <IconBox size="sm" backgroundColor="var(--brand-green)">
                    <Award className="w-5 h-5 text-white" strokeWidth={3} />
                  </IconBox>
                  <p className="text-xs font-bold mt-2">Зеленый</p>
                </div>
                <div className="text-center">
                  <IconBox size="sm" backgroundColor="var(--brand-blue)">
                    <Activity className="w-5 h-5" strokeWidth={3} />
                  </IconBox>
                  <p className="text-xs font-bold mt-2">Голубой</p>
                </div>
                <div className="text-center">
                  <IconBox size="sm" backgroundColor="var(--brand-red)">
                    <TrendingUp className="w-5 h-5 text-white" strokeWidth={3} />
                  </IconBox>
                  <p className="text-xs font-bold mt-2">Красный</p>
                </div>
              </div>
            </div>

            {/* Использование в карточках */}
            <div>
              <label className="block font-bold mb-3 text-sm">Использование в карточках</label>
              <div className="space-y-3">
                {/* Пример как в MeasurementsPage (пустое состояние) */}
                <Card className="bg-gray-50 p-6 text-center">
                  <IconBox size="lg" className="mx-auto mb-3">
                    <Weight className="w-8 h-8" strokeWidth={3} />
                  </IconBox>
                  <p className="font-bold text-gray-600">Пока нет сохраненных замеров</p>
                </Card>

                {/* Пример как в MeasurementHistoryCard */}
                <Card className="bg-white p-4">
                  <div className="flex items-center gap-3">
                    <IconBox size="sm">
                      <Calendar className="w-5 h-5" strokeWidth={3} />
                    </IconBox>
                    <div className="text-left">
                      <div className="text-sm font-black">15 января 2026, 14:30</div>
                      <div className="text-xs font-bold text-gray-600">Вес: 75.5 кг</div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </Card>
        </section>

        {/* Input тесты */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Input</h2>
          
          <Card className="p-4 space-y-4">
            <div>
              <label className="block font-bold mb-2 text-sm">Small (sm)</label>
              <Input
                size="sm"
                placeholder="Маленький инпут"
                value={smallValue}
                onChange={(e) => setSmallValue(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-bold mb-2 text-sm">Medium (md) - default</label>
              <Input
                size="md"
                placeholder="Средний инпут"
                value={defaultValue}
                onChange={(e) => setDefaultValue(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-bold mb-2 text-sm">Large (lg)</label>
              <Input
                size="lg"
                placeholder="Большой инпут"
                value={largeValue}
                onChange={(e) => setLargeValue(e.target.value)}
              />
            </div>
          </Card>
        </section>

        {/* Варианты */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Варианты</h2>
          
          <Card className="p-4 space-y-4">
            <div>
              <label className="block font-bold mb-2 text-sm">Default</label>
              <Input
                variant="default"
                placeholder="Обычный инпут"
              />
            </div>

            <div>
              <label className="block font-bold mb-2 text-sm">Error</label>
              <Input
                variant="error"
                placeholder="Инпут с ошибкой"
                value={errorValue}
                onChange={(e) => setErrorValue(e.target.value)}
              />
              <p className="text-sm text-[var(--brand-red)] font-bold mt-1">Это поле обязательно</p>
            </div>

            <div>
              <label className="block font-bold mb-2 text-sm">Disabled</label>
              <Input
                placeholder="Заблокированный инпут"
                disabled
                value={disabledValue}
              />
            </div>
          </Card>
        </section>

        {/* Типы */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Типы</h2>
          
          <Card className="p-4 space-y-4">
            <div>
              <label className="block font-bold mb-2 text-sm">Text</label>
              <Input
                type="text"
                placeholder="Введите текст"
              />
            </div>

            <div>
              <label className="block font-bold mb-2 text-sm">Number</label>
              <Input
                type="number"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block font-bold mb-2 text-sm">Email</label>
              <Input
                type="email"
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label className="block font-bold mb-2 text-sm">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block font-bold mb-2 text-sm">Date</label>
              <Input
                type="date"
              />
            </div>
          </Card>
        </section>

        {/* Без тени */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Без тени</h2>
          
          <Card className="p-4 space-y-4">
            <div>
              <label className="block font-bold mb-2 text-sm">Shadow = false</label>
              <Input
                shadow={false}
                placeholder="Инпут без тени"
              />
            </div>
          </Card>
        </section>

        {/* Размеры текста */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Размеры текста</h2>
          
          <Card className="p-4 space-y-4">
            <div>
              <label className="block font-bold mb-2 text-sm">fontSize="sm"</label>
              <Input
                fontSize="sm"
                placeholder="Маленький текст"
              />
            </div>

            <div>
              <label className="block font-bold mb-2 text-sm">fontSize="md" - default</label>
              <Input
                fontSize="md"
                placeholder="Средний текст"
              />
            </div>

            <div>
              <label className="block font-bold mb-2 text-sm">fontSize="lg"</label>
              <Input
                fontSize="lg"
                placeholder="Большой текст"
              />
            </div>

            <div>
              <label className="block font-bold mb-2 text-sm">fontSize="xl"</label>
              <Input
                fontSize="xl"
                placeholder="Очень большой текст"
              />
            </div>
          </Card>
        </section>

        {/* Жирность текста */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Жирность текста</h2>
          
          <Card className="p-4 space-y-4">
            <div>
              <label className="block font-bold mb-2 text-sm">fontWeight="normal" - default</label>
              <Input
                fontWeight="normal"
                placeholder="Обычный"
              />
            </div>

            <div>
              <label className="block font-bold mb-2 text-sm">fontWeight="medium"</label>
              <Input
                fontWeight="medium"
                placeholder="Средняя жирность"
              />
            </div>

            <div>
              <label className="block font-bold mb-2 text-sm">fontWeight="semibold"</label>
              <Input
                fontWeight="semibold"
                placeholder="Полужирный"
              />
            </div>

            <div>
              <label className="block font-bold mb-2 text-sm">fontWeight="bold"</label>
              <Input
                fontWeight="bold"
                placeholder="Жирный"
              />
            </div>

            <div>
              <label className="block font-bold mb-2 text-sm">fontWeight="black"</label>
              <Input
                fontWeight="black"
                placeholder="Максимальная жирность"
              />
            </div>
          </Card>
        </section>

        {/* Комбинации */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Комбинации</h2>
          
          <Card className="p-4 space-y-4">
            <div>
              <label className="block font-bold mb-2 text-sm">size="lg" + fontSize="xl" + fontWeight="black"</label>
              <Input
                size="lg"
                fontSize="xl"
                fontWeight="black"
                placeholder="Большой инпут с крупным жирным текстом"
              />
            </div>

            <div>
              <label className="block font-bold mb-2 text-sm">size="sm" + fontSize="sm" + fontWeight="medium"</label>
              <Input
                size="sm"
                fontSize="sm"
                fontWeight="medium"
                placeholder="Маленький компактный инпут"
              />
            </div>
          </Card>
        </section>

        {/* Текст справа */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Текст справа (rightText)</h2>
          
          <Card className="p-4 space-y-4">
            <div>
              <label className="block font-bold mb-2 text-sm">rightText="кг"</label>
              <Input
                type="number"
                placeholder="0"
                rightText="кг"
              />
            </div>

            <div>
              <label className="block font-bold mb-2 text-sm">rightText="см"</label>
              <Input
                type="number"
                placeholder="0"
                rightText="см"
              />
            </div>

            <div>
              <label className="block font-bold mb-2 text-sm">rightText="%" + fontSize="xl" + fontWeight="black"</label>
              <Input
                type="number"
                fontSize="xl"
                fontWeight="black"
                placeholder="0"
                rightText="%"
              />
            </div>

            <div>
              <label className="block font-bold mb-2 text-sm">rightText="руб" + size="lg"</label>
              <Input
                type="number"
                size="lg"
                placeholder="0"
                rightText="руб"
              />
            </div>

            <div>
              <label className="block font-bold mb-2 text-sm">rightText="г" + fontSize="2xl" + fontWeight="black" + size="lg"</label>
              <Input
                type="number"
                fontSize="2xl"
                fontWeight="black"
                size="lg"
                placeholder="0"
                rightText="г"
              />
            </div>

            <div>
              <label className="block font-bold mb-2 text-sm">Без текста справа</label>
              <Input
                type="number"
                placeholder="0"
              />
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}