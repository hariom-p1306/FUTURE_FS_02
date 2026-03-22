//import logo from './logo.svg';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Leads from "./pages/Leads";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        

        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
          <Route path="/leads" element={<Leads />} />
        <Route path="/dashboard" element={<ProtectedRoute>  <Dashboard /> </ProtectedRoute>
          }
        />
      </Routes>
     
    </BrowserRouter>

  );
}

export default App;
