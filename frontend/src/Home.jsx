// Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // Assuming your server is running on http://localhost:3011
                const response = await axios.get('http://localhost:3011/api/getUsers');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <h1>Home Page</h1>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                        <p>Skills: {user.skills.join(', ')}</p>
                        <p>Photos:</p>
                        {user.photos && user.photos.length > 0 ? (
                            <div>
                                {user.photos.map((photo, index) => (
                                    <img
                                        key={index}
                                        src={`http://localhost:3011/images/${photo.filename}`}
                                        alt={`User Photo ${index}`}
                                    />
                                ))}
                            </div>
                        ) : (
                            <p>No photos available for this user</p>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
