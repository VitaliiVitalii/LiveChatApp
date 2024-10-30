import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './login.css';

// Update API URLs according to your setup
const LOGIN_API = 'https://batrak.pythonanywhere.com/api/users/login/';
const TOKEN_API = 'https://batrak.pythonanywhere.com/api/users/token/';

const SignIn: React.FC = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Step 1: Login user and authenticate
            const loginResponse = await axios.post(LOGIN_API, { phone_number: phoneNumber, password });
            
            if (loginResponse.status === 200) {
                // Step 2: After successful login, request access and refresh tokens
                const tokenResponse = await axios.post(TOKEN_API, { phone_number: phoneNumber, password });
                
                // Step 3: Save tokens to localStorage
                const { access, refresh } = tokenResponse.data;
                localStorage.setItem('access_token', access);
                localStorage.setItem('refresh_token', refresh);

                // Step 4: Navigate to the main page
                navigate('/');
            }
        } catch (error) {
            setError('Login failed. Please try again.');
            console.error('Login error:', error);
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
