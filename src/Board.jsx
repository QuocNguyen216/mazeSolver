
import React from 'react';
import { useRef } from 'react';
import { useEffect,useState } from 'react';
import Queue from './dataStrucutres/Queue';

//Main function for board
function Board(props) {
    const [grid, setGrid] = useState([]);
    let gridClone = useRef([[]]);
    const delay = useRef(0);
    const [disabledSolve, setDisabledSolve] = useState(false);
    const [disabledReset, setDisabledReset] = useState(false);
    const [algo, setAlgo] = useState(0);
    const test = "rgba(230, 181, 84)";
    const confirm = "rgba(117, 223, 103)";

    //get invoke when there are chagnes in props, indicating that
    //the user has changed the size of the maze and new generation is needed
    useEffect(() => {
        //Here we are creating a 2D array of objects, each object contains
        //properties of each cell in our maze
        let newGrid = new Array(props.rows);
        for (let i = 0; i < props.rows; i++) {
            newGrid[i] = new Array(props.cols);
            for (let j = 0; j < props.cols; j++) {
                    newGrid[i][j] = {
                    isVisited: false,
                    wallUp: true,
                    wallDown: true,
                    wallLeft: true,
                    wallRight: true,
                    property: {
                        borderTop: "2px solid black",
                        borderBottom: "2px solid black",
                        borderLeft: "2px solid black",
                        borderRight: "2px solid black",
                        backgroundColor: "rgb(239, 196, 196)",
                    }
                };
            }
        }
        //We were just outlining the outer border of the maze
        for(let i = 0; i < props.rows; i++)
        {
            newGrid[i][0].property.borderLeft = "4px solid black";
        }
        for(let i = 0; i < props.cols; i++)
        {
            newGrid[0][i].property.borderTop = "4px solid black";
        }
        for(let i = 0; i < props.rows; i++)
        {
            newGrid[i][props.cols-1].property.borderRight = "4px solid black";
        }
        for(let i = 0; i < props.cols; i++)
        {
            newGrid[props.rows-1][i].property.borderBottom = "4px solid black";
        }
        newGrid[0][0].property.borderTop = "4px solid rgb(239, 196, 196)";
        newGrid[0][0].borderTop = false;
        newGrid[props.rows-1][props.cols-1].property.borderBottom = "4px solid rgb(239, 196, 196)";
        newGrid[props.rows-1][props.cols-1].borderBottom = false;    
        

        //Recursive function to generate the maze patterns
        generatingMaze(newGrid,Math.floor(props.rows/2),Math.floor(props.cols/2));
        //copy function is needed to make a deep copy of the grid
        let newGrid2 = copyGrid(newGrid);
        setGrid(newGrid2);
        setDisabledSolve(false);
        setDisabledReset(true);
        delay.current = 0;

    }, [props.rows, props.cols,props.reGen]);

    //reset our maze to the original state
    function resetMaze(){
        let newGrid = copyGrid(grid);
        for (let i = 0; i < props.rows; i++) {
            for (let j = 0; j < props.cols; j++) {
                newGrid[i][j].property.backgroundColor = "rgb(239, 196, 196)";
                if(!newGrid[i][j].wallUp)
                    newGrid[i][j].property.borderTop = "2px solid rgb(239, 196, 196)";
                if(!newGrid[i][j].wallDown)
                    newGrid[i][j].property.borderBottom = "2px solid rgb(239, 196, 196)";
                if(!newGrid[i][j].wallLeft)
                    newGrid[i][j].property.borderLeft = "2px solid rgb(239, 196, 196)";
                if(!newGrid[i][j].wallRight)
                    newGrid[i][j].property.borderRight = "2px solid rgb(239, 196, 196)";
            }
        }
        newGrid[0][0].property.borderTop = "4px solid rgb(239, 196, 196)";
        newGrid[props.rows-1][props.cols - 1].property.borderBottom = "4px solid rgb(239, 196, 196)";
        setDisabledReset(true);
        setDisabledSolve(false);
        setGrid(newGrid);
    }
    //generating maze recursively
    function generatingMaze(newGrid, i, j) {
        newGrid[i][j].isVisited = true;
        let random = Math.floor(Math.random() * 4);
        let check = random;
        
        do{
            switch (check) {
                case 0:
                    if(j+1 >= 0 && j+1 < props.cols)
                        if(!newGrid[i][j+1].isVisited)
                        {
                            newGrid[i][j].wallRight = false;
                            newGrid[i][j+1].wallLeft = false;
                            newGrid[i][j].property.borderRight = "2px solid rgb(239, 196, 196)";
                            newGrid[i][j+1].property.borderLeft = "2px solid rgb(239, 196, 196)";
                            generatingMaze(newGrid,i,j+1);
                        }
                    break;
                case 1:
                    if(j-1 >= 0 && j-1 < props.cols)
                        if(!newGrid[i][j-1].isVisited)
                        {
                            newGrid[i][j].wallLeft = false;
                            newGrid[i][j-1].wallRight = false;
                            newGrid[i][j].property.borderLeft = "2px solid rgb(239, 196, 196)";
                            newGrid[i][j-1].property.borderRight = "2px solid rgb(239, 196, 196)";
                            generatingMaze(newGrid,i,j-1);
                        }
                    break;
                case 2:
                    if(i+1 >= 0 && i+1 < props.rows)
                        if(!newGrid[i+1][j].isVisited)
                        {
                            newGrid[i][j].wallDown = false;
                            newGrid[i+1][j].wallUp = false;
                            newGrid[i][j].property.borderBottom = "2px solid rgb(239, 196, 196)";
                            newGrid[i+1][j].property.borderTop = "2px solid rgb(239, 196, 196)";
                            generatingMaze(newGrid,i+1,j);
                        }
                    break;
                case 3:
                    if(i-1 >= 0 && i-1 < props.rows)
                        if(!newGrid[i-1][j].isVisited)
                        {
                            newGrid[i][j].wallUp = false;
                            newGrid[i-1][j].wallDown = false;
                            newGrid[i][j].property.borderTop = "2px solid rgb(239, 196, 196)";
                            newGrid[i-1][j].property.borderBottom = "2px solid rgb(239, 196, 196)";
                            generatingMaze(newGrid,i-1,j);
                        }
                    break;
            }
            check = (check +1)%4;
        }while(check != random);
       
    }
    //copy function to make a deep copy of the grid
    function copyGrid(grid){
        let newGrid = new Array(props.rows);
        for (let i = 0; i < props.rows; i++) {
            newGrid[i] = new Array(props.cols);
            for (let j = 0; j < props.cols; j++) {
                newGrid[i][j] = {
                    isVisited: grid[i][j].isVisited,
                    wallUp: grid[i][j].wallUp,
                    wallDown: grid[i][j].wallDown,
                    wallLeft: grid[i][j].wallLeft,
                    wallRight: grid[i][j].wallRight,
                    property: {
                        borderTop: grid[i][j].property.borderTop,
                        borderBottom: grid[i][j].property.borderBottom,
                        borderLeft: grid[i][j].property.borderLeft,
                        borderRight: grid[i][j].property.borderRight,
                        backgroundColor: grid[i][j].property.backgroundColor,
                    }
                };
            }
        }
        return newGrid;
    }

    //function to solve the maze
    function solveMaze(){
        switch(algo){
            case 0:
                console.log("dijsktra");
                dijkstra();
                break;
            case 1:
                console.log("dfs");
                dfs();
                break;
        }
    }
    function extractValue(){
        let ans = new Array(props.rows);
        for(let i = 0; i < props.rows; i++){
            ans[i] = new Array(props.cols);
            for(let j = 0; j < props.cols; j++){
                ans[i][j] = {
                    backgroundColor: grid[i][j].property.backgroundColor,
                    wallUp: grid[i][j].wallUp,
                    wallDown: grid[i][j].wallDown,
                    wallLeft: grid[i][j].wallLeft,
                    wallRight: grid[i][j].wallRight,
                };
            }
        }
        return ans;
    }

    //function to solve the maze using prim's algorithm
    function dfs(){
        //greying out the solve maze button
        setDisabledSolve(true);
        let newGrid = [[]];
        //copy the grid to a new grid for solving the maze
        for (let i = 0; i < props.rows; i++) {
            newGrid[i] = new Array(props.cols);
            for (let j = 0; j < props.cols; j++) {
                newGrid[i][j] = {
                    isVisited: false,
                    wallUp: grid[i][j].wallUp,
                    wallDown: grid[i][j].wallDown,
                    wallLeft: grid[i][j].wallLeft,
                    wallRight: grid[i][j].wallRight,
                    parent: [-1,-1],
                };
            }
        }

        gridClone.current = copyGrid(grid);
        newGrid[0][0].isVisited = true;
        dfsHelper(newGrid,0,0,2);

        let a = props.rows-1;
        let b = props.cols-1;
        let x,y;
        let tracea = new Queue();
        let traceb = new Queue();
        let tracedir = new Queue();
        tracedir.enqueue(3);
        while(a != -1 && b != -1){
            if(a != -1 && b != -1)
            {   
                tracea.enqueue(a);
                traceb.enqueue(b);
                delay.current += 1;
                setTimeout(() => markGraph(confirm,tracea.dequeue(),traceb.dequeue(),tracedir.dequeue()),delay.current*100);
            }


            x = newGrid[a][b].parent[0];
            y = newGrid[a][b].parent[1];
            if(b+1 == y)
                tracedir.enqueue(0)
            else if(b-1 == y)
                tracedir.enqueue(1)
            else if(a+1 == x)
                tracedir.enqueue(2)
            else if(a-1 == x)    
                tracedir.enqueue(3)
            a = x;
            b = y;
        }

        delay.current += 1;
        setTimeout(() => {
            gridClone.current[0][0].property.borderTop = "4px solid "+confirm;
            let newGrid = copyGrid(gridClone.current);
            setGrid(newGrid);
            delay.current = 0;
            setDisabledReset(false);
            //copy answer to array
            let ans = extractValue();
            props.setCurMaze(ans);
        },delay.current*100);
    }
    function dfsHelper(newGrid,i,j,dir){
        let stack = new Array();
        delay.current += 1;
        setTimeout(() => markGraph(test,i,j,dir),delay.current*100);
        if(j<props.cols-1)
        {
            if(newGrid[i][j+1].isVisited == false && newGrid[i][j].wallRight == false)
            {
                stack.push([i,j+1,0]);
            }
        }
        if(j>0)
        {
            if(newGrid[i][j-1].isVisited == false && newGrid[i][j].wallLeft == false)
            {
                stack.push([i,j-1,1]);
            }
        }
        if(i<props.rows-1)
        {
            if(newGrid[i+1][j].isVisited == false && newGrid[i][j].wallDown == false)
            {
                stack.push([i+1,j,2]);
            }
        }
        if(i>0)
        {
            if(newGrid[i-1][j].isVisited == false && newGrid[i][j].wallUp == false)
            {
                stack.push([i-1,j,3]);
            }
        }
        while(stack.length > 0)
        {
            if(newGrid[props.rows - 1][props.cols - 1].isVisited == true)
                break;
            let [a,b,c] = stack.pop();
            if(newGrid[a][b].isVisited == false)
            {
                newGrid[a][b].isVisited = true;
                newGrid[a][b].parent = [i,j];
                dfsHelper(newGrid,a,b,c);
            }
        }
        
    }
    function dijkstra(){
        //greying out the solve maze button
        setDisabledSolve(true);
        let newGrid = [[]];
        //copy the grid to a new grid for solving the maze
        for (let i = 0; i < props.rows; i++) {
            newGrid[i] = new Array(props.cols);
            for (let j = 0; j < props.cols; j++) {
                newGrid[i][j] = {
                    isVisited: false,
                    parent: [-1,-1],
                    wallUp: grid[i][j].wallUp,
                    wallDown: grid[i][j].wallDown,
                    wallLeft: grid[i][j].wallLeft,
                    wallRight: grid[i][j].wallRight,
                    distance: Number.MAX_VALUE,
                    // styling: document.getElementById(`cell${i}${j}`),
                };
            }
        }
        //copy a new grid to keep the original grid
        gridClone.current = copyGrid(grid);
        newGrid[0][0].distance = 0;
        let shortestPath = [];
        markGraph(test,0,0,2);
        //dijkstra's algorithm to solve the maze
        while(shortestPath.length != props.rows*props.cols){
            let [mina,minb] = findMin(newGrid);
            newGrid[mina][minb].isVisited = true;
            if(mina == props.rows-1 && minb == props.cols-1)
            {
                let a = props.rows-1;
                let b = props.cols-1;
                let x,y;
                let tracea = new Queue();
                let traceb = new Queue();
                let tracedir = new Queue();
                tracedir.enqueue(3);
                while(a != -1 && b != -1){
                    if(a != -1 && b != -1)
                    {   
                        tracea.enqueue(a);
                        traceb.enqueue(b);
                        delay.current += 1;
                        setTimeout(() => markGraph(confirm,tracea.dequeue(),traceb.dequeue(),tracedir.dequeue()),delay.current*100);
                    }


                    x = newGrid[a][b].parent[0];
                    y = newGrid[a][b].parent[1];
                    if(b+1 == y)
                        tracedir.enqueue(0)
                    else if(b-1 == y)
                        tracedir.enqueue(1)
                    else if(a+1 == x)
                        tracedir.enqueue(2)
                    else if(a-1 == x)    
                        tracedir.enqueue(3)
                    a = x;
                    b = y;
                }
                break;
            }

            shortestPath.push(newGrid[mina][minb]);
            let compare = newGrid[mina][minb].distance + 1
            if(newGrid[mina][minb].wallRight == false && minb + 1 < props.cols){
                if(newGrid[mina][minb+1].distance > compare){
                    newGrid[mina][minb+1].distance = compare;
                    delay.current += 1;
                    newGrid[mina][minb+1].parent = [mina,minb];
                    setTimeout(() => markGraph(test,mina,minb+1,0),delay.current*100);
                    
                }
            }
            if(newGrid[mina][minb].wallLeft == false && minb - 1 >= 0){
                if(newGrid[mina][minb-1].distance > compare){
                    newGrid[mina][minb-1].distance = compare;
                    delay.current += 1;
                    newGrid[mina][minb-1].parent = [mina,minb];
                    setTimeout(() => markGraph(test,mina,minb-1,1),delay.current*100);
                    
                }
            }
            if(newGrid[mina][minb].wallDown == false && mina + 1 < props.rows){
                if(newGrid[mina+1][minb].distance > compare){
                    newGrid[mina+1][minb].distance = compare;
                    delay.current += 1;
                    newGrid[mina+1][minb].parent = [mina,minb];
                    setTimeout(() => markGraph(test,mina+1,minb,2),delay.current*100);
                    
                }
            }
            if(newGrid[mina][minb].wallUp == false && mina - 1 >= 0){
                if(newGrid[mina-1][minb].distance > compare){
                    newGrid[mina-1][minb].distance = compare;
                    delay.current += 1;
                    newGrid[mina-1][minb].parent = [mina,minb];
                    setTimeout(() => markGraph(test,mina-1,minb,3),delay.current*100);
                    
                }
            }
        }
        
        delay.current += 1;
        setTimeout(() => {
            gridClone.current[0][0].property.borderTop = "4px solid "+confirm;
            let newGrid = copyGrid(gridClone.current);
            setGrid(newGrid);
            delay.current = 0;
            setDisabledReset(false);
            //copy answer to array
            let ans = extractValue();
            props.setCurMaze(ans);
        },delay.current*100);
        
    }

    //function to find the minimum distance in the grid
    function findMin(newGrid){
        let min = Number.MAX_VALUE;
        let a = -1, b = -1;
        for(let i = 0; i < props.rows; i++){
            for(let j = 0; j < props.cols; j++){
                if(newGrid[i][j].distance < min && !newGrid[i][j].isVisited){
                    min = newGrid[i][j].distance;
                    a = i;
                    b = j;
                }
            }
        }
        return [a,b];
    }

    //function to update the color of the cell, indicating either a a true path
    //or a the steps which the algorithm has taken
    function markGraph(color,i,j,dir){
        switch(dir){
            //right
            case 0:
                if(j-1 >= 0 && j-1 < props.cols)
                    gridClone.current[i][j-1].property.borderRight = "2px solid "+color;
                if(i==0&&j==0)
                    gridClone.current[i][j].property.borderLeft = "4px solid "+color;
                else
                gridClone.current[i][j].property.borderLeft = "2px solid "+color;
                gridClone.current[i][j].property.backgroundColor = color;
                let newGrid = copyGrid(gridClone.current);
                setGrid(newGrid);
                break;
            //left
            case 1: 
                if(j+1 >= 0 && j+1 < props.cols)
                    gridClone.current[i][j+1].property.borderLeft = "2px solid "+color;
                gridClone.current[i][j].property.borderRight = "2px solid "+color;
                gridClone.current[i][j].property.backgroundColor = color;
                let newGrid1 = copyGrid(gridClone.current);
                setGrid(newGrid1);
                break;
            //down
            case 2:
                if(i-1 >= 0 && i-1 < props.rows)
                    gridClone.current[i-1][j].property.borderBottom = "2px solid "+color;
                gridClone.current[i][j].property.borderTop = "2px solid "+color;
                gridClone.current[i][j].property.backgroundColor = color;
                let newGrid2 = copyGrid(gridClone.current);
                setGrid(newGrid2);
                break;
            //up
            case 3:
                if(i+1 >= 0 && i+1 < props.rows)
                    gridClone.current[i+1][j].property.borderTop = "2px solid "+color;
                if(i == props.rows-1 && j == props.cols-1)
                    gridClone.current[i][j].property.borderBottom = "4px solid "+color;
                else
                    gridClone.current[i][j].property.borderBottom = "2px solid "+color;
                gridClone.current[i][j].property.backgroundColor = color;
                let newGrid3 = copyGrid(gridClone.current);
                setGrid(newGrid3);
                break;
        }
    }
    

    return (
        <div className = "Gridtray"> 
            {grid.map((row, i) => (
                <div key={i}>
                    {row.map((col, j) => (
                        <button key={j} id = {`cell${i}${j}`} className = "cell" style = {{
                            borderTop: grid[i][j].property.borderTop,
                            borderBottom: grid[i][j].property.borderBottom,
                            borderLeft: grid[i][j].property.borderLeft,
                            borderRight: grid[i][j].property.borderRight,
                            backgroundColor: grid[i][j].property.backgroundColor,                       
                        }}>
                            
                        </button>
                    ))}
                </div>
            ))}
            <div className="options">
                <label>Select an maze-solving algorithm: </label>
                <select value={algo} onChange={(e) => {setAlgo(Number(e.target.value))}}>
                        <option value={0}>Dijkstra's shortest path</option>
                        <option value={1}>Depth first search</option>
                </select>
            </div>
            <div>
                <button onClick = {disabledSolve ? null : solveMaze} className={disabledSolve ? 'button2-disabled' : 'button2'}>
                    Solve Maze
                </button>
                <button onClick = {disabledReset ? null : resetMaze} className={disabledReset ? 'button2-disabled' : 'button2'}>
                    Reset
                </button>
            </div>
        </div>
    );
}



export default Board
  