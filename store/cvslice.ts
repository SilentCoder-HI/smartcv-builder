import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { CVData } from "@/types/cv-types"

const initialState: CVData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    address: "",
    jobTitle: "",
    summary: "",
  },
  education: [],
  experience: [],
  skills: [],
  certifications: [],
  languages: [],
  hobbies: [],
}

const cvSlice = createSlice({
  name: "cv",
  initialState,
  reducers: {
    updateCV: (state, action: PayloadAction<CVData>) => {
      return { ...state, ...action.payload }
    },
    updateField: <K extends keyof CVData>(state: CVData, action: PayloadAction<{ field: K; value: CVData[K] }>) => {
      state[action.payload.field] = action.payload.value
    },
    resetCV: () => initialState,
  },
})

export const { updateCV, updateField, resetCV } = cvSlice.actions
export default cvSlice.reducer
