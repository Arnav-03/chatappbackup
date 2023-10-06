import React from 'react';
import axios from 'axios';
import { UsercontextProvider } from './UserContext'; // Import the context provider
import Routes from './Routes';

function App() {
    axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;
  
/*   axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;
 */
  axios.defaults.withCredentials = true;

  return (
    <UsercontextProvider>
      <Routes />
    </UsercontextProvider>
  );
}

export default App;
