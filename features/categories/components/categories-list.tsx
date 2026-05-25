import { Code } from 'lucide-react';

import { categoryColors, categoryIcons } from '../config/category.config';
import { Category } from './category';

type Props = {
  categories: string[];
};

export const CategoriesList = ({ categories }: Props) => {
  return categories.map((category) => {
    const Icon = categoryIcons[category] || Code;
    const gradientClass =
      categoryColors[category] || 'from-primary/20 to-accent/20';

    return (
      <Category
        category={category}
        Icon={Icon}
        gradientClass={gradientClass}
        key={category}
      />
    );
  });
};
