import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const withAuthRedirect = (WrappedComponent) => {
  const WithAuthRedirect = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const loggedInUser = location.state?.loggedInUser;

    useEffect(() => {
      if (!loggedInUser || !loggedInUser._id) {
        console.error('Invalid or undefined loggedInUser');
        navigate('/login');
      }
    }, [loggedInUser, navigate]);

    return <WrappedComponent {...props} />;
  };

  return WithAuthRedirect;
};

export default withAuthRedirect;
