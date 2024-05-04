import { configureStore } from "@reduxjs/toolkit";
import quoteSlice from "./slices/quoteSlice";

const appStore = configureStore({
    reducer: {
        quotesInfo: quoteSlice.reducer,
    },
});

export default appStore;
