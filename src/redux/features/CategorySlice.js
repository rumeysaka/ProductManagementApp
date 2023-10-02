import { createSlice } from "@reduxjs/toolkit"
export const categories = createSlice({
  name: "categories",
  initialState: {
    state: ["electronics", "jewelery", "men's clothing", "women's clothing"],
  },
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
