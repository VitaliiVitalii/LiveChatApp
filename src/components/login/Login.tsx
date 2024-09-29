const Login = () => {
    return (
        <div>
            <div>
                <h2>Welcome back,</h2>
                <form action="POST">
                    <input type="email" id="email" placeholder="Email" name="email" />
                    <input type="password" id="password" placeholder="Password" name="password" />
                    <button>Sign in</button>
                </form>
            </div>
            <div>
                <h2>Create an account</h2>
                <form action="POST">
                    <input type="email" id="email" placeholder="Email" name="email" />
                    <input type="password" id="password" placeholder="Password" name="password" />
                    <button>Sign in</button>
                </form>
            </div>
        </div>
    );
};

export default Login;