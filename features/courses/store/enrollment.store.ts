import { RootState } from '@/shared/store/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface EnrollmentState {
  isEnrolled: boolean;
}

const initialState: EnrollmentState = {
  isEnrolled: false,
};

export const EnrollmentStore = createSlice({
  name: 'enrollment',
  initialState,
  reducers: {
    setEnrollment: (state, action: PayloadAction<{ isEnrolled: boolean }>) => {
      state.isEnrolled = action.payload.isEnrolled;
    },
    resetEnrollment: (state) => {
      state.isEnrolled = false;
    },
  },
});

export const { setEnrollment } = EnrollmentStore.actions;

export default EnrollmentStore.reducer;

export const selectIsEnrolled = (state: RootState) =>
  state.enrollment.isEnrolled;
