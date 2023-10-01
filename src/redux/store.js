import { configureStore } from "@reduxjs/toolkit"
import productReducer from "./features/ProductSlice"
import categoryReducer from "./features/CategorySlice"

export const store = configureStore({
  reducer: {
    products: productReducer,
    categories: categoryReducer,
  },
})
export default store
