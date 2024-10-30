import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './login.css';

const API_URL = 'https://example.com/api/register/'; // Онови свій API

const SignUp: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post(API_URL, { first_name: firstName, last_name: lastName, phone_number: phoneNumber, password });
        
            const { access_token } = response.data;
            localStorage.setItem('token', access_token);
        
            navigate('/'); // Перенаправляємо користувача на головну сторінку
        } catch (error) {
            setError('Registration failed. Please try again.');
            console.log(error);
        }
    };

    return (
        <div className="login">
            <div className="item">
                <h2>Register</h2>
                <form onSubmit={handleRegister}>
                    <input
                        className="input"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                        required
                    />
                    <input
                        className="input"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name"
                        required
                    />
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
                    <button type="submit" className="button">Sign Up</button>
                    {error && <p className="error">{error}</p>}
                </form>
                <p>
                    Already have an account? <Link to="/login" className="link">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
