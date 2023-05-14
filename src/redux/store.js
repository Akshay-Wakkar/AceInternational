import { configureStore } from "@reduxjs/toolkit";

import productreducer from "./productSlice";

export default configureStore({
  reducer: { products: productreducer }
});
