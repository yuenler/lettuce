import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Note the change from 'Switch' to 'Routes'
import LandingPage from './components/LandingPage';
import ScanReceiptPage from './components/ScanReceiptPage';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/scan-receipt" element={<ScanReceiptPage />} />
      </Routes>
    </Router>
  );
}

export default App;
