
import {  BrowserRouter as Router,  
    Routes,  
    Route,
    BrowserRouter, 
  }
  from 'react-router-dom';
  import  Signup from './Component/Signup';
  import Signin from './Component/Signin';
import Homepage from './Component/Homepage';
  import Message from './Component/Message';
import Officerhome from './Component/Officerhome';
  function App() {
    return (
      <div>
      
        <Router >
          
          <Routes >
    
            <Route path="/Signup" element={<Signup/>}/>
            <Route path="/" element={<Signin/>}/>
            <Route path="/Studhome" element={<Homepage/>}/>
           
            <Route path="/Message" element={<Message/>}/>
            <Route path="/Officerhome" element={<Officerhome/>}/>
            </Routes>
            </Router>
            
      </div>
    )
  }
  
  export default App
  