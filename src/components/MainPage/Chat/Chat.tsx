import { useEffect, useRef, useState } from 'react';
import EmojiPicker from 'emoji-picker-react'; // Ensure this is imported if using an emoji picker
import './chat.css';

const Chat = () => {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState('');
    const endRef = useRef(null);

    // Auto-scroll to the bottom when a message is sent
    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [text]);

    const handleEmojiClick = (e) => {
        setText((prev) => prev + e.emoji);
        setOpen(false);
    };

    return (
        <div className="chat">
            {/* Top bar */}
            <div className="top">
                <div className="user">
                    <img src="./avatar.png" alt="avatar" />
                    <div className="texts">
                        <span>Joy Yo</span>
                        <p>I want 25000 OPF!</p>
                    </div>
                </div>
                <div className="icons">
                    <img src="./phone.png" alt="phone" />
                    <img src="./video.png" alt="video" />
                    <img src="./info.png" alt="info" />
                </div>
            </div>

            {/* Chat messages */}
            <div className="center">
                {/* Example messages */}
                <div className="message">
                    <img src="./avatar.png" alt="avatar" />
                    <div className="texts">
                        <p>I love to track and always do it and my goal is to track 25,000 OPF</p>
                        <span>1 min ago</span>
                    </div>
                </div>

                <div className="message own">
                    <div className="texts">
                        <p>I love to track and always do it and my goal is to track 25,000 OPF</p>
                        <span>1 min ago</span>
                    </div>
                </div>

                {/* More messages can be dynamically rendered here */}
                <div ref={endRef}></div>
            </div>

            {/* Bottom input area */}
            <div className="bottom">
                <div className="icons">
                    <img src="./img.png" alt="image icon" />
                    <img src="./camera.png" alt="camera icon" />
                    <img src="./mic.png" alt="microphone icon" />
                </div>
                <input
                    type="text"
                    placeholder="Send message..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <div className="emoji">
                    <img src="./emoji.png" alt="emoji icon" onClick={() => setOpen((prev) => !prev)} />
                    {open && (
                        <div className="picker">
                            <EmojiPicker onEmojiClick={handleEmojiClick} />
                        </div>
                    )}
                </div>
                <button className="sendButton">Send</button>
            </div>
        </div>
    );
};

export default Chat;
