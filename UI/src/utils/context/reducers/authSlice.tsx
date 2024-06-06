// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface userData {
//   user: any;
// }

// interface AuthState {
//   user: userData | null;
// }

// const initialAuthState: AuthState = {
//   user: null,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: initialAuthState,
//   reducers: {
//     logged: (state, action: PayloadAction<{ user: userData }>) => {
//       console.log(action.payload.user);
//       state.user = action.payload.user.user;
//     },
//   },
// });

// export const { logged } = authSlice.actions;  // Fix the export for action
// export default authSlice.reducer;  // Fix the export for reducer



import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface userData{
  user:any,
  token:any
}

interface AuthState{
  user:userData |null,
  token:string | null
}

const userInitialState:AuthState={
  user:null,
  token:null
}


const authSlice=createSlice({
  name:'auth',
  initialState:userInitialState,
  reducers:{
    logged:(state,action:PayloadAction<{user:userData}>)=>{
      console.log(action.payload.user);
      state.user=action.payload.user.user;
      state.token=action.payload.user.token
      
    }

  }
})


export const { logged} = authSlice.actions;
export default authSlice.reducer;