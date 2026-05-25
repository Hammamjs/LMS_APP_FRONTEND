import { createSlice } from '@reduxjs/toolkit';
import { AuthState } from '../types/types';
import { RootState } from '@/shared/store/store';
import { getObjectFromSessionStorage } from '@/shared/lib/session-storage.helper';

const initialState: AuthState = {
  user: null,
  accessToken:
    typeof window !== 'undefined'
      ? getObjectFromSessionStorage('accessToken')
      : null,
};

const SigninSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;

      state.user = user;
      state.accessToken = accessToken;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { setCredentials, logout } = SigninSlice.actions;
export default SigninSlice.reducer;
export const selectCurrentUser = (state: RootState) => state.auth.user;

export const selectCurrentToken = (state: RootState) => state.auth.accessToken;
