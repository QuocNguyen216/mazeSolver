import { useEffect, useState } from "react"
import Board from "./Board"
import Database from "./database/Database";


function App() {
  let [curMaze,setCurMaze] = useState({
      grid: null,
      algorithm: null,
      rows: 0,
      cols: 0
  }); 
  let [row,setRow] = useState(5);
  let [col,setCol] = useState(5);
  let [reGen,setReGen] = useState(1);
  let [confirmedRow,setCR]=  useState(5), [confirmedCol,setCC] =  useState(5);
  useEffect(() => {
    document.title = "Maze Solver";
  },[]);
  
  function changeRow(e){
    if(e.target.value <= 20)
      setRow(e.target.value);
  }
  function changeCol(e){
    if(e.target.value <= 20)
      setCol(e.target.value);
  }
  function generateMaze(e){
    setCC(col);
    setCR(row);
    setReGen(() => reGen+1);
  }

  return (
    <> 
      <div style = {
        {
          display: "flex",
          flexDirection: "row",
          gridTemplateColumns: "1fr 1fr",
          margin: "50px"
        }
      
      }>
        <Database resetMaze = {setCurMaze} db = {curMaze} rows = {confirmedRow} cols = {confirmedCol} />
        <div>
        <h1 className = "title">Maze Solver</h1>
          <Board reGen = {reGen} rows = {confirmedRow} cols = {confirmedCol} curMaze = {curMaze} setCurMaze = {setCurMaze} />  
          <div className="tray">
            <div>
              <p className="tag" style = {{
                fontSize: "13px", color: "whitesmoke"
                }}>Hint: value between 0 and 20</p>
              <label className="tag">Maze Size: </label>
              <input type="number" max = {20} value = {row} className="gridIn" placeholder="rows" onChange={e => changeRow(e)}></input>
              <label> x </label>
              <input type="number" max = {20} value = {col} className="gridIn" placeholder="cols" onChange={e => changeCol(e)}></input>
            </div>
            <button onClick = {generateMaze}className="button2">Generate Maze</button>
          </div> 
        </div>
      </div> 
    </>

  )
}

export default App;
