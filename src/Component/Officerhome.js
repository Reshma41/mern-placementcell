import React from 'react';
import { useEffect,useState } from 'react';
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios';

function Officerhome() {
  const navigate = useNavigate();
    const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  /*useEffect(() => {
    const fetchResponses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/Question/Responses');
        console.log("data : ",response.data)
        setResponses(response.data);
        setLoading(false);
        //navigate("/")
      } catch (error) {
        console.error('Error fetching responses:', error.message);
        setLoading(false);
      }
    };

    fetchResponses();
  }, []);*/
  const fetchResponses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/Question/Responses');
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await fetchResponses();
        
        
        console.log("data : ", responseData);

    
        setResponses(responseData);

        
        setLoading(false);

        
         //navigate("/")
      } catch (error) {
        
        console.error('Error fetching responses:', error.message);

        
        setLoading(false);
      }
    };

    
    fetchData();

    
  }, []);

  return (
    <div>
      <div>
      <h2>Student Responses</h2>
      {responses.length === 0 ? (
        <p>No responses available.</p>
      ) : (
        <ul>
          {responses.map((response) => (
            <li key={response._id}>
              <h3>Student ID: {response.sid}</h3>
              <p>HYRD: {response.hyrd}</p>
              <p>Placement ID: {response.Pid}</p>
              <p>Attended Interviews: {response.Atin}</p>
              <p>Area of Interest: {response.Aofin}</p>
              <p>Offer: {response.offer}</p>
              <p>Offer Document: {response.offeri}</p>
            </li>
          ))}
        </ul>
      )}
     <button type="submit">Go to home<Link to='/Signin'></Link></button>
    </div>
    </div>
  )
}

export default Officerhome
