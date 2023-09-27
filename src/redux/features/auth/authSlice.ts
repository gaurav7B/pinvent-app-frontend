import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';

interface CounterState {
  isLoggedIn: boolean;
  name: string;
  user: {
    name: string;
    email: string;
    phone: string;
    bio: string;
    photo: string;
  };
}

const name = localStorage.getItem("name");

const initialState: CounterState = {
  isLoggedIn: false,
  name: name !== null ? name : "",
  user: {
    name: "",
    email: "",
    phone: "",
    bio: "",
    photo: "",
  },
};

const counterSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SET_LOGIN(state, action){
      state.isLoggedIn = action.payload
    },
    SET_NAME(state, action){
      localStorage.setItem("name", JSON.stringify(action.payload))
      state.name = action.payload
    },
    SET_USER(state, action){
      const profile = action.payload;
      state.user.name = profile.name;
      state.user.email = profile.email;
      state.user.phone = profile.phone;
      state.user.bio = profile.bio;
      state.user.photo = profile.photo;
    },
  },
});

export const {SET_LOGIN , SET_NAME , SET_USER} = counterSlice.actions;

export const selectIsLoggedIn = (state: { auth: { isLoggedIn: any; }; }) => state.auth.isLoggedIn
export const selectName =(state: { auth: { name: any; }; }) => state.auth.name
export const selectUser =(state: { auth: { user: any; }; }) => state.auth.user;


export default counterSlice.reducer;
