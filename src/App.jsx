import { useEffect, useState } from "react"
import Board from "./Board"
import Database from "./database/Database";


function App() {
  //A state variable that indicate the currently solved maze
  //It notify both the database and also the board component
  let [curMaze,setCurMaze] = useState({
      grid: null,
      algorithm: null,
      rows: 0,
      cols: 0
  }); 
  let [row,setRow] = useState(5);
  let [col,setCol] = useState(5);

  //This variable is just to force us to regenerate the maze eventhough
  //the row and col variable not changed
  let [reGen,setReGen] = useState(1);

  //This is just for row and col variable when we press generate maze
  let [confirmedRow,setCR]=  useState(5), [confirmedCol,setCC] =  useState(5);
  useEffect(() => {
    document.title = "Maze Solver";
  },[]);
  
  //Helper function for the onChange method in our input
  function changeRow(e){
    if(e.target.value <= 20)
      setRow(e.target.value);
  }
  function changeCol(e){
    if(e.target.value <= 20)
      setCol(e.target.value);
  }

  //This is for the onClick button Generate Maze
  //It automatically change the regen to regenerate the maze everytime we clicked it
  function generateMaze(e){
    setCC(col);
    setCR(row);
    setReGen(() => reGen+1);
  }

  return (
    <> 
      {/* Setting up the styles for the database and the board component */}
      <div style = {
        {
          display: "flex",
          flexDirection: "row",
          gridTemplateColumns: "1fr 1fr",
          margin: "50px"
        }
      
      }>
        {/* This is for the database component, we passed in the current solved mazed and the setter method for it
          We also pass in the current row and col variable */}
        <Database resetMaze = {setCurMaze} db = {curMaze} rows = {confirmedRow} cols = {confirmedCol} />
        <div>
        {/* This is for our maze solving and input components */}
        <h1 className = "title">Maze Solver</h1>
          {/*This is the board component that in charge of solving and displaying the maze */}
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
