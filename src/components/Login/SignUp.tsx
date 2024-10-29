import React, { useState } from 'react';
import axios from 'axios';
import Input from './blocks/Input';
import './login.css';



const API_URL = 'https://6debfc62-2bc9-4896-a37d-958289cd0ae5.mock.pstmn.io/api/login/';

const Registration: React.FC = () => {
    const [firstName, setFirst_name] = useState('');
    const [lastName, setLast_name] = useState('');
    const [phoneNumber, setPhone_number] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleRegistration = async (e: React.FormEvent) => {
        e.preventDefault();

        const loginData = {
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber,
            password: password,
        };

        console.log('Login data:', loginData);

        try {
            const response = await axios.post(API_URL, loginData, {
                headers: {
                    'Content-Type': 'application/json',
                    
                },

            });

            setSuccessMessage('Login successful! Token: ' + response.data.token);
            setError('');
            console.log('Login successful', response.data);

            localStorage.clear();
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);

            axios.defaults.headers.common['Authorization'] = 
                                        `Bearer ${data['access']}`;
            window.location.href = '/'

        } catch (error) {
            setError('Login failed. Please try again.');
            setSuccessMessage('');
            console.error('Login error:', error);
        }
    };
    
    //fields = ['id', 'username', 'phone_number', 'email', 'first_name', 'last_name', 'profile_picture', 'bio']
    return (
        <div className='login'>
            <div className='item'>
                <h2>Create an Account</h2>
                <form onSubmit={handleRegistration}>
                    <Input
                        type="text"
                        id="first_name"
                        placeholder="First Name"
                        name="first_name"
                        value={firstName}
                        onChange={(e) => setFirst_name(e.target.value)}
                    />
                    <Input
                        type="text"
                        id="last_name"
                        placeholder="Last Name"
                        name="last_name"
                        value={lastName}
                        onChange={(e) => setLast_name(e.target.value)}
                    />
                    <Input
                        type="tel"
                        id="phone_number"
                        placeholder="Phone Number"
                        name="phone_number"
                        value={phoneNumber}
                        onChange={(e) => setPhone_number(e.target.value)}
                    />
                    <Input
                        type="password"
                        id="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="submit"
                    >
                        Sign Up
                    </button>
                </form>
                {error && <p>{error}</p>}
                {successMessage && <p>{successMessage}</p>}
                <p>Don't have an account? <button onClick={togglePage}>Register here</button></p>
            </div>
        </div>
    );
};

export default Registration;

