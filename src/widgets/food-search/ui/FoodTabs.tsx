/**
 * FoodTabs - Переключатель табов для поиска продуктов
 */

import type { Tab } from '../config';
import { FOOD_SEARCH_TABS } from '../config';
import { Button } from '@/components/ui/button';

interface FoodTabsProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export function FoodTabs({ activeTab, onTabChange }: FoodTabsProps) {
  return (
    <div className="flex gap-2 mb-4">
      {FOOD_SEARCH_TABS.map(tab => (
        <Button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          variant={activeTab === tab.id ? 'secondary' : 'outline'}
          size="sm"
          className="flex-1 uppercase"
          style={{ boxShadow: '2px 2px 0px var(--brand-black)' }}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
}