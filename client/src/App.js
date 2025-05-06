import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import TextGenerator from './components/TextGenerator';
import ImageGenerator from './components/ImageGenerator';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import Toast styles

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/text" element={<TextGenerator />} />
        <Route path="/image" element={<ImageGenerator />} />
      </Routes>
      
      {/* Toast container for displaying toasts */}
      <ToastContainer />
    </>
  );
};

export default App;
