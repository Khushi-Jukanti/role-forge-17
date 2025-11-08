import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Child {
  id: string;
  name: string;
  age: number;
  parentId: string;
  createdAt: string;
}

interface ChildrenState {
  profiles: Child[];
  selectedChildId: string | null;
}

const initialState: ChildrenState = {
  profiles: [],
  selectedChildId: null,
};

const childrenSlice = createSlice({
  name: 'children',
  initialState,
  reducers: {
    addChild: (state, action: PayloadAction<Child>) => {
      state.profiles.push(action.payload);
    },
    setChildren: (state, action: PayloadAction<Child[]>) => {
      state.profiles = action.payload;
    },
    selectChild: (state, action: PayloadAction<string>) => {
      state.selectedChildId = action.payload;
    },
    updateChild: (state, action: PayloadAction<Child>) => {
      const index = state.profiles.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.profiles[index] = action.payload;
      }
    },
    deleteChild: (state, action: PayloadAction<string>) => {
      state.profiles = state.profiles.filter(c => c.id !== action.payload);
    },
  },
});

export const { addChild, setChildren, selectChild, updateChild, deleteChild } = childrenSlice.actions;
export default childrenSlice.reducer;
