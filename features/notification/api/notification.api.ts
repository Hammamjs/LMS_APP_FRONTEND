import { baseApi } from '@/shared/api/create-base.api';
import { Notification } from '../types/notification.types';

export const NotificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<{ data: Notification[] }, void>({
      query: () => ({
        url: '/notifications',
        credentials: 'include',
      }),
    }),
    markAsRead: builder.mutation<void, string>({
      query: (id) => ({
        url: '/notifications/update',
        method: 'PATCH',
        credentials: 'include',
        body: { id },
      }),
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          NotificationApi.util.updateQueryData(
            'getNotifications',
            undefined,
            (draft) => {
              const notification = draft.data.find((n) => n.id === id);
              if (notification) {
                notification.read = true;
              }
            },
          ),
        );

        try {
          await queryFulfilled;
        } catch (err) {
          patchResult.undo();
        }
      },
    }),

    deleteNotification: builder.mutation<void, string>({
      query: (id) => ({
        url: `/notifications/delete?id=${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          NotificationApi.util.updateQueryData(
            'getNotifications',
            undefined,
            (draft) => {
              const index = draft.data.findIndex((n) => n.id === id);
              if (index != -1) {
                draft.data.splice(index, 1);
              }
            },
          ),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useMarkAsReadMutation,
  useDeleteNotificationMutation,
} = NotificationApi;

export const { updateQueryData } = NotificationApi.util;
