import { useEffect } from 'react';
import { createNotificationSocket } from '../lib/socket';
import { useDispatch } from 'react-redux';
import { NotificationApi } from '../api/notification.api';
import { appDispatch } from '@/shared/store/store';

export const NotificationListener = ({ token }: { token: string }) => {
  const dispatch = useDispatch<appDispatch>();

  useEffect(() => {
    if (!token) return;

    const socket = createNotificationSocket(token);
    socket.on('connect', () => {
      console.log('Connected ', socket.id);
    });

    socket.on('notification:new', (notification) => {
      dispatch(
        NotificationApi.util.updateQueryData(
          'getNotifications',
          undefined,
          (draft) => {
            if (draft?.data) draft.data.unshift(notification);
          },
        ),
      );
    });

    socket.on('connect_error', (err) => {
      console.log('Notification Error ', err);
    });

    return () => {
      socket.off('notification:new');
      socket.disconnect();
    };
  }, [token, dispatch]);

  return null;
};
