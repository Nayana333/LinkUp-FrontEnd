import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface AdminAuthState {
    admin: userData | null;
    token: string | null;
    
  
  }


interface userData{
    id:number,
    userName:string,
    email:string,
    token:string
}


const AdminInitialState: AdminAuthState = {
    admin: null,
    token: null,
  
  };

const adminAuthSlice=createSlice({
    name:'adminAuth',
    initialState:AdminInitialState,
    reducers:{
        LoginAdmin:(state,action:PayloadAction<{admin:userData}>)=>{
            state.admin=action.payload.admin;
            state.token=action.payload.admin.token
        },
        AdminLogout:(state)=>{
            state.admin=null,
            state.token=null
        }
    }
})

export const {LoginAdmin , AdminLogout } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;