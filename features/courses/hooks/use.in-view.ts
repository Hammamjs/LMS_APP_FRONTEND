import { useEffect, useRef, useState } from 'react';

export const useInView = (options?: IntersectionObserverInit) => {
  const [inView, setInView] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, options);

    observer.observe(element);

    return () => observer.disconnect();
  }, [options]);

  return { inView, ref };
};
