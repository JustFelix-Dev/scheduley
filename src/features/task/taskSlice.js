import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: [],
    task: {}
}
const taskSlice = createSlice({
     name: 'task',
     initialState,
     reducers: {
        setTasks:( state,action )=>{
                state.tasks = [...action.payload]
        },
        setTask:( state,action )=>{
                state.task = action.payload
        }
     }
})

export default taskSlice.reducer
export const { setTasks, setTask } = taskSlice.actions