import { createSlice, PayloadAction } from "@reduxjs/toolkit"
export const products = createSlice({
  name: "products",
  initialState: { value: [] },
  reducers: {
    setProducts: (state, action) => {
      return {
        state: action.payload,
      }
    },
    // getProducts: (state, action) => {
    //   return { ...state }
    // },
  },
})
export const { setProducts } = products.actions
export const getProducts = (state) => state.products.value
export default products.reducer
