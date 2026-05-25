import { Progress } from '@/shared/ui';
import { PlayCircle } from 'lucide-react';

type Props = {
  progressPercentage: number;
};

export const RightCard = ({ progressPercentage }: Props) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-2xl bg-pink-500/20 p-3">
          <PlayCircle className="h-6 w-6 text-pink-400" />
        </div>

        <div>
          <h3 className="font-semibold">Course Progress</h3>

          <p className="text-sm text-zinc-400">
            Keep going, you're doing great.
          </p>
        </div>
      </div>

      <Progress value={progressPercentage} className="mb-3 h-3 bg-white/10" />

      <div className="flex items-center justify-between text-sm">
        <span className="text-zinc-400">Completed</span>

        <span className="font-semibold text-pink-400">
          {progressPercentage}%
        </span>
      </div>
    </div>
  );
};
