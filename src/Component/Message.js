import React from 'react'
import {Link,useNavigate} from 'react-router-dom';
import { useState } from 'react';
import MessageCSS from './Message.module.css';

function Message() {
    const navigate=useNavigate();
    const [selectedOption, setSelectedOption] = useState('');
    const handleSubmit = (event) => {
         event.preventDefault();
         console.log('Selected option:', selectedOption);
         navigate("/")
       };  
  return (
    <div>
        <form onSubmit={handleSubmit}>
      <label><h1>Congratulations....</h1>
     <h2>You are successfully Submitted</h2>
     <h3>All the best for a wonderful career. </h3></label>
     <button className={MessageCSS.btn} type="submit">Go to home<Link to='/Signin'></Link></button>
     </form>
    </div>
  )
}

export default Message
