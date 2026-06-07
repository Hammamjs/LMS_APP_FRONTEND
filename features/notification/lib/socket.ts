import { io, Socket } from 'socket.io-client';

export const createNotificationSocket = (token: string): Socket => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  return io(`${baseUrl}/notification`, {
    auth: {
      token,
    },
    transports: ['websocket'],
    autoConnect: true,
  });
};
