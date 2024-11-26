import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Detail from "../Detail/Detail";
import Sidebar from "../Saitbar/Saitbar";
import Chat from "../Chat/Chat";
import Logout from "../Login/blocks/Logout";



const MainPage = () => {
    const [message, setMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false); // To track loading state
    const [error, setError] = useState<string>(''); // For error messages

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token'); // Adjusted to match your token key

        // Redirect to login if no access token
        if (!accessToken) {
            window.location.href = '/login';
            return; // Exit the effect early
        } else {
            (async () => {
                try {
                    setLoading(true); // Start loading
                    const { data } = await axios.get(
                        'https://batrak.pythonanywhere.com/api/users/token/refresh/', // Update this URL as needed
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${accessToken}`, // Include the token in the header
                            }
                        }
                    );
                    setMessage(data.message); // Assuming data.message is what you expect
                } catch (error: unknown) { // Catch error as 'unknown'
                    console.log('Error fetching data', error);
                    // Check if the error is an AxiosError
                    if (axios.isAxiosError(error)) {
                        setError('Failed to fetch data.');
                        // Clear the token on unauthorized access
                        if (error.response && error.response.status === 401) {
                            localStorage.removeItem('access_token'); // Clear token on unauthorized access
                            window.location.href = '/login';
                        }
                    } else {
                        setError('An unexpected error occurred.');
                    }
                } finally {
                    setLoading(true);// Stop loading
                }
            })();
        }
    }, []);

    return (
        <div className='container'>
            <Sidebar />
            {/* {loading && <p>Loading...</p>} 
            {error && <p className="error">{error}</p>} Error message */}
            <Chat />
            <Detail />
            {/* {message && <div className="message">{message}</div>} */}
            <Logout />
        </div>
    );
};

export default MainPage;
