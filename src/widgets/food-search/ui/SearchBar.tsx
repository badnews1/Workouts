/**
 * SearchBar - Строка поиска с кнопкой создания продукта/рецепта
 */

import { Search, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { Tab } from '../config';

interface SearchBarProps {
  searchQuery: string;
  activeTab: Tab;
  onSearchChange: (query: string) => void;
  onCreateFood: () => void;
  onCreateRecipe?: () => void;
}

export function SearchBar({ 
  searchQuery, 
  activeTab,
  onSearchChange, 
  onCreateFood,
  onCreateRecipe,
}: SearchBarProps) {
  const isRecipesTab = activeTab === 'my-recipes';
  const placeholder = isRecipesTab ? 'Поиск рецептов...' : 'Поиск продуктов...';
  
  const handleCreate = () => {
    if (isRecipesTab && onCreateRecipe) {
      onCreateRecipe();
    } else {
      onCreateFood();
    }
  };

  return (
    <div className="mb-4 flex gap-2">
      <div className="relative flex-1">
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="pl-12"
          size="md"
          fontWeight="black"
          fontSize="md"
        />
        <Search 
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" 
          size={20}
          strokeWidth={3}
        />
      </div>
      <Button
        onClick={handleCreate}
        variant="primary"
        size="icon"
        className="flex-shrink-0"
      >
        <Plus className="w-7 h-7 text-white" strokeWidth={3} />
      </Button>
    </div>
  );
}