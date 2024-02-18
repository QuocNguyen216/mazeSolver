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

        if(username !== '' && password !== ''){
            fetch('http://localhost:5000/mongo/connect', {
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
                }
                else{
                    alert("Error connecting to MongoDB!");
                    
                }
            });
        }

    }


    return (
        <div className="logPrompt">
            <div className="logPromptInner" style = {{color: "black"}}>
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