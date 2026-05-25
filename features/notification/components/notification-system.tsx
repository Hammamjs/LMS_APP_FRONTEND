'use client';

import { Bell, Check, Trash2 } from 'lucide-react';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../../shared/ui';
import { useEffect, useState } from 'react';
import { cn } from '../../../shared/lib';
import {
  useDeleteNotificationMutation,
  useGetNotificationsQuery,
  useMarkAsReadMutation,
} from '../api/notification.api';
import { useSelector } from 'react-redux';
import {
  selectCurrentToken,
  selectCurrentUser,
} from '@/features/auth/store/sign-in.store';

export const NotificationSystem = () => {
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);
  const { data: notification, isLoading } = useGetNotificationsQuery(
    undefined,
    {
      skip: !token || !user?.id,
    },
  );

  useEffect(() => {
    console.log(notification);
  }, [isLoading]);

  const [markAsRead] = useMarkAsReadMutation();
  const [deleteNotification] = useDeleteNotificationMutation();

  if (isLoading) return <>Loading ...</>;

  if (!notification) return;

  const unreadCount = notification.data.filter((n) => !n.read).length;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />

            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-80">
          <div className="flex items-center justify-between p-3">
            <h4 className="font-semibold">Notifications</h4>

            {unreadCount > 0 && (
              <span className="text-xs text-muted-foreground">{4} unread</span>
            )}
          </div>

          <DropdownMenuSeparator />

          {notification?.data.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No notifications
            </div>
          ) : (
            notification.data.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  'space-y-3 border-b p-3 last:border-none',
                  !notification.read && 'bg-muted/40',
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{notification.title}</p>

                    <p className="text-xs text-muted-foreground">
                      {notification.text}
                    </p>
                  </div>

                  {!notification.read && (
                    <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {!notification.read && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 text-xs"
                      onClick={() => markAsRead(notification.id)}
                    >
                      <Check className="mr-1 h-3 w-3" />
                      Read
                    </Button>
                  )}

                  <Button
                    size="sm"
                    variant="destructive"
                    className="h-7 text-xs"
                    onClick={() => deleteNotification(notification.id)}
                  >
                    <Trash2 className="mr-1 h-3 w-3" />
                    Delete
                  </Button>
                </div>
              </div>
            ))
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
