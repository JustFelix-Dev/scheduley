import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../services/api";
import { useParams } from "react-router-dom";
import { setTask } from "../features/task/taskSlice";
import TaskForm from "../components/TaskForm";

const Task = () => {

    const { id } = useParams();
    const [ currentTask , setCurrentTask ] = useState(null)
    const dispatch = useDispatch()

useEffect(()=>{
        async function fetchTask(){
            await axios.get(`/task/${id}`).then((res)=>{
                setCurrentTask(res.data.task)
                dispatch(setTask(res.data.task))
            }).catch((err)=>{
                console.log(err.message)
            });
        }
        fetchTask();
},[id, dispatch])


     if(!currentTask){
        return 
     }

    return (  
            <>
              <div className="task">
                {
                    currentTask && (
                        <TaskForm task={currentTask}/>
                    )
                }
              </div>
            </>
    );
}
 
export default Task;