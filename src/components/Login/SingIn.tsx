import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './login.css';

// Update API URLs according to your setup
const LOGIN_API = 'https://batrak.pythonanywhere.com/api/users/login/';
/* const TOKEN_API = 'https://batrak.pythonanywhere.com/api/users/token/refresh/'; */

const SignIn: React.FC = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    console.log(phoneNumber);
    

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const user = {
            phone_number: phoneNumber,
            password: password
        };
        console.log(user);
        

        try {
            // Step 1: Login user and authenticate
            const {data} = await axios.post(
                LOGIN_API,
                user,
                { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
            );
            
            console.log(data);
            

             // Initialize the access & refresh token in localstorage.      
            localStorage.clear();
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);
            axios.defaults.headers.common['Authorization'] = 
                                            `Bearer ${data['access']}`;
            navigate('/')
/* 
            if (loginResponse.status === 200) {
                // Step 2: After successful login, request access and refresh tokens
                const tokenResponse = await axios.post(
                    TOKEN_API,
                    user,
                    { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
                );

                // Step 3: Save tokens to localStorage
                const { access, refresh } = tokenResponse.data;
                console.log(access, refresh);

                localStorage.setItem('access_token', access);
                localStorage.setItem('refresh_token', refresh);

                // Step 4: Navigate to the main page
                navigate('/');
            } */
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.error('Error data:', error.response.data);
                setError(error.response.data.detail || 'Login failed. Please try again.');
            } else {
                console.error('Login error:', error);
                setError('An unexpected error occurred. Please try again.');
            }
        }
    };


    return (
        <div className="login">
            <div className="item">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        className="input"
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Phone Number"
                        required
                    />
                    <input
                        className="input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    <button className="button" type="submit">Sign In</button>
                    {error && <p className="error">{error}</p>}
                </form>
                <p>
                    Don't have an account? <Link to="/registration" className="link">Register here</Link>
                </p>
            </div>
        </div>
    );
};

export default SignIn;
