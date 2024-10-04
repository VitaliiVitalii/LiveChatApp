import ChatList from './ChatList/ChatList';
import UserInfo from './UserInfo/UserInfo';
import './sidebar.css'

const Saitbar = () => {
    return (
        <div className="saitbar">
            <UserInfo />
            <ChatList />
        </div>
    )
}

export default Saitbar