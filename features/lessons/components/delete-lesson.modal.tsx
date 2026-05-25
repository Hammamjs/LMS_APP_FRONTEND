'use client';

import { Button, Card, CardContent, CardHeader, CardTitle } from '@/shared/ui';
import { useCloseModal } from '@/features/settings/hooks/use.close-modal';

type DeleteLessonModalProps = {
  hideModalHandler: () => void;
  handleAction: () => void;
  isLoading: boolean;
};

export const DeleteLessonModal = ({
  handleAction,
  hideModalHandler,
  isLoading,
}: DeleteLessonModalProps) => {
  useCloseModal(hideModalHandler);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <Card className="w-full max-w-sm border-destructive pointer-events-auto transform transition-all animate-in fade-in zoom-in-95 duration-150">
        <CardHeader>
          <CardTitle className="text-destructive">
            Are you absolute sure?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            This action is irreversible. Are you sure you want to permanently
            delete this lesson ?
          </p>
          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="ghost"
              onClick={hideModalHandler}
              disabled={isLoading}
            >
              Decline
            </Button>
            <Button
              variant="destructive"
              onClick={handleAction}
              disabled={isLoading}
            >
              {isLoading ? (
                <p className="rounded-full w-3 h-3 border-2 border-gray-500 border-r-transparent animate-spin"></p>
              ) : (
                <>Accept & Delete</>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
