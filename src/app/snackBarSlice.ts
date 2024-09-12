import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SnackBarState {
  show: boolean;
  type: "success" | "error" | "info" | "warning" | null;
  message: string | null;
}

const initialState: SnackBarState = {
  show: false,
  type: null,
  message: null,
};

export const snackBarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    showSnackbar: (
      state,
      action: PayloadAction<Omit<SnackBarState, "show">>
    ) => {
      state.show = true;
      state.type = action.payload.type;
      state.message = action.payload.message;
    },
    closeSnackbar: (state) => {
      state.show = false;
      state.type = null;
      state.message = null;
    },
  },
});

export const { showSnackbar, closeSnackbar } = snackBarSlice.actions;

export default snackBarSlice.reducer;
