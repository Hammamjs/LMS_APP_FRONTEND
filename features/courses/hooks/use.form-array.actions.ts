import {
  FieldValues,
  Path,
  PathValue,
  UseFormGetValues,
  UseFormSetValue,
} from 'react-hook-form';
import { ArrayKeys } from '../schema/create.course.schema';

type Props<T extends FieldValues> = {
  getValues: UseFormGetValues<T>;
  setValue: UseFormSetValue<T>;
};

export const useFormArrayActions = <T extends FieldValues>({
  getValues,
  setValue,
}: Props<T>) => {
  const onAddItem =
    <K extends ArrayKeys<T>>(key: K) =>
    (value: T[K][number], clear: () => void) => {
      const current = getValues(key as unknown as Path<T>) as T[K];

      if (typeof value == 'string' && value.trim() == '') return;

      setValue(key as unknown as Path<T>, [...current, value] as T[K], {
        shouldDirty: true,
        shouldValidate: true,
      });

      clear();
    };

  const onRemoveItem =
    <K extends ArrayKeys<T>>(key: K) =>
    (idx: number) => {
      const current = getValues(key as unknown as Path<T>);

      const filteredValue = (current as unknown[]).filter(
        (_, index) => index !== idx,
      );

      setValue(key as unknown as Path<T>, [...filteredValue] as T[K], {
        shouldDirty: true,
        shouldValidate: true,
      });
    };

  return {
    onAddItem,
    onRemoveItem,
  };
};
