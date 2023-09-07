import { Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { TextField } from '@mui/material';
import axios from '../services/api';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { motion } from 'framer-motion';



const initialEditSchema = Yup.object().shape({
    name: Yup.string().required('This is required!'),
    date: Yup.string().required('This is required!'),
    type: Yup.string().required('This is required!'),
    time: Yup.string().required('This is required!'),
    status: Yup.string().required('This is required!')
})

const initialCreateSchema = Yup.object().shape({
    name: Yup.string().required('This is required!'),
    date: Yup.string().required('This is required!'),
    type: Yup.string().required('This is required!'),
    time: Yup.string().required('This is required!')
})


let initialValues = {
    name: '',
    type: '',
    date: '',
    time: ''
}

const TaskForm = ({ mode = 'edit', task }) => {

    const [ date,setDate ] = useState(null)
    const [ time,setTime ] = useState(null)
    const [status, setStatus] = useState(null);

    const navigate = useNavigate()
  const types = ['General','Chores','Miscellaneous','Work','Ideas','Meetings','Shopping','Payments']

    const handleFormSubmit=(values,onSubmitProps)=>{

        if(mode === 'edit'){
            axios.put(`/task/${task._id}`, values).then((res)=>{
                   navigate('/home');
            })
        }else{
            axios.post('task/create', values).then((res)=>{
                  navigate('/home');
            })
        }
    }

    const handleDelete=(e)=>{
       if(!confirm("Are you sure you want to delete this task ?")){
              e.preventDefault();
       }else{
          axios.delete(`/task/delete/${task._id}`).then(res=>{
               navigate('/home')
          }).catch(err=>{
            console.log(err)
          })
       }
    }



  return (
       <>
           <Navbar/>
           <Formik onSubmit={handleFormSubmit} 
           initialValues={ mode == 'create' ? initialValues : task}
           validationSchema={ mode == 'create' ? initialCreateSchema : initialEditSchema}>

             {({
                handleBlur,
                handleSubmit,
                handleChange,
                resetForm,
                values,
                setFieldValue,
                errors,
                touched,
             })=>(  
             <>
                <h3 className='taskText'>{task?.name}</h3>
                <div className="title">
                      <motion.form initial={{opacity:0}} animate={{opacity:1}}  onSubmit={handleSubmit}>
                       <div className='anchor'></div>
                    <h2>{mode === 'create' ? 'Create a Task' : 'Edit a Task'}</h2>
                        <label htmlFor="taskName">Task Name:</label> <br />
                          <input type="text" id='taskName' 
                          name='name' 
                          className='input'
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={ touched.name && errors.name ? errors.name : '' } 
                           /> <br />
                           {touched.name && errors.name && (
                            <div className="error-message">{errors.name}</div>
                            )}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date"
                  value={mode ==="edit" ? dayjs(values.date || null) : values.date}
                  minDate={mode === "edit" ? null : dayjs()}
                  onChange={(newValue) => {
                    setFieldValue('date', newValue.format('YYYY-MM-DD'));
                    setDate(newValue.format('YYYY-MM-DD'));
                  }}
                  onBlur={handleBlur}
                  name="date"
                  className='custom-datePicker'
                  renderInput={(params) => (
                    <TextField {...params} helperText="Select Date" className='custom-date' />
                  )}
                  error={ touched.date && errors.date ? errors.date : '' } 
                />
                {touched.date && errors.date && (
                    <div className="error-message">{errors.date}</div>
                )}
              </LocalizationProvider> <br />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Time"
                  value={mode ==="edit" ? dayjs(`${values.date.split("T")[0]}T${values.time}` || null) : values.time }
                  onChange={(newValue) => {
                    setFieldValue("time", newValue.format('HH:mm'));
                     setTime(newValue.format('HH:mm'));
                  }}
                  name="time"
                  className='custom-datePicker'

                  onBlur={handleBlur}
                  error={ touched.time && errors.time ? errors.time : '' } 
                  renderInput={(params) => (
                    <TextField {...params} helperText="Set Time" />
                  )}
                />
                {touched.time && errors.time && (
                    <div className="error-message">{errors.time}</div>
                )}
              </LocalizationProvider> <br />
              <label htmlFor="type">Select Type :</label> <br />
              <select name="type" id="type" 
               value={values.type}
               onChange={handleChange}
               onBlur={handleBlur}
               error={ touched.type && errors.type ? errors.type : '' } 
                >
                  {
                    types.map((type,idx)=>(
                         <option value={type} key={`${idx}-${type}`}>{type}</option>
                    ))
                  }
                </select> <br />
                {
                    mode === 'edit' && (
                       <>
                       <label htmlFor='status'>Status</label><br />
                        <select name="status" id="status"
                         value={values.status}
                         onChange={handleChange}
                         onBlur={handleBlur}
                         >
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                        </select>
                       </> 
                    )
                } <br />
                <button type='submit' className='taskbutton' >
                    {
                        mode === 'edit' ? 'Edit Task' : 'Create Task'
                    }
                </button> <br />
                {
                  mode === 'edit' &&(
                     <button onClick={(e)=>handleDelete(e)} type='submit' className='deletebutton'>Delete Task</button>
                  )
                }
                       </motion.form>
                </div>
             </>
                
             )}
           </Formik>
       </>
  )
}

export default TaskForm
