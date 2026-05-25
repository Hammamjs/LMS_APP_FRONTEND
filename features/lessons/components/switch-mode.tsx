import { useLessonContext } from '../hooks/use.lesson.context';
import { LinkMode } from './link-mode';
import { UploadMode } from './upload-mode';

export const SwitchMode = () => {
  const { mode } = useLessonContext();
  if (mode == 'link') return <LinkMode />;
  else return <UploadMode />;
};
