import { useEffect, useRef, useState, ChangeEvent } from 'react';
import './chat.css';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

const Chat: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [text, setText] = useState<string>("");
    const endRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    const handleEmoji = (emojiData: EmojiClickData) => {
        setText((prev) => prev + emojiData.emoji);
        setOpen(false);
    };

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    return (
        <div className="chat">
            <div className='top'>
                <div className='user'>
                    <img src="./avatar.png" alt="avatar" />
                    <div className='texts'>
                        <span>Joy Yo</span>
                        <p>I want 25000 opf!</p>
                    </div>
                </div>
                <div className='icons'>
                    <img src="./phone.png" alt="phone" />
                    <img src="./video.png" alt="video" />
                    <img src="./info.png" alt="info" />
                </div>
            </div>
            <div className='center'>
                <div className='message'>
                    <img src='./avatar.png' alt='avatar' />
                    <div className='texts'>
                        <p>I love to track and always do it and my goal is to track 25,000 OPF</p>
                        <span>1 min ago</span>
                    </div>
                </div>

                <div className='message own'>
                    <div className='texts'>
                        <p>I love to track and always do it and my goal is to track 25,000 OPF</p>
                        <span>1 min ago</span>
                    </div>
                </div>

                <div className='message'>
                    <img src='./avatar.png' alt='avatar' />
                    <div className='texts'>
                        <p>I love to track and always do it and my goal is to track 25,000 OPF</p>
                        <span>1 min ago</span>
                    </div>
                </div>

                <div className='message own'>
                    <div className='texts'>
                        <p>I love to track and always do it and my goal is to track 25,000 OPF</p>
                        <span>1 min ago</span>
                    </div>
                </div>

                <div className='message'>
                    <img src='./avatar.png' alt='avatar' />
                    <div className='texts'>
                        <p>I love to track and always do it and my goal is to track 25,000 OPF</p>
                        <span>1 min ago</span>
                    </div>
                </div>

                <div className='message own'>
                    <div className='texts'>
                        <img src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/...' alt='emoji' />
                        <p>I love to track and always do it and my goal is to track 25,000 OPF</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div ref={endRef}></div>
            </div>
            <div className='bottom'>
                <div className='icons'>
                    <img src="./img.png" alt="icons" />
                    <img src="./camera.png" alt="icons" />
                    <img src="./mic.png" alt="icons" />
                </div>
                <input
                    type='text'
                    placeholder='Send message...'
                    value={text}
                    onChange={handleTextChange}
                />
                <div className='emoji'>
                    <img
                        src="./emoji.png"
                        alt="emoji"
                        onClick={() => setOpen((prev) => !prev)}
                    />
                    <div className='picker'>
                        {open && <EmojiPicker onEmojiClick={handleEmoji} />}
                    </div>
                </div>
                <button className='sendButton'>Send</button>
            </div>
        </div>
    );
}

export default Chat;
