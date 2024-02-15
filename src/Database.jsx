import { useState, useEffect } from "react";
import LoginForm from "./LoginForm";

const uri = "mongodb+srv://tuanqn2901:123456456Tu!@mazestorage.g81b7ci.mongodb.net/?retryWrites=true&w=majority";
function Database(props){
    const [login, setLogin] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    useEffect(() => {
        console.log("Database rendered");
    },[props.db]);
    
    useEffect(() => {
        if(username !== '' && password !== ''){
            console.log("Logging in with username: " + username + " and password: " + password);
        }
    },[username,username]);

    function changeLogin(){
        setLogin(!login);
    }
    
    return (
        <div>
            <button className = "button2" onClick={changeLogin}>Loggon into database</button>
            {login ? <LoginForm changeLogin = {changeLogin} setUsername = {setUsername} setPassword = {setPassword}/> : null}
            <div>
                <h1>Database</h1>
                <p>{props.db.toString()}</p>
                <p>Username: {username}</p>
                <p>Password: {password}</p>
            </div>
        </div>
    );
}

export default Database;