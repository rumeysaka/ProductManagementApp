import { createSlice } from "@reduxjs/toolkit"
export const categories = createSlice({
  name: "categories",
  initialState: { value: [] },
  reducers: {
    setCategories: (state, action) => {
      return {
        state: action.payload,
      }
    },
  },
})
export const { setCategories } = categories.actions
export const getCategories = (state) => state.categories.value
export default categories.reducer
