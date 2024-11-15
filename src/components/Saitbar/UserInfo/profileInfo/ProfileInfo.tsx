import './profileInfo.css'

const ProfileInfo = () => {
    return (
        <div className='profileInfo'>
            <div className='users'>
            <img src="./avatar.png" alt="" />
            <div className="username">Egor Shytenko</div>
            <div className="usertime">last seen today at 21:16</div>
            </div>
            <div className="item-block-1">
                <div className="block-1">
                    <img src="./phone.png" alt="" />
                    <span>Message</span>
                </div>
                <div className="block-1">
                    <img src="./more.png" alt="" />
                    <span>More</span>
                </div>
            </div>
            <div className="item-block-2">
                    <div className="userinfo">
                        <span>username</span>
                        <div className="userInformation">
                            <p>@Egor_Shytenko</p>
                            <img src="./edit.png" alt="" />
                        </div>
                        <div className="line"></div>
                    </div>
                    <div className="userinfo">
                        <span>bio</span>
                        <div className="userInformation">
                            <p>I love to track and always </p>
                            <img src="./edit.png" alt="" />
                        </div>
                        <div className="line"></div>
                    </div>
                    <div className="userinfo">
                        <span>phone</span>
                        <div className="userInformation">
                            <p>+380 67 681 93 95</p>
                            <img src="./edit.png" alt="" />
                        </div>
                        <div className="line"></div>
                    </div>
                    <div className="userinfo">
                        <span>birthday</span>
                        <div className="userInformation">
                            <p>17. січ. 2004р. (20 years old)</p>
                            <img src="./edit.png" alt="" />
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default ProfileInfo