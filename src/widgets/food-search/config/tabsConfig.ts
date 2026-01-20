/**
 * tabsConfig - Конфигурация табов поиска продуктов
 */

export type Tab = 'my-foods' | 'my-recipes' | 'favorites';

export const FOOD_SEARCH_TABS = [
  { id: 'my-foods' as Tab, label: 'Продукты' },
  { id: 'my-recipes' as Tab, label: 'Рецепты' },
  { id: 'favorites' as Tab, label: 'Избранное' },
] as const;
