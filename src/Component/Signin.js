import React, {  useState } from 'react';
import axios from 'axios';
import SigninCSS from './Signin.module.css';
import { Link,useNavigate } from "react-router-dom";
function Signin() {

const navigate=useNavigate()

    const [data, setdata]=useState
     ({
        email:"",
        password:""

     })
     const changefn = (e)=>{
        setdata({...data, [e.target.name] : e.target.value })
     }
      
     const sub=async(a)=>{
        a.preventDefault()
        console.log(data)
        try{
        const response = await axios.post('http://localhost:5000/api/User/login', data);
        console.log(response.data);
        if (response) {
          localStorage.setItem('authid', response.data._id);
          localStorage.setItem('authRole', response.data.Role);
          setdata({ email: '', password: '' });
          if (response.data.Role === 'student') {
            alert("Login successfully");
            navigate("/Studhome")
            }
          
           else {
            alert("Login successfully");
            navigate("/Officerhome")
          
          }
      
        }
        
        
      } catch
       {
        alert("Invalid Mail id or Password");
      }
    };
     
  return (
    <div>
      <h2>Signin</h2>
      <form onSubmit={sub}>
      <div className={SigninCSS.main}></div>
      <div className={SigninCSS.sub}></div>
        <div>
            <input type='text'className={SigninCSS.first}placeholder='email'name='email'onChange={changefn}/>
    </div>
          <div>
          <input type='text'className={SigninCSS.second}placeholder='password' name="password"onChange={changefn}/>
          </div>
        <button  className={SigninCSS.btn}type="submit" >Login </button>
        <p>Don't you have an account?<Link to='/Signup'>Reg</Link></p>
        </form>
      </div>
  )
  
  };
export default Signin

