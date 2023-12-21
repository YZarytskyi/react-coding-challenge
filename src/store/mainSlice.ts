import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getTaskList } from '../api';
import { RootState } from './index';

import { TaskType } from '../types';

interface MainSliceState {
  taskList: TaskType[];
}

const initialState: MainSliceState = {
  taskList: [],
};

export const fetchTaskList = createAsyncThunk(
  'main/fetchTaskList',
  async (_, { rejectWithValue }) => {
    try {
      return await getTaskList();
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setTaskList(state, action: PayloadAction<TaskType[]>) {
      state.taskList = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTaskList.fulfilled, (state, action) => {
        state.taskList = action.payload;
      })
      .addCase(fetchTaskList.rejected, (_, action) => {
        console.error(action.payload);
      });
  },
});

export const selectTaskList = (state: RootState): TaskType[] => {
  return state.main.taskList;
};

export const { setTaskList } = mainSlice.actions;

export default mainSlice.reducer;
