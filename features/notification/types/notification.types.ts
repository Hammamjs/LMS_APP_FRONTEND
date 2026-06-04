import { Meta } from '@/shared/types';

export type Notification = {
  id: string;
  text: string;
  title: string;
  read: boolean;
  createdAt: Date;
};

export type NotificationResponse = {
  data: Notification[];
  meta: Meta;
};
