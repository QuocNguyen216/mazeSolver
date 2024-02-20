# MazeSolver
MazeSolver is a web application designed to generate, solve, and store complex mazes. MazeSolver is a sophisticated algorithmic core that utilizes Breadth-First Search (BFS) for maze generation, randomly selecting the next node to ensure a randomized maze upon each refresh. Therefore, each generated maze has a unique solution with no inaccessible areas, providing a challenging and engaging experience. <br>

Once a maze is generated, users have the option to solve it using one of two distinct algorithms: Dijkstra's algorithm or Depth-First Search (DFS). Dijkstra's algorithm is renowned for finding the shortest path in a weighted graph, making it ideal for solving mazes with varied path costs. On the other hand, DFS offers a more straightforward approach, exploring as far as possible along each branch before backtracking, which is fascinating to observe in mazes with many branches.<br>

A unique feature of MazeMaster is its integration with MongoDB, a powerful NoSQL database. This integration allows for the storage of mazes in the cloud, enabling users to save their generated mazes and their solutions. Users can search through a vast library of previously solved mazes, filtering by size, complexity, and the algorithm used for solving. This database functionality not only enhances user engagement by allowing them to revisit their past challenges but also facilitates a community aspect where users can share and attempt mazes created by others.<br>

MazeMaster's intuitive web interface is user-friendly, catering to maze enthusiasts and algorithm hobbyists. The interface visually represents the maze-solving process in real time, allowing users to see the intricacies of each algorithm's approach to maze-solving. This feature is particularly educational for those interested in learning about graph theory and pathfinding algorithms.<br>

# Demo of the algorithms

In the context of a maze, Dijkstra's algorithm treats the edge between the current node to the other neighbor nodes as weighting 1 unit, which helps the algorithm to choose and calculate the next shortest path to a new node between iterations. The algorithm explores all possible routes from the starting point, updating the shortest distance to each node. By prioritizing nodes with the lowest cumulative distance from the start and ensuring each node is visited only once, Dijkstra's algorithm can identify the shortest path to the endpoint. <br>
<img src="https://github.com/QuocNguyen216/mazeSolver/blob/master/GIFstorage/dijkstra.gif" width="300">
<br>To solve the maze, DFS starts at the entrance and explores along a path until it reaches a dead end or the maze's exit. If a dead end is encountered, the algorithm backtracks and tries a different path. This process continues until the endpoint is found. It's worth noting that while DFS can solve a maze, it does not necessarily find the shortest path.<br>
<img src="https://github.com/QuocNguyen216/mazeSolver/blob/master/GIFstorage/dfs.gif" width="300">

# Demo of the database features
User authentication when logging in: <br>
<img src="https://github.com/QuocNguyen216/mazeSolver/blob/master/GIFstorage/login.gif" width="300"> <br>
As shown in the demo, you can also log out of your database using the signout option. Logging in will also display all of your currently saved boards within the database below. 

After successfully logging on, you can then have the option to save the current solved board onto the database. As you press save, the newly added board will be displayed below your current query (if your current query options match the saved board): <br>
<img src="https://github.com/QuocNguyen216/mazeSolver/blob/master/GIFstorage/savingBoard.gif" width="300"> <br>

The list below shows the current queried board. You can remove any of the boards by using the corresponding delete button, which is on the left corner above each board. <br>
<img src="https://github.com/QuocNguyen216/mazeSolver/blob/master/GIFstorage/delete.gif" width="300"> <br>


<img src="https://github.com/QuocNguyen216/mazeSolver/blob/master/GIFstorage/searchSize.gif" width="300"> <br>

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh




