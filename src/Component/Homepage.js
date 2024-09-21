import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import HomepageCSS from './Homepage.module.css';

function Homepage() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('authid');
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [data, setdata] = useState({
    hyrd:'',
    Pid:'',
    Atin:'',
    Aofin:'',
    offer:'',
    offeri: null,
  });

  const changefn = (e) => {  
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        console.log("user id: ", userId);
        const response = await axios.get(`http://localhost:5000/api/User/userDetails/${localStorage.getItem('authid')}`);
        setUserDetails(response.data);
        console.log("data ", response.data);
        setLoading(false);
        
      } catch (error) {
        console.error('Error fetching user details:', error.message);
        setLoading(false);
      }
    };
    

    fetchUserDetails();
  }, [userId]);

  const [register, setRegister] = useState('No');
  const [placementId, setPlacementId] = useState('');
  const [attendedInterviews, setAttendedInterviews] = useState('No');
  const [areaOfInterest, setAreaOfInterest] = useState('');
  const [receivedJobOffers, setReceivedJobOffers] = useState('No');
  const [offerDocument, setOfferDocument] = useState(null);

  const handleRegisterChange = (e) => {
    setRegister(e.target.value);
    // Reset placementId when changing registration status
    setPlacementId('');
  };

  const handleAttendedInterviewsChange = (e) => {
    setAttendedInterviews(e.target.value);
  };

  const handleAreaOfInterestChange = (e) => {
    setAreaOfInterest(e.target.value);
  };

  const handleReceivedJobOffersChange = (e) => {
    setReceivedJobOffers(e.target.value);
    // Reset offerDocument when changing job offers status
    setOfferDocument(null);
  };

  const handleOfferDocumentChange = (e) => {
    setOfferDocument(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      /*console.log("studentid:",userId);
      console.log('register:', register);
      console.log('placementId:', placementId);
      console.log('attendedInterviews:', attendedInterviews);
      console.log('areaOfInterest:', areaOfInterest);
      console.log('receivedJobOffers:', receivedJobOffers);
      console.log('offerDocument:', offerDocument);*/

      const formData = new FormData();
      formData.append('studentid',userId );
      formData.append('register', register);
      formData.append('placementId', placementId);
      formData.append('attendedInterviews', attendedInterviews);
      formData.append('areaOfInterest', areaOfInterest);
      formData.append('receivedJobOffers', receivedJobOffers);
      formData.append('offerDocument', offerDocument);

      console.log('formData:', formData);

      if (formData.entries().next().done) {
        console.log('FormData is empty');
      } else {
        console.log('studentid:', formData.get('studentid'));
        console.log('register:', formData.get('register'));
        console.log('placementId:', formData.get('placementId'));
        console.log('attendedInterviews:', formData.get('attendedInterviews'));
        console.log('areaOfInterest:', formData.get('areaOfInterest'));
        console.log('receivedJobOffers:', formData.get('receivedJobOffers'));
        console.log('offerDocument:', formData.get('offerDocument'));

        const response = await axios.post('http://localhost:5000/api/Question/Form', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Form submitted successfully:', response.data);
      }
      navigate('/Message')
    } catch (error) {
      // Handle error
      console.error('Error submitting form:', error.message);
    }
  };
  return (
    <div>
      <header>
        <h1 className={HomepageCSS.Section}><b><i>Welcome</i></b> </h1>
      </header>
      <h3 className={HomepageCSS.Second}><i>Channelize your career here</i></h3>
      <p><h3>"Your career is like a garden. It can hold an assortment of life's energy that yields a bounty for you. You do not need to grow just one thing in your garden. You do not need to do just one thing in your career."—Jennifer Ritchie Payette</h3></p>

      <h3>"Opportunities don't happen, you create them."—Chris Grosser.</h3>

      <div className={HomepageCSS.Link}><a href=".Bottom"><u><i>If you didn't fill the questionnaire Scroll here</i></u></a>
      </div>
      <div>
        <div>
          <img src={`http://localhost:5000/${userDetails.image}`} alt="User" />
        </div>
        <div>
          <p>Username: {userDetails.username}</p>
          <p>Email: {userDetails.email}</p>
          <p>Stream: {userDetails.stream}</p>
        </div>
        <div><form onSubmit={handleSubmit} encType="multipart/form-data">
      <div>
        <label>
          Have you registered yourself in the campus placement portal?
          <select value={register} onChange={handleRegisterChange}>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </label>
        {register === 'Yes' && (
          <div>
            <label>
              Placement ID:
              <input
                type="text"
                value={placementId}
                onChange={(e) => setPlacementId(e.target.value)}
                required
              />
            </label>
          </div>
        )}
      </div>

      <div>
        <label>
          Have you attended any interviews?
          <select value={attendedInterviews} onChange={handleAttendedInterviewsChange}>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          Choose your area of interest:
          <select value={areaOfInterest} onChange={handleAreaOfInterestChange} required>
            <option value="">Select an option</option>
            <option value="Data Analytics">Data Analytics</option>
            <option value="Data Annotation">Data Annotation</option>
            <option value="User Experience">User Experience</option>
            <option value="Cybersecurity">Cybersecurity</option>
            <option value="Research">Research</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          Have you received any job offers?
          <select value={receivedJobOffers} onChange={handleReceivedJobOffersChange} required>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </label>
        {receivedJobOffers === 'Yes' && (
          <div>
            <label>
              Upload offer document:
              <input type="file" onChange={handleOfferDocumentChange} accept=".pdf, image/*" required />
            </label>
          </div>
        )}
      </div>
      
      <div>
        <button className={HomepageCSS.btn} type="submit">Submit<Link to='/Message'></Link></button>
      </div>
    </form></div>
      </div>
    </div>
  );
}

export default Homepage