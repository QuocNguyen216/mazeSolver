import styles from "./Database.module.css";


/* This component handle generating a small version of the board for display purpose within our database */
function SmallBoard(props) {

  return (
    <div style={{
        minWidth: (props.db.rows*20 + 100) + "px",
        minHeight: (props.db.cols*20 + 100) + "px",            
    }} className={styles.SmallBoard}>
        <p>Maze size: {props.db.rows} x {props.db.cols}</p>
        <p>Algorithm: {props.db.algorithm === "dfs" ? "Depth First Search": "Dijkstra's SP"}</p>
        <div className={styles.GridtraySmall}>
            {props.db.grid.map((row, i) => (
                <div key={i}>
                    {row.map((col, j) => (
                        <button key={j} className = {styles.cell} style = {{
                            borderTop: props.db.grid[i][j].borderTop,
                            borderBottom: props.db.grid[i][j].borderBottom,
                            borderLeft: props.db.grid[i][j].borderLeft,
                            borderRight: props.db.grid[i][j].borderRight,
                            backgroundColor: props.db.grid[i][j].backgroundColor,                       
                        }}>
                            
                        </button>
                    ))}
                </div>
            ))}
        </div>
    </div>
  );
}

export default SmallBoard;