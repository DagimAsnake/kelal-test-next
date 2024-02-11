import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
import axiosInstance from '../../libs/axiosInstance';

const baseUrl = '/api/topics';

// Thunk for creating a new post
export const createPost = createAsyncThunk(
  'posts/createPost',
  async (postData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(baseUrl, postData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.topics);
    }
  }
);

// Thunk for getting all posts
export const getAllPosts = createAsyncThunk(
  'posts/getAllPosts',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(baseUrl);
      return response.data.topics;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Thunk for getting a post by ID
export const getPostById = createAsyncThunk(
  'posts/getPostById',
  async (postId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`${baseUrl}/${postId}`);
      return response.data.topic;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Thunk for updating a post
export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async ({ postId, postData }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`${baseUrl}/${postId}`, postData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Thunk for deleting a post
export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (postId, thunkAPI) => {
    try {
      await axiosInstance.delete(`${baseUrl}/${postId}`);
      return postId; // Return the deleted postId
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Define the initial state
const initialState = {
  posts: [],
  loading: false,
  error: null,
};

// Define the slice
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        state.loading = false;
        // Assuming the response is a single post
        state.posts = [action.payload];
      })
      .addCase(getPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        // Update the post in the state
        state.posts = state.posts.map((post) =>
          post.id === action.payload.id ? action.payload : post
        );
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the deleted post from the state
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default postsSlice.reducer;

// Selectors
export const selectAllPosts = (state) => state.posts.posts;
export const selectPostById = (state) => state.posts.posts[0];
export const selectLoading = (state) => state.posts.loading;
export const selectError = (state) => state.posts.error;
