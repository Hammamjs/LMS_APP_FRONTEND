import React from 'react';
import { Requirement } from './requirement';

type RequirementsListProp = {
  requirements: string[];
  onRemoveItem: (index: number) => void;
};

export const RequirementsList = ({
  requirements,
  onRemoveItem,
}: RequirementsListProp) => {
  return requirements.map((item, index) => (
    <Requirement
      key={index}
      index={index}
      item={item}
      onRemoveItem={onRemoveItem}
    />
  ));
};
