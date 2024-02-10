import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/crud/crudSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

export default store;
