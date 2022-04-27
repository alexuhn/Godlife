import { configureStore } from "@reduxjs/toolkit";

import bingoReducer from "./bingo";
import dialogReducer from "./dialog";
import snackbarReducer from "./snackbar";
import todayBingoReducer from "./todayBingo";
import userReducer from "./user";

export const store = configureStore({
  reducer: {
    user: userReducer,
    snackbar: snackbarReducer,
    dialog: dialogReducer,
    bingo: bingoReducer,
    todayBingo: todayBingoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
