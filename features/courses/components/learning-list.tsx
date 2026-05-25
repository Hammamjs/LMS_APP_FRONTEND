import { LearningInfo } from './learning-info';

type LearningList = {
  learnItems: string[];
  onRemoveItem: (index: number) => void;
};

export const LearningList = ({ learnItems, onRemoveItem }: LearningList) => {
  return learnItems.map((item, index) => (
    <LearningInfo
      key={index}
      item={item}
      index={index}
      onRemoveItem={onRemoveItem}
    />
  ));
};
