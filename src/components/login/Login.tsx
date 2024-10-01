import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${API_URL}/login/`, { username, password });
            const { token } = response.data;
            localStorage.setItem('token', token); 
            console.log('Login successful', token);
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const handleRegister = async () => {
        try {
            const response = await axios.post(`${API_URL}/register/`, { username, password, email });
            console.log('Registration successful', response.data);
        } catch (error) {
            console.error('Registration error:', error);
        }
    };


    return (
        <div className="flex justify-center gap-5">
            <div className="w-1/2 flex flex-col">
                <h2>Welcome back,</h2>
                <form action="POST" className="flex flex-col">
                    <p>{ email }</p>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input type="password" id="password" placeholder="Password" name="password" />
                    <button onClick={handleLogin}>Sign in</button>
                </form>
            </div>
            <div className="w-1/2">
                <h2>Create an account</h2>
                <form action="POST" className="flex flex-col">
                    <input type="file" id="file" name="file" />
                    <input type="text" id="name" placeholder="Name" name="name" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <input type="email" id="email" placeholder="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" id="password" placeholder="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <button onClick={handleRegister}>Sign up</button>
                </form>
            </div>
        </div>
    );
};

export default Login;