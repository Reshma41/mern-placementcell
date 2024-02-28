import React, { useState } from 'react';
import axios from 'axios';
import SignupCSS from './Signup.module.css';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [data, setdata] = useState({
    name: '',
    contact: '',
    email: '',
    password: '',
    image: null, // Use null for the file initially
    stream: '',
  });

  const changefn = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const sub = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('contact', data.contact);
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('image', data.image);
      formData.append('stream', data.stream);

      const response = await axios.post('http://localhost:5000/api/User/Adduser', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('submit', response.data);
      navigate('/');
    } catch (error) {
      console.error('Error submitting data:', error.message);
    }
  };

  const handleSelectChange = (event) => {
    setdata({ ...data, stream: event.target.value });
  };

  const handleChange = (e) => {
    const { name, type } = e.target;
    const value = type === 'file' ? e.target.files[0] : e.target.value;

    setdata({
      ...data,
      [name]: value,
    });
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={sub} encType="multipart/form-data">
            
                <div className='main'></div>
                <div className='sub-main'></div>
                <div className='imgs'></div>
                <div className='container-image'></div>               
                 <div>
                    <input className="first-input"type='text' placeholder='name' name='name' onChange={changefn} />
                </div>
                <div>
                    <input className='second-input' type="number" placeholder='Enter your number' name="contact" onChange={changefn} />
                </div>
                <div>
                    <input className='third-input' type='email' placeholder='Enter email' name="email" onChange={changefn} />
                </div>
                <div>
                    <input className='fourth-input'type="password" placeholder='password' name="password" onChange={changefn} />
                </div>
                <div>
                    <select name="stream" value={data.stream} onChange={handleSelectChange}>
                        <option value="">Select an option</option>
                        <option value="Data Analytics">Data Analytics</option>
                        <option value="Data Annotation">Data Annotation</option>
                        <option value="User Experience">User Experience</option>
                        <option value="Cyber Security">Cyber Security</option>
                        <option value="Research">Research</option>
                    </select>
                </div>
                <div><label htmlFor="image">Image </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required
            /></div>
                <button className={SignupCSS.btn} type="submit">ADD<Link to='/Signin'></Link></button>
            </form>
        </div>
    );
}

export default Signup;