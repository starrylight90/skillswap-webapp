import React from 'react'
import "./Login.css";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useLoggedInUser } from '../../components/context';



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { updateLoggedInUser } = useLoggedInUser(); 

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3011/api/loginUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const responseData = await response.json(); // Parse the response as JSON

      // Log the response details
      console.log('Response Status:', response.status);
      console.log('Response Headers:', response.headers);
      console.log('Response Data:', responseData);

      if (response.ok) {
        // // Set the logged-in user data in state
        // updateLoggedInUser(responseData);
        // // Successful login, redirect to home page
        // navigate('/match', { state: { loggedInUser: responseData } });

        // Update logged-in user in context
        updateLoggedInUser(responseData);
        // Redirect to chat page
        navigate('/home');
      } else {
        // Display an error message
        alert(`Login failed: ${responseData.error}`);
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