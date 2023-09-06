import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    user : null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        setLogin:(state,action)=>{
               state.user = action.payload
        },
        setLogout:(state)=>{
              state.user = null
        }
    }
})

export default userSlice.reducer
export const { setLogin,setLogout } = userSlice.actions