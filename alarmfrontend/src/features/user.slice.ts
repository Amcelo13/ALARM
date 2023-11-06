import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserDetailsProps } from "../@Types/userDetails.type.ts";
interface InitialStateProps {
  isLoggedIn: boolean;
  isLoading: boolean;
  userData: UserDetailsProps | null;

}
const initialState: InitialStateProps = {
  isLoggedIn: false,
  userData: null,
  isLoading: false,

};
export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<UserDetailsProps>) => {
      state.isLoading = false;
      state.userData = action.payload;
      state.isLoggedIn = true;
    },
    setLogout: (state,action:PayloadAction<boolean>) => {
      state.isLoggedIn = false;
      state.userData = null;
      state.isLoading = false;

    },
    setLoading: (state) => {
      state.isLoading = !state.isLoading;
    },
  },
}); 
export const { setLogin, setLogout, setLoading } =
  userSlice.actions;
export default userSlice.reducer;
