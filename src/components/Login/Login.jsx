import { useState } from 'react'
import './login.css'


const Login = () => {

    const [avatar, setAvatar] = useState({
        file: null,
        url: ''
    })

    const handelAvatar = (e) => {
        if (e.target.files[0]) {
            setAvatar({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
        }
    }
    
    return (
        <div className='login'>
            <div className='item'>
                <h2>Welcom back</h2>
                <form>
                    <input type='text' placeholder='Emain' name='email'/>
                    <input type='password' placeholder='Password' name='password'/>
                    <button>Sing In</button>
                </form>
            </div>
            <div className='line'></div>
            <div className='item'>
            <h2>Registration</h2>
                <form>
                    <label htmlFor='file'><img src={avatar.url || './avatar.png'} alt=''/>Upload an image</label>
                    <input type='file' id='file' style={{display:"none"}} onChange={handelAvatar}/>
                    <input type='text' placeholder='Emain' name='email'/>
                    <input type='text' placeholder='Username' name='username'/>
                    <input type='password' placeholder='Password' name='password'/>
                    <button>Sing Up</button>
                </form>
            </div>
        </div>
    )
}

export default Login