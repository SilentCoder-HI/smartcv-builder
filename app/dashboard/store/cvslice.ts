import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { sampleCVs, type CV } from "../data/data"

const initialState: CV[] = sampleCVs // Use full array as state

const cvSlice = createSlice({
  name: "cv",
  initialState,
  reducers: {
    // Replace all CVs
    setCVs: (state, action: PayloadAction<CV[]>) => {
      return action.payload
    },

    // Add a new CV
    addCV: (state, action: PayloadAction<CV>) => {
      state.push(action.payload)
    },

    // Update a CV by ID
    updateCV: (state, action: PayloadAction<{ id: string | number; data: Partial<CV> }>) => {
      const index = state.findIndex((cv) => cv.id === action.payload.id)
      if (index !== -1) {
        state[index] = { ...state[index], ...action.payload.data }
      }
    },

    // Delete a CV by ID
    deleteCV: (state, action: PayloadAction<string | number>) => {
      return state.filter((cv) => cv.id !== action.payload)
    },

    // Reset all to original sample data
    resetCVs: () => sampleCVs,
  },
})

export const { setCVs, addCV, updateCV, deleteCV, resetCVs } = cvSlice.actions
export default cvSlice.reducer
