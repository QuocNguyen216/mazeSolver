import {useRef, useState} from "react";
import loadingGIF from './images/loading.gif';

/* A simple login popup prompt for the user to input data */
function LoginForm(props) {
    const [loading, setLoading] = useState(false);
    let timeOutID = useRef(-1);
    const server = "https://maze-server-bgns.onrender.com";
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

        if(username !== '' && password !== ''){
            fetch(`${server}/mongo/connect`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    username: username,
                    password: password
                }),
            }).then(response => response.json())
            .then(data => {
                console.log(data);
                if(data.login){
                    props.setLogged(true);
                    props.setCurElement(data.list);
                    props.changeLogin();
                    clearTimeout(timeOutID);
                    timeOutID = -1;
                    setLoading(false);
                }
                else{
                    alert("Error connecting to MongoDB!");
                    clearTimeout(timeOutID);
                    timeOutID = -1;
                    setLoading(false);
                }
            });
            setLoading(true);
            timeOutID = setTimeout(() => {
                setLoading(false);
                timeOutID = -1;
            },60000);
        }

    }


    return (
        <div className="logPrompt">
            <div className="logPromptInner" style = {{color: "black"}}>
                {loading ?   
                <div className="logPrompt">
                    <div className="logPromptInner" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: "70px" }}>
                        <form>
                            <img src={loadingGIF} alt="loading"></img>
                        </form>
                    </div>
                </div>
                : null
                }
                
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