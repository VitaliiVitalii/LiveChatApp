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
                        <img src='data:image/jpeg;base64,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' alt='emoji' />
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
