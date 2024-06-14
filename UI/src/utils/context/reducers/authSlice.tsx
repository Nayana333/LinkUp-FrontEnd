



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
      
    },
    logout: (state:any) => {
      state.user = null;
      state.token = null;
      state.userPost=[]
    },

    updateUser:(state,action:PayloadAction<{user:userData}>)=>{      
      console.log(action.payload.user);
      state.user=action.payload.user.user     
    },
  }
})



export const { logged,logout,updateUser} = authSlice.actions;
export default authSlice.reducer;