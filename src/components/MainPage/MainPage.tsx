import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Detail from "../Detail/Detail";
import Sidebar from "../Saitbar/Saitbar";
import Chat from "../Chat/Chat";
import Logout from "../Login/blocks/Logout";

interface TokenPayload {
    exp: number;
}

const MainPage = () => {
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [currentChat, setCurrentChat] = useState<string | null>(null);

    const refreshToken = async () => {
        const refresh = localStorage.getItem('refresh_token');
        if (!refresh) {
            window.location.href = '/login';
            return;
        }

        try {
            const { data } = await axios.post(
                'https://batrak.pythonanywhere.com/api/users/token/refresh/',
                { refresh },
                { headers: { 'Content-Type': 'application/json' } }
            );

            localStorage.setItem('access_token', data.access);
            scheduleTokenRefresh(data.access);
        } catch (error) {
            console.error('Failed to refresh token:', error);
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                localStorage.removeItem('refresh_token');
                window.location.href = '/login';
            }
        }
    };

    const scheduleTokenRefresh = (accessToken: string) => {
        try {
            const { exp } = jwtDecode<TokenPayload>(accessToken);
            const currentTime = Math.floor(Date.now() / 1000);
            const timeout = (exp - currentTime - 60) * 1000;

            setTimeout(refreshToken, timeout);
        } catch (error) {
            console.error('Failed to decode token:', error);
        }
    };

    const fetchChats = async () => {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) return;

        try {
            const response = await axios.get(
                'https://batrak.pythonanywhere.com/api/chats/',
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );
            console.log('Chats loaded:', response.data);
        } catch (error) {
            console.error('Failed to fetch chats:', error);
        }
    };

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
            scheduleTokenRefresh(accessToken);
            fetchChats();
        } else {
            refreshToken();
        }
    }, []);

    const handleChatSelect = (chatId: string) => {
        setCurrentChat(chatId);
        console.log(`Selected chat: ${chatId}`);
        // Додаткові дії для завантаження повідомлень
    };

    return (
        <div className="container">
            <Sidebar onSelectChat={handleChatSelect} />
            <Chat chatId={currentChat} />
            <Detail />
            <Logout />
            {error && <p className="error">{error}</p>}
            {message && <div className="message">{message}</div>}
        </div>
    );
};

export default MainPage;

