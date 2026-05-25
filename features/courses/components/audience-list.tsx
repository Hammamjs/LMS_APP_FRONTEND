import React from 'react';
import { AudienceInfo } from './audience-info';

type AudienceListProps = {
  targetAudience: string[];
  onRemoveItem: (index: number) => void;
};

export const AudienceList = ({
  onRemoveItem,
  targetAudience,
}: AudienceListProps) => {
  return targetAudience.map((item, index) => (
    <AudienceInfo
      item={item}
      index={index}
      onRemoveItem={onRemoveItem}
      key={index}
    />
  ));
};
