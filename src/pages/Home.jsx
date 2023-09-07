import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { useEffect, useRef, useState } from "react";
import axios from "../services/api";
import { Link } from "react-router-dom";
import Task from "../components/Task";
import { setTasks } from "../features/task/taskSlice";
import { AnimatePresence,motion } from "framer-motion";


const Home = () => {
    const dispatch = useDispatch()
    const [ typeFilter,setTypeFilter ] = useState('')
    const [ dayFilter,setDayFilter ] = useState('')
    // const [ showFilter,setShowFilter] = useState(true);
    const showFilterRef = useRef()
    const types = ['General','Chores','Miscellaneous','Work','Ideas','Meetings','Shopping','Payments'];

    const days = [
        {label:"Today", value:'today'},
        {label:"Last Seven", value:'seven'},
        {label:"Last Thirty", value:'thirty'}
    ]
    
    useEffect(()=>{
    axios.get(`/task?type=${typeFilter}&day=${dayFilter}`).then((res)=>{
        dispatch(setTasks(res.data.tasks));
    })
    },[typeFilter,dayFilter])
    const { tasks } = useSelector(( state,action)=> state.task)

    const handleFilterType=(e)=>{
       setTypeFilter(e.target.value)
    }

    const showFilterDays = ()=>{
          showFilterRef.current.style.transform = "scale(1)";
        // setShowFilter(true)

    }

    const hideFilterDays=()=>{
        showFilterRef.current.style.transform = "scale(0)";
       

    }
    return ( 
           <>
    <Navbar/>
    <main>
        <div className="filter__wrapper">
        <div className="filterTypes">
            <form action="">
                <label className="filterSelect" htmlFor="filterSelect">Select Type:</label>
                <select name='filterSelect' id="filterSelect" value={typeFilter} onChange={handleFilterType}>
               { types.map((type,idx)=>(
                <option key={`${idx}-${type}`} value={type}>{type}</option>
               ))}
                </select>
            </form>
            <div className="clearFilter">
                <button onClick={()=>{setDayFilter('');setTypeFilter('')}}>Clear Filter</button>
            </div>
        </div>
        <div className="addTask">
            <Link to={'/task/create'}>
            <img src="/taskIcon.png" alt="task" height={40} width={40} />
            </Link>
        </div>
         <AnimatePresence>
        <motion.div exit={{opacity:0,scale:0}} initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}}  transition={{duration:0.4,type:'spring'}} ref={showFilterRef} className="filterDays">
            <div onClick={hideFilterDays} className="hamburger"><img src="/cancelmenu.png" alt="menu" height={15} width={15}/></div>
            {
                days.map((day,idx)=>{
                 return (<button key={`${idx}-${day.value}`} style={{backgroundColor: day.value === dayFilter ? 'active' : " "}} onClick={()=>setDayFilter(day.value)}>{day.label}</button>)
                })
            }
        </motion.div>
        </AnimatePresence>
        <div>
           <div onClick={showFilterDays} className="menu">
            <img src="/filter.png" alt="menu"  height={30} width={30}/>
           </div>
        </div>
        </div>
        {
            tasks && tasks.length < 1 && (
                <div className="emptyTask">No Task Assigned Yet!</div>
            )  
        }
    {
    tasks && tasks.length > 0 && (
    <motion.div  initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} className="task__container">
            {
            tasks.map((task)=>(
              <Link className="eachTask" key={task._id} to={`/task/${task._id}`}>
                   <Task task={task}/>
              </Link>  
            ))
            }
    </motion.div>
        
    )
    }
    
    </main>
           </>
     );
}
 
export default Home;