import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user.slice.ts"; 

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,

};


const mypersistReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: mypersistReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
