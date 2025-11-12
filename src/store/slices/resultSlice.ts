import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AssessmentResult {
  id: string;
  childId: string;
  assessmentId: string;
  assessmentTitle: string;
  completedAt: string;
  responses: Record<string, any>;
  negativePercentage: number;
  recommendation: string;
  needsConsultation: boolean;
}

interface ResultsState {
  results: AssessmentResult[];
}

const initialState: ResultsState = {
  results: [],
};

const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    addResult: (state, action: PayloadAction<AssessmentResult>) => {
      state.results.push(action.payload);
    },
    setResults: (state, action: PayloadAction<AssessmentResult[]>) => {
      state.results = action.payload;
    },
  },
});

export const { addResult, setResults } = resultsSlice.actions;
export default resultsSlice.reducer;