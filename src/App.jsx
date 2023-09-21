import './App.css';
import React from 'react';
import Dragdrop from './Component/DragDrop/Dragdrop';
import Login from './Component/Login/Login';
import {  Routes, Route} from 'react-router-dom';
function App() {
  return (
    <div className="App">
    
   <Routes>
    <Route path='/' element={<Login  />} />
    <Route path='/Dragdrop' element={<Dragdrop  />} />
   </Routes>
    </div>
  );
}

export default App;