import React, { useState } from 'react';
import styles from './Database.module.css';


function searchForm(props) {
    const [row, setRow] = useState(0);
    const [col, setCol] = useState(0);
    const [algo, setAlgo] = useState(0);
    function changeString(e){
        e.preventDefault();
        let size = false;
        let search = "{";
        if(row > 0 && col > 0){
            search = search + `"rows" : ${String(row)}, "cols" :${String(col)}`;
            size = true;
        }
        else if(row > 0){
            search = search + `"row" : ${String(row)},`;
            size = true;
        }
        else if(col > 0){
            search = search + `"cols" : ${String(col)},`;
            size = true;
        }
        if(algo !== 2){
            if(size)
                search = search+ ",";    
            search = search + (algo === 1 ? `"algorithm" : "dfs",` : `"algorithm" : "dijkstra",`);
        }
        if(search.length > 2)
            search = search.substring(0,search.length-1);
        search = search +"}";
        props.setSearchString(search);
        props.setRefresh(!props.refresh);
        props.setSearch(false);
    }
    return (
        <div className={styles.searchPrompt}>
                <div className={styles.searchPromptInner}>
                    <h2 className = {styles.searchHeader}>Search prompt</h2>
                    <form onSubmit={changeString}>
                        <label>Maze Size: </label>
                        <input type="number" value = {row} className="gridIn" placeholder="rows" onChange={e => setRow(e.target.value)}></input>
                        <label> x </label>
                        <input type="number" value = {col} className="gridIn" placeholder="cols" onChange={e => setCol(e.target.value)}></input><br></br>
                        <label>Maze-solving algorithm: </label>
                        <select value={algo} style = {
                            {fontSize: "1em",}
                        }onChange={(e) => {setAlgo(Number(e.target.value))}}>
                            <option value={0}>Dijkstra's shortest path</option>
                            <option value={1}>Depth first search</option>
                            <option value={2}>None</option>
                        </select><br></br>
                        <button type="submit" className={styles.login}>Search</button>
                    </form>
                    <button type = "button" className={styles.signout} style={{marginTop: "10px"}}
                    onClick={() => props.setSearch(false)}>Cancel</button>
                </div>
            </div>
    );
}

export default searchForm;