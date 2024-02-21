# MazeSolver (Overview)
MazeSolver is a web application designed to generate, solve, and store mazes. MazeSolver utilizes Breadth-First Search (BFS) for maze generation, randomly selecting the next node to ensure a randomized maze upon each refresh. Therefore, each generated maze has a unique solution with no inaccessible areas, providing a challenging and engaging experience. <br>

Once a maze is generated, users have the option to solve it using one of two distinct algorithms: Dijkstra's algorithm or Depth-First Search (DFS). Dijkstra's algorithm is renowned for finding the shortest path in a weighted graph, making it ideal for solving mazes. On the other hand, DFS offers a more straightforward approach, exploring each branch as far as possible before backtracking, which is fascinating to observe in mazes with many branches.<br>

A unique feature of MazeSolver is its integration with MongoDB, a powerful NoSQL database. The database allows the user to store mazes in the cloud, allowing users to save their generated mazes and solutions. Users can query for previously solved mazes, filtering by size, and the algorithm used for solving. This database functionality allows them to revisit their past challenges and share mazes created by others.MazeSolver's intuitive web interface is user-friendly, catering to maze enthusiasts and algorithm hobbyists. This application is particularly educational for those interested in learning about graph theory and pathfinding algorithms.<br>

# Demo of the algorithms

In the context of a maze, Dijkstra's algorithm treats the edge between the current node to the other neighbor nodes as weighting 1 unit, which helps the algorithm to choose and calculate the next shortest path to a new node between iterations. The algorithm explores all possible routes from the starting point, updating the shortest distance to each node. By prioritizing nodes with the lowest cumulative distance from the start and ensuring each node is visited only once, Dijkstra's algorithm can identify the shortest path to the endpoint. <br>
<img src="https://github.com/QuocNguyen216/mazeSolver/blob/master/GIFstorage/dijkstra.gif" width="300">
<br>To solve the maze, DFS starts at the entrance and explores along a path until it reaches a dead end or the maze's exit. If a dead end is encountered, the algorithm backtracks and tries a different path. This process continues until the endpoint is found. It's worth noting that while DFS can solve a maze, it does not necessarily find the shortest path.<br>
<img src="https://github.com/QuocNguyen216/mazeSolver/blob/master/GIFstorage/dfs.gif" width="300">

# Demo of the database features
User authentication when logging in: <br>
<img src="https://github.com/QuocNguyen216/mazeSolver/blob/master/GIFstorage/login.gif" width="500"> <br>
As shown in the demo, you can also log out of your database using the signout option. Logging in will also display all of your currently saved boards within the database below. 

After successfully logging on, you can then have the option to save the current solved board onto the database. As you press save, the newly added board will be displayed below your current query (if your current query options match the saved board): <br>
<img src="https://github.com/QuocNguyen216/mazeSolver/blob/master/GIFstorage/savingBoard.gif" width="500"> <br>

The list below shows the current queried board. You can remove any of the boards by using the corresponding delete button, which is on the left corner above each board. <br>
<img src="https://github.com/QuocNguyen216/mazeSolver/blob/master/GIFstorage/deleteBoard.gif" width="500"> <br>

Within the database features, you can also search for a particular maze size within the data by using the search icon and inputting the sizes. By default, the size of 0 means that you don't want to use that attribute within your search. For example, searching for all records that have a height of 5 will be 5x0. Here is a demo of a search using maze size:<br>
<img src="https://github.com/QuocNguyen216/mazeSolver/blob/master/GIFstorage/searchSize.gif" width="500"> <br>

To search for a particular algorithm, you can select the algorithm using the search prompt:<br>
<img src="https://github.com/QuocNguyen216/mazeSolver/blob/master/GIFstorage/searchDijkstra.gif" width="500"> <img src="https://github.com/QuocNguyen216/mazeSolver/blob/master/GIFstorage/searchDFS.gif" width="500"><br>

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh




