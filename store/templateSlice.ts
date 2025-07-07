import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TemplateState {
  selectedTemplate: string | null;
}

const initialState: TemplateState = {
  selectedTemplate: null,
};

const templateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {
    setTemplate: (state, action: PayloadAction<string>) => {
      state.selectedTemplate = action.payload;
    },
    resetTemplate: () => initialState,
  },
});


export const { setTemplate, resetTemplate } = templateSlice.actions;
export default templateSlice.reducer;
