import {Formik} from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Dropzone  from "react-dropzone";
import axios from '../services/api';
import { setLogin } from '../features/user/userSlice';
import {TypeAnimation} from 'react-type-animation'
import { toast } from 'react-toastify';
import { animate, motion } from 'framer-motion';

const initialSignUpValues = {
    name:"",
    username:"",
    email:"",
    password:"",
    picture: "",
}

const initialLogInValues = {
    email: "",
    password: ""
}

const signUpSchema = Yup.object().shape({
    name: Yup.string().required('This is required'),
    username: Yup.string().required('This is required'),
    email: Yup.string().email('Not a Valid Email!').required('This is required'),
    password: Yup.string().required('This is required')
})

const logInSchema = Yup.object().shape({
    email:Yup.string().email("Invalid Email").required("This is required"),
    password: Yup.string().required('This is required')
})

const Login = () => {
              
        const [ page, setPage ] = useState('signup');
        const isLogIn = page === 'login';
        const isSignUp = page === 'signup';
        const [ loading,setLoading] = useState(false);
        const dispatch = useDispatch();
        const navigate = useNavigate();

        const handleLogin =(values,onSubmitProps)=>{
          setLoading(true)
             axios.post('/auth/login', values)
             .then((res)=>{
                onSubmitProps.resetForm()
                toast.success(res.data.message)
                dispatch(setLogin(res.data.user))
                navigate('/home')
             }).catch(err=>{
              console.log(err)
               toast.error(err.response.data)
             })
             setLoading(false)
        }
        
        const handleSignUp=(values,onSubmitProps)=>{
          setLoading(true)
            let formData = new FormData()
            for(const property of Object.keys(values)){
                formData.append(property, values[property])
            }
            axios.post('/auth/signup',formData,{
              headers:{'Content-Type':'multipart/form-data'}
            })
            .then((res)=>{
                onSubmitProps.resetForm()
                toast.success(res.data)
                setPage('login')
            }).catch(err=>{
              toast.error(err.message)
              console.log(err)
            })
            setLoading(false)
        }
        
        const handleForm = (values,onSubmitProps)=>{
          if(isLogIn) handleLogin(values,onSubmitProps)
          if(isSignUp) handleSignUp(values,onSubmitProps)
        }
        

    return ( 
      <Formik
      initialValues={isLogIn ? initialLogInValues : initialSignUpValues}
      validationSchema={ isLogIn ? logInSchema : signUpSchema}
      onSubmit={handleForm} >
        {(
            {handleSubmit,
            handleBlur,
            touched,
            setFieldValue,
            resetForm,
            values,
            handleChange,
            errors}
        )=>(
            <div className="form__wrapper">
              <div className='hero'>
              <motion.div initial={{opacity:0,y:-500}} animate={{opacity:1,y:0}} transition={{type:'spring',stiffness:110,duration:1,delay:1}} className='myImage'><img src="/todo.png" alt="todoIcon" height={100} width={100} /></motion.div>
            <motion.h1  initial={{opacity:0,x:-400}} animate={{opacity:1,x:0}} transition={{duration:1}} >Welcome to Scheduley</motion.h1>
            <motion.span initial={{opacity:0,x:-400}} animate={{opacity:1,x:0}} transition={{duration:1}}>
            <TypeAnimation sequence={['Tired of feeling overwhelmed by your daily tasks and responsibilities? Look no further! Our To-Do App is your ultimate productivity companion, designed to simplify your life and help you achieve more than ever before.',1000,'Supercharge Your Productivity with Our Cutting-Edge To-Do App!😊',2000]} wrapper="span" speed={50} repeat={Infinity}/>
            </motion.span>
              </div>
              <motion.form initial={{opacity:0,y:50,x:50}} animate={{opacity:1,y:0,x:0}} transition={{duration:2}} onSubmit={handleSubmit}>
           <div className="user__inputs">
             <div className='anchor'></div>
        {
          isSignUp && (
              <>
              <label htmlFor='name'>Full Name:</label><br/>
              <input type='text' name='name'
                value={values.name} 
                placeholder='John Doe'
                onChange={handleChange}
                onBlur={handleBlur} 
                error={ touched.name && errors.name ? errors.name : '' } 
                /> 
                {touched.name && errors.name && (
                      <div className="error-message">{errors.name}</div>
                      )}
                       <label htmlFor='username'>UserName:</label><br/>
              <input type='text' name='username'
                value={values.username} 
                placeholder='e.g Noblefella'
                onChange={handleChange}
                onBlur={handleBlur} 
                error={ touched.username && errors.username ? errors.username : '' } 
                /> 
                {touched.username && errors.username && (
                      <div className="error-message">{errors.username}</div>
                      )}

                 </>
                     )
                      }
                        <label htmlFor='email'>Email:</label><br/>
                        <input type='text' name='email' 
                        value={values.email} 
                        onChange={handleChange} 
                        placeholder='e.g, someone@gmail.com'
                        onBlur={handleBlur}
                        error={ touched.email && errors.email ? errors.email : '' } 
                        /> 
                        {touched.email && errors.email && (
                          <div className="error-message">{errors.email}</div>
                          )}

                      <label htmlFor='password'>Password:</label><br/>
                        <input type='text' name='password'
                          value={values.password} 
                          onChange={handleChange}
                          onBlur={handleBlur}
                            error={ touched.password && errors.password? errors.password:'' } 
                          />
                            {touched.password && errors.password && (
                          <div className="error-message">{errors.password}</div>
                          )}
                        <button className='signup-button'
                         type='submit'>
                    {  loading  ? <div class="neomorph-spinner">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                              </div>
                              : isLogIn ? 'Login' : 'SignUp'}</button> <br />
                        <span className='buttonText' onClick={()=>{setPage(isLogIn ? 'signup' : 'login');resetForm()}}>
                            {
                              isLogIn ? (<span>Not a User, go to SignUp</span>) :(<span>Already a user, go to Login</span>)
                            }
                        </span>
                      </div>
                </motion.form>
              </div>
            
                   )
                   }
             </Formik>
     );
}
 
export default Login;