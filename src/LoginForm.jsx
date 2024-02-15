import {useState} from "react";

function LoginForm(props) {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin(e) {
        e.preventDefault();
        console.log("Logging in");
        if(username !== '')
            props.setUsername(username);   
        else{
            alert("Please enter a username");
            return;
        }
        if(password !== '')
            props.setPassword(password);
        else{
            alert("Please enter a password");
            return;
        }
        props.changeLogin();

    }


    return (
        <div className="logPrompt">
            <div className="logPromptInner">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <label>
                        Username:
                        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                    </label>
                    <label>
                        Password:
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </label>
                    <button type="submit">Login</button>
                </form>
                <button type = "button" onClick={props.changeLogin}>Close</button>
            </div>
        </div>
    );
}  

export default LoginForm;