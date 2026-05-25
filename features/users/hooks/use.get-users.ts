import { useGetUsersQuery } from '../api/user.api';
import { UserParams } from '../types/types';

export const useGetUsers = ({ isVerified, role }: UserParams) =>
  useGetUsersQuery({ role, isVerified });
