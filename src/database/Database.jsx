import { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import SmallBoard from "./SmallBoard";
import styles from "./Database.module.css";
import SearchForm from "./SearchForm";
import mongodbImage from './images/mongodb.jpg';

const uri = "mongodb+srv://tuanqn2901:123456456Tu!@mazestorage.g81b7ci.mongodb.net/?retryWrites=true&w=majority";
function Database(props){
    
    const [search, setSearch] = useState(false);
    const [curElement, setCurElement] = useState([]);
    const [login, setLogin] = useState(false);
    const [logged, setLogged] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [searchString, setSearchString] = useState('');
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        console.log(searchString);
        fetch('http://localhost:5000/mongo/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: searchString,
        }).then(response => response.json()
        ).then(data => {
            console.log(data);
            setCurElement(data.list);
        });
    },[searchString, refresh]);

    function changeLogin(){
        setLogin(!login);
    }

    function signout(){
        fetch('http://localhost:5000/mongo/signout', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(response => response.json())
            .then(data => {
                console.log(data);
                if(data.data === "good"){
                    setLogged(false);
                    setUsername('');
                    setPassword('');
                }
                else{
                    alert("Error signing out");
                }
            }
            );
    }
    
    function saveBoard(){
        if(logged){
            fetch('http://localhost:5000/mongo/insert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    grid: props.db.grid,
                    rows: props.db.rows,
                    cols: props.db.cols,
                    algorithm: props.db.algorithm
                }),
            }).then(response => response.json())
            .then(data => {
                console.log(data);
                if(data.data !== "good"){
                    alert("Error saving board");
                }
                else{
                    console.log("Board saved");
                    props.resetMaze({
                        grid: null,
                        algorithm: null,
                        rows: 0,
                        cols: 0
                    });
                    setRefresh(!refresh);
                    alert("Board saved");
                }
            });
        }
        else{
            alert("You must log in to save the board");
        }
    }

    function deleteBoard(i){
        console.log(i);
        if(logged){
            fetch('http://localhost:5000/mongo/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(curElement[i]), 
            }).then(response => response.json())
            .then(data => {
                console.log(data);
                if(data.data !== "good"){
                    alert("Error deleting board");
                }
                else{
                    console.log("Board deleted");
                    setRefresh(!refresh);
                    alert("Board deleted");
                }
            });
        }
        else{
            alert("You must log in to delete the board");
        }
    }

    return (
        <div style = {{
            minWidth: "600px",
            maxWidth: "600px",
            color: "beige",
        }}>
            {logged ? <h1>Hello, {username}</h1> : null}
            {logged ? <button className = {styles.signout} onClick={signout}>Sign out</button>
            : <button className = {styles.login} onClick={changeLogin}>Login</button> }
            <br></br>
            {logged ? <img src={mongodbImage} alt="MongoDB" style = {{
                    width: "30%", height: "auto", borderRadius: "20px",marginTop: "20px", marginBottom: "5px", 
                    boxShadow: "5px 5px 5px #2121213b"
                    }}/> 
            : null}
            {(props.db.grid !== null) && logged ? 
                <div style = {{
                    maxWidth: (props.db.rows*20 + 100) + "px",
                }}>
                    <SmallBoard db = {props.db}/>
                    <button onClick = {saveBoard} className = {styles.button}>Save</button>
                </div>
                : null}
            {login ? <LoginForm changeLogin = {changeLogin} setUsername = {setUsername} setPassword = {setPassword}
            setLogged = {setLogged} setCurElement = {setCurElement}/> : null}
            {logged ? 
            <div>
                <button onClick = {() => setSearch(!search)}className = {styles.search}></button>
                <button onClick = {() => setRefresh(!refresh)}className = {styles.refresh}></button>
                {search ? <SearchForm setSearch = {setSearch} setSearchString = {setSearchString}
                refresh = {refresh} setRefresh = {setRefresh}/> : null}
                <div className = {styles.list}>            
                    {curElement.map((element, i) => (
                        <div key={i} style = {{marginLeft: "40px"}}>
                            <button onClick = {() => deleteBoard(i)} className = {styles.delete}></button>
                            <label style={{
                                fontSize: "1.5em",
                                color: "whitesmoke",
                            
                            }}>  Board: {i}</label><br></br>
                            <SmallBoard db = {element}/>
                        </div>
                    ))}
                </div>
                
            </div>
            : null}
        </div>
    );
}

export default Database;