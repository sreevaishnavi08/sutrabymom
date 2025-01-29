import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Recruitment from './components/JoinUsPage'; // Adjust the path if needed
import ApplyNow from './components/ApplyNow'; // Importing ApplyNow component
import { ThemeProvider } from './components/context/ThemeContext';
import AdminDashboard from './components/AdminDashboard';
import VastrakarDashboard from './components/VastrakarDashboard';
import SideMenu from "./components/SideMenu";
import FabricCollection from "./components/FabricCollection";

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen">
          <Navbar isSignedIn={false} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/joinus" element={<Recruitment />} />
            <Route path="/apply-now" element={<ApplyNow />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/vastrakar-dashboard" element={<VastrakarDashboard />} />
            <Route path="/" element={<SideMenu isOpen={true} onClose={() => {}} />} />
            <Route path="/fabrics" element={<FabricCollection />} />

            {/* You can add other routes here */}
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}
