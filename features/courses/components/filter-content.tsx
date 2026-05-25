import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  Checkbox,
  Label,
  AccordionContent,
} from '@/shared/ui';
import { CourseFiltersProps } from '../types/course.types';
import { levels } from '../lib/sort.level';
import { priceOptions } from '../lib/price.option';
import { useCourseCategoriesQuery } from '../api/courses.api';
import { useEffect } from 'react';

function FilterContent({
  selectedCategory,
  selectedLevel,
  selectedPrice,
  onCategoryChange,
  onLevelChange,
  onPriceChange,
}: CourseFiltersProps) {
  const { data: categories } = useCourseCategoriesQuery();

  useEffect(() => {
    console.log(categories);
  }, [categories]);

  if (!categories?.length) return;

  return (
    <Accordion
      type="multiple"
      defaultValue={['category', 'level', 'price']}
      className="w-full"
    >
      Category Filter
      <AccordionItem value="category">
        <AccordionTrigger className="text-sm font-medium">
          Category
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-3 pt-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center gap-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={selectedCategory === category}
                  onCheckedChange={(checked) =>
                    onCategoryChange(checked ? category : null)
                  }
                />
                <Label
                  htmlFor={`category-${category}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
      {/* Level Filter */}
      <AccordionItem value="level">
        <AccordionTrigger className="text-sm font-medium">
          Level
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-3 pt-2">
            {levels.map((level) => (
              <div key={level.value} className="flex items-center gap-2">
                <Checkbox
                  id={`level-${level.value}`}
                  checked={selectedLevel === level.value}
                  onCheckedChange={(checked) =>
                    onLevelChange(checked ? level.value : null)
                  }
                />
                <Label
                  htmlFor={`level-${level.value}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {level.label}
                </Label>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
      {/* Price Filter */}
      <AccordionItem value="price">
        <AccordionTrigger className="text-sm font-medium">
          Price
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-3 pt-2">
            {priceOptions.map((option) => (
              <div key={option.value} className="flex items-center gap-2">
                <Checkbox
                  id={`price-${option.value}`}
                  checked={selectedPrice === option.value}
                  onCheckedChange={(checked) =>
                    onPriceChange(checked ? option.value : null)
                  }
                />
                <Label
                  htmlFor={`price-${option.value}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default FilterContent;
