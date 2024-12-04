import React, { useEffect, useRef, useState, ChangeEvent } from "react";
import "./chat.css";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useChatContext } from "./../../context/Context.tsx";

interface Message {
  id: number;
  sender: string;
  content: string;
  created_at: string;
}

interface MyJwtPayload {
  user_id: string;
}

const Chat: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const endRef = useRef<HTMLDivElement | null>(null);
  const yourToken = localStorage.getItem("access_token") || "";
  const decodedToken = jwtDecode<MyJwtPayload>(yourToken);
  const currentUserId = decodedToken.user_id;

  const { selectedChatId, selectedChatName } = useChatContext();
  const API_MESSAGE = `https://batrak.pythonanywhere.com/api/chats/${selectedChatId}/messages/`;
  const API_SEND_MESSAGE = "https://batrak.pythonanywhere.com/api/chats/messages/create/";

  useEffect(() => {
    const fetchMessages = async () => {
      const yourToken = localStorage.getItem("access_token");
      if (!yourToken) {
        console.error("Токен відсутній. Виконайте вхід.");
        return;
      }

      try {
        const response = await axios.get(API_MESSAGE, {
          headers: {
            Authorization: `Bearer ${yourToken}`,
          },
        });
        setMessages(response.data);
      } catch (err: any) {
        console.error("Помилка при отриманні повідомлень:", err);
        if (err.response && err.response.status === 403) {
          console.error("Помилка авторизації: доступ заборонений.");
        }
      }
    };

    fetchMessages();
  }, [API_MESSAGE]);

  useEffect(() => {
    // Автоскролінг до останнього повідомлення
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleEmoji = (emojiData: EmojiClickData) => {
    setText((prev) => prev + emojiData.emoji);
    setOpen(false);
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!text.trim()) {
      return;
    }

    const body = {
      chat: selectedChatId,
      content: text,
    };

    try {
      const response = await axios.post(API_SEND_MESSAGE, body, {
        headers: {
          Authorization: `Bearer ${yourToken}`,
          "Content-Type": "application/json",
        },
      });

      const newMessage: Message = {
        id: response.data.id, 
        sender: currentUserId, 
        content: text, 
        created_at: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, newMessage]);
      setText("");
    } catch (err: any) {
      console.error("Помилка при надсиланні повідомлення:", err);
    }
  };

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="avatar" />
          <div className="texts">
          <span>{selectedChatName?.first_name} {selectedChatName?.last_name}</span>
            <p>Chat with ID {selectedChatId}</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="phone" />
          <img src="./video.png" alt="video" />
          <img src="./info.png" alt="info" />
        </div>
      </div>
      <div className="center">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender === currentUserId ? "own" : ""}`}>
            <img src="./avatar.png" alt="avatar" />
            <div className="texts">
              <p>{message.content}</p>
              <span>{new Date(message.created_at).toLocaleString()}</span>
            </div>
          </div>
        ))}
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="icons" />
          <img src="./camera.png" alt="icons" />
          <img src="./mic.png" alt="icons" />
        </div>
        <input
          type="text"
          placeholder="Send message..."
          value={text}
          onChange={handleTextChange}
        />
        <div className="emoji">
          <img
            src="./emoji.png"
            alt="emoji"
            onClick={() => setOpen((prev) => !prev)}
          />
          <div className="picker">{open && <EmojiPicker onEmojiClick={handleEmoji} />}</div>
        </div>
        <button className="sendButton" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;

