import { useEffect, useState } from "react"
import Board from "./Board"

function App() {
  let [row,setRow] = useState(5);
  let [col,setCol] = useState(5);
  let [reGen,setReGen] = useState(1);
  let [confirmedRow,setCR]=  useState(5), [confirmedCol,setCC] =  useState(5);
  useEffect(() => {
    document.title = "Maze Solver";
  },[]);
  function changeRow(e){
    setRow(e.target.value);
  }
  function changeCol(e){
    setCol(e.target.value);
  }
  function generateMaze(e){
    setCC(col);
    setCR(row);
    setReGen(() => reGen+1);
  }

  return (
    <> 
      <h1 className = "title">Maze Solver</h1>
      <Board reGen = {reGen} rows = {confirmedRow} cols = {confirmedCol} />  
      <div className="tray">
        <div>
          <label className="tag">Maze Size: </label>
          <input type="number" value = {row} className="gridIn" placeholder="rows" onChange={e => changeRow(e)}></input>
          <label> x </label>
          <input type="number" value = {col} className="gridIn" placeholder="cols" onChange={e => changeCol(e)}></input>
        </div>
        <button onClick = {generateMaze}className="button2">Generate Maze</button>
      </div>  
    </>

  )
}

export default App
