import { useContext } from 'react';
import { LessonContext } from '../context/lesson.context';

export const useLessonContext = () => {
  const cx = useContext(LessonContext);

  if (!cx) throw new Error('Must be used inside provider');

  return cx;
};
