import React, { useState, useEffect, useRef } from 'react';
import './chatlist.css';
import { jwtDecode } from "jwt-decode";
import AddUser from './addUser/AddUser';
import axios from 'axios';



interface User {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    profile_picture: string | null;
}

interface Chat {
    id: number;
    participants: string[];
    last_message: { content: string } | null;
}

interface MyJwtPayload {
    user_id: string;
}

const ChatList: React.FC = () => {
    const [addUser, setUser] = useState<boolean>(false);
    const [chats, setChats] = useState<Chat[]>([]);
    const popupRef = useRef<HTMLDivElement>(null);
    const [participantsData, setParticipantsData] = useState<{ [key: string]: User }>({});
    const yourToken = localStorage.getItem('access_token') || '';
    const decodedToken = jwtDecode<MyJwtPayload>(yourToken);
    const currentUserId = decodedToken.user_id;
    const [selectedChatId, setSelectedChatId] = useState<number | null>(null);

    useEffect(() => {
        const fetchChats = async () => {
            const yourToken = localStorage.getItem('access_token');
            try {
                const response = await axios.get('https://batrak.pythonanywhere.com/api/chats/', {
                    headers: {
                        Authorization: `Bearer ${yourToken}`,
                    },
                });
                setChats(response.data);
            } catch (err) {
                console.error('Ошибка', err);
            }
        };

        fetchChats();
    }, []);

    useEffect(() => {
        const fetchParticipants = async () => {
            const yourToken = localStorage.getItem('access_token');
            const newParticipantsData: { [key: string]: User } = {};

            await Promise.all(
                chats.flatMap(chat =>
                    chat.participants.map(async participantId => {
                        if (!participantsData[participantId] && participantId !== currentUserId) {
                            try {
                                const response = await axios.get(
                                    `https://batrak.pythonanywhere.com/api/users/${participantId}/`,
                                    { headers: { Authorization: `Bearer ${yourToken}` } }
                                );
                                newParticipantsData[participantId] = response.data;
                            } catch (err) {
                                console.error(`Ошибка при получении пользователя ${participantId}:`, err);
                            }
                        }
                    })
                )
            );

            setParticipantsData(prevData => ({ ...prevData, ...newParticipantsData }));
        };

        if (chats.length > 0) {
            fetchParticipants();
        }
    }, [chats]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                setUser(false);
            }
        };

        if (addUser) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [addUser]);

    const handleChatClick = (chatId: number) => {
        setSelectedChatId(chatId);
        console.log("ID:", chatId);
    };

    return (
        <div className="chatlist">
            <div className='search'>
                <div className='searchBar'>
                    <img src='./search.png' alt='поиск' />
                    <input type='text' placeholder='Поиск' />
                </div>
                <img src={addUser ? './minus.png' : './plus.png'} alt='добавить' onClick={() => setUser(prev => !prev)} />
            </div>
            {chats.map(chat => (
                <div key={chat.id} onClick={() => handleChatClick(chat.id)}>
                    <div className='texts'>
                        {chat.participants
                            .filter(participantId => participantId !== currentUserId)
                            .map(participantId => {
                                const participant = participantsData[participantId];
                                return participant ? (
                                    <div key={participantId} className='item'>
                                        <img src={participant.profile_picture || './avatar.png'} alt="аватар участника" />
                                        <div className='texts'>
                                            <span>{participant.first_name} {participant.last_name}</span>
                                            <p>{chat.last_message?.content}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <p key={participantId}>Loading...</p>
                                );
                            })}
                    </div>
                </div>
            ))}
            {addUser && (
                <div className="popup" ref={popupRef}>
                    <AddUser />
                </div>
            )}
        </div>
    );
};

export default ChatList;
