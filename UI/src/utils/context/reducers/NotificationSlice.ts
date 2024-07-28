import { createSlice } from '@reduxjs/toolkit';

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    unreadCount: 0, // Ensure this is defined
  },
  reducers: {
    setUnreadCount(state, action) {
      state.unreadCount = action.payload;
    },
  },
});

export const { setUnreadCount } = notificationsSlice.actions;
export default notificationsSlice.reducer;
