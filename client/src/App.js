import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import LeadDetails from "./pages/LeadDetails";

function App(){
  return(
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/leads" 
          element={
            <ProtectedRoute>
              <Leads />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/lead/:id" 
          element={
            <ProtectedRoute>
              <LeadDetails />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;