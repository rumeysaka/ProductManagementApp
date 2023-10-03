import { createSlice } from "@reduxjs/toolkit"
export const products = createSlice({
  name: "products",
  initialState: { value: [] },
  reducers: {
    setProducts: (state, action) => {
      return {
        state: action.payload,
      }
    },
  },
})
export const { setProducts } = products.actions
export const getProducts = (state) => state.products.value
export default products.reducer
