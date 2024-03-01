import React from 'react'
import "./Login.css";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleLogin = async () => {
      // Check if email and password are provided
      if (!email || !password) {
        alert('Please enter both email and password.');
        return;
      }
  
      // Assuming you have an API endpoint for login
      try {
        const response = await fetch('http://localhost:3011/api/loginUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
  
        if (response.ok) {
          // Successful login, redirect to home page
          navigate('/home');
        } else {
          // Display an error message
          alert('Incorrect Email Id or Password');
        }
      } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred during login. Please try again.');
      }
    };


  return (
    <div>
 <div className="container login-container">
      <div className="row">
        <div className="col-md-6 mx-auto login-form-1">
          <h3>Login for Form 1</h3>
          <form>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Your Email *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Your Password *"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <button type="button" className="btnSubmit btn btn-primary btn-lg" onClick={handleLogin}>
                Login
              </button>
            </div>
            <div className="form-group">
              <a href="#" className="ForgetPwd">
                Forget Password?
              </a>
            </div>
            <div className="form-group">
              <Link to="/profile" className="btn-lg">
                Make an account with us!
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>


    </div>
  )
}

export default Login