import { configureStore } from "@reduxjs/toolkit";
import {rootReducer} from "./root-reducer";
export const store = configureStore({
  reducer: rootReducer,
});
// Typing the RootState and AppDispatch for use throughout the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;












