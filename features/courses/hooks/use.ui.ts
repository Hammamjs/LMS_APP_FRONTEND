import { useState } from 'react';
import { Level } from '../types/course.types';

type UiProps = {
  initialQuery: string;
  initialCategory: string | null;
};
const useUi = ({ initialCategory, initialQuery }: UiProps) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState('popular');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    initialCategory,
  );
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

  const clearAllFilters = () => {
    setSelectedCategory(null);
    setSelectedLevel(null);
    setSelectedPrice(null);
    setSearchQuery('');
  };

  return {
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    selectedCategory,
    setSelectedCategory,
    selectedLevel,
    setSelectedLevel,
    selectedPrice,
    setSelectedPrice,
    clearAllFilters,
  };
};

export default useUi;
