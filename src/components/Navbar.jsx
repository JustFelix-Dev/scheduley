import { useSelector,useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../features/user/userSlice";
import { motion } from "framer-motion";
import { useRef ,useEffect} from "react";



const Navbar = () => {
    const {user} = useSelector((state,action)=> state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const profileRef = useRef();
    const [ renderOnce,setRenderOnce] = useState(false);

    useEffect(()=>{
        if(!renderOnce){
          setRenderOnce(true)
          if(renderOnce){
            setRenderOnce(false)
          }
        }
      },[])

      const navVariants = {
        hidden: {opacity:0},
        visible: {opacity:1, 
          transition:{
            duration:1,
          }}
    }
const profileHide = ()=>{
    profileRef.current.style.transform = "scale(0)";
}

const profileShow = ()=>{
    profileRef.current.style.transform = "scale(1)";
}
    return (  
          <>
          <div className="nav__wrapper">
            <motion.div initial={{opacity:0,y:-100}} animate={{opacity:1,y:0}} className="logo">
                <Link to='/'>
                <span><img src="/schedule.png" alt="icon" height={25} width={25} /></span>
                </Link>
            </motion.div>
            <div onClick={profileShow} className="profilemenu"><img src="/profilemenu.png" alt="profile" height={30} width={30} /></div>
            <motion.div variants={ renderOnce ? navVariants : {}}  initial="hidden" animate="visible" className="user__details" ref={profileRef} >
                    <div onClick={profileHide} className="profile__cancel">
                        <img src="/cancelmenu.png" alt="close" height={17} width={17} />
                  </div>
                <img src={'/user.png'} alt={'userIcon'} width={30} height={30} style={{borderRadius:"50%",objectFit:"cover"}} />
                <h4>{user.username ?? user.name} </h4> <span>|</span> <h5> {user.email}</h5>
                <button className="homebutton" onClick={()=>{ dispatch(setLogout()); navigate('/')}}>Logout</button>
            </motion.div>
          </div>
          </>
    );
}
 
export default Navbar;