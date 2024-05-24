import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserList: (state, { payload }) => {
      state.list = payload;
    },
  },
});
export const { setUserList } = userSlice.actions;

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      let { data } = await axios({
        method: "GET",
        url: "http://localhost:3000/find-matches",
        headers: { Authorization: localStorage.getItem("access_token") },
      });
      dispatch(setUserList(data));
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
};
// async function fetchUsers() {
//   try {
//     let { data } = await axios({
//       method: "GET",
//       url: "http://localhost:3000/find-matches",
//       headers: { Authorization: localStorage.getItem("access_token") },
//     });
//     setMatchingUsers(data);
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
// }

// Action creators are generated for each case reducer function

export default userSlice.reducer;
