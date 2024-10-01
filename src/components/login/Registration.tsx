import React, { useState } from 'react';
import axios from 'axios';
import Input from './blocks/Input';

const API_URL = 'https://6debfc62-2bc9-4896-a37d-958289cd0ae5.mock.pstmn.io/api/login/';

const Registration: React.FC = () => {
    const [username, setUserName] = useState('');
    const [firstName, setFirst_name] = useState('');
    const [phoneNumber, setPhone_number] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleRegistration = async (e: React.FormEvent) => {
        e.preventDefault();

        const loginData = {
            username: username,
            first_name: firstName,
            phone_number: phoneNumber,
            email: email,
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

        } catch (error) {
            setError('Login failed. Please try again.');
            setSuccessMessage('');
            console.error('Login error:', error);
        }
    };
    
    //fields = ['id', 'username', 'phone_number', 'email', 'first_name', 'last_name', 'profile_picture', 'bio']
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Create an Account</h2>
                <form onSubmit={handleRegistration} className="space-y-4">
                    <Input
                        type="text"
                        id="username"
                        placeholder="Username"
                        name="username"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <Input
                        type="text"
                        id="first_name"
                        placeholder="First Name"
                        name="first_name"
                        value={firstName}
                        onChange={(e) => setFirst_name(e.target.value)}
                    />
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
                    >
                        Login
                    </button>
                </form>
                {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
                {successMessage && <p className="mt-4 text-green-500 text-center">{successMessage}</p>}
            </div>
        </div>
    );
};

export default Registration;

