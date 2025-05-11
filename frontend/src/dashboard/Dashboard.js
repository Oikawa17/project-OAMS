//
//import { useNavigate } from 'react-router-dom';
//function Dashboard() {
  //const navigate = useNavigate();
//
 // return 
    //<div>
      //<h2>Dashboard</h2>
    //  <button onClick={() => navigate('/dashboard')}>Dashboard</button>
      //<button onClick={() => navigate('/application-form')}>Application Form</button>
     // <button onClick={() => navigate('/application-status')}>Application Status</button>
     // <button onClick={() => navigate('/payment-information')}>Payment Information</button>
     // <button onClick={() => navigate('/document-upload')}>Documents Upload</button>
      //<button onClick={() => navigate('/messages')}>Messages</button>
      //<button onClick={() => navigate('/profile')}>Profile</button>
     // <button onClick={() => navigate('/settings')}>Settings</button>
   // </div>
/// );
//}

//export default Dashboard;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function Dashboard() {
    const navigate = useNavigate();
  return (
     <div>
      <h2>Dashboard</h2>
      <button onClick={() => navigate('/application-form')}>Application Form</button>
      <button onClick={() => navigate('/application-status')}>Application Status</button>
      <button onClick={() => navigate('/payment-information')}>Payment Information</button>
      <button onClick={() => navigate('/document-upload')}>Documents Upload</button>
      <button onClick={() => navigate('/messages')}>Messages</button>
      <button onClick={() => navigate('/profile')}>Profile</button>
      <button onClick={() => navigate('/settings')}>Settings</button>
    </div>
  );
}

export default Dashboard;
