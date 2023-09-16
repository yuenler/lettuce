import react from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Note the change from 'Switch' to 'Routes'
import LandingPage from './components/LandingPage';
import ScanReceiptPage from './components/ScanReceiptPage';
import RecipesPage from './components/RecipesPage';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/scan-receipt" element={<ScanReceiptPage />} />
        <Route path="/recipes" element={<RecipesPage />} />
      </Routes>
    </Router>
  );
}

// // App.js

// import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
// import './App.css';


// const App = () => {
//   return (
//     <Router>
//       <div className="container">
//         <Switch>
//           <Route exact path="/" component={RecipesPage} />
//           <Route path="/recipe/:name" component={RecipePage} />
//         </Switch>
//       </div>
//     </Router>
//   );
// };

export default App;
