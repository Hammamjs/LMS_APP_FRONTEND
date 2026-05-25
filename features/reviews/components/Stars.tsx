import { Star } from 'lucide-react';

export function Stars({
  value,
  onChange,
  interactive = false,
}: {
  value: number;
  onChange?: (rating: number) => void;
  interactive?: boolean;
}) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const active = i < value;

        return (
          <button
            key={i}
            type="button"
            disabled={!interactive}
            onClick={() => onChange?.(i + 1)}
            className={interactive ? 'transition hover:scale-110' : ''}
          >
            <Star
              className={
                'h-5 w-5 ' +
                (active
                  ? 'fill-yellow-500 text-yellow-500'
                  : 'text-muted-foreground/30')
              }
            />
          </button>
        );
      })}
    </div>
  );
}
