import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Question {
  id: string;
  text: string;
  type: 'yes-no' | 'multiple-choice';
  options?: string[];
}

export interface Assessment {
  id: string;
  title: string;
  description: string;
  ageGroup: string;
  minAge: number;
  maxAge: number;
  questions: Question[];
}

interface AssessmentsState {
  available: Assessment[];
  currentAssessment: Assessment | null;
  responses: Record<string, any>;
}

const initialState: AssessmentsState = {
  available: [
    {
      id: 'assess-1',
      title: 'Early Childhood Development Screening',
      description: 'Comprehensive developmental milestone assessment for early childhood',
      ageGroup: '0-3 years',
      minAge: 0,
      maxAge: 3,
      questions: [
        { id: 'q1', text: 'Does your child respond to their name when called?', type: 'yes-no' },
        { id: 'q2', text: 'Can your child make eye contact during interactions?', type: 'yes-no' },
        { id: 'q3', text: 'Does your child show interest in playing with toys?', type: 'yes-no' },
        { id: 'q4', text: 'Can your child follow simple instructions?', type: 'yes-no' },
        { id: 'q5', text: 'Does your child use gestures like pointing or waving?', type: 'yes-no' },
      ],
    },
    {
      id: 'assess-2',
      title: 'Preschool Developmental Assessment',
      description: 'Evaluates cognitive, social, and motor skills development',
      ageGroup: '3-6 years',
      minAge: 3,
      maxAge: 6,
      questions: [
        { id: 'q1', text: 'Can your child speak in complete sentences?', type: 'yes-no' },
        { id: 'q2', text: 'Does your child play well with other children?', type: 'yes-no' },
        { id: 'q3', text: 'Can your child count to 10 or higher?', type: 'yes-no' },
        { id: 'q4', text: 'Does your child show interest in learning new things?', type: 'yes-no' },
        { id: 'q5', text: 'Can your child follow multi-step instructions?', type: 'yes-no' },
        { id: 'q6', text: 'Does your child demonstrate age-appropriate fine motor skills?', type: 'yes-no' },
      ],
    },
    {
      id: 'assess-3',
      title: 'School-Age Development Check',
      description: 'Comprehensive assessment for school readiness and academic skills',
      ageGroup: '6-12 years',
      minAge: 6,
      maxAge: 12,
      questions: [
        { id: 'q1', text: 'Can your child read age-appropriate books?', type: 'yes-no' },
        { id: 'q2', text: 'Does your child have friends at school?', type: 'yes-no' },
        { id: 'q3', text: 'Can your child complete homework independently?', type: 'yes-no' },
        { id: 'q4', text: 'Does your child show appropriate emotional regulation?', type: 'yes-no' },
        { id: 'q5', text: 'Can your child participate in group activities?', type: 'yes-no' },
        { id: 'q6', text: 'Does your child demonstrate problem-solving skills?', type: 'yes-no' },
      ],
    },
  ],
  currentAssessment: null,
  responses: {},
};

const assessmentsSlice = createSlice({
  name: 'assessments',
  initialState,
  reducers: {
    selectAssessment: (state, action: PayloadAction<string>) => {
      state.currentAssessment = state.available.find(a => a.id === action.payload) || null;
      state.responses = {};
    },
    setResponse: (state, action: PayloadAction<{ questionId: string; answer: any }>) => {
      state.responses[action.payload.questionId] = action.payload.answer;
    },
    clearResponses: (state) => {
      state.responses = {};
      state.currentAssessment = null;
    },
  },
});

export const { selectAssessment, setResponse, clearResponses } = assessmentsSlice.actions;
export default assessmentsSlice.reducer;