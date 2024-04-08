import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './pages/Profile/Profile';
import { Home } from './pages/Home/Home';
import Login from './pages/Login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chat from './pages/Chat/Chat';
import Footer from './Footer'; // Import Footer component from its file
import MyNavbar from './MyNavbar'; // Import MyNavbar component from its file
import AboutUs from './pages/AboutUs/AboutUs';

const App = () => {
  return (
    <Router>
      <div>
        <MyNavbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/home" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/AboutUs" element={<AboutUs />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
