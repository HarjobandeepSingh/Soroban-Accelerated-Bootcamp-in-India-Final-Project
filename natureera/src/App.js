import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './comp/index.js';
import CreateCap from './comp/CreateCapsule.js';
import ViewCap from './comp/ViewCapsule.js';

function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/create_cap' element={<CreateCap />} />
              <Route path='/view_cap/:id' element={<ViewCap />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
