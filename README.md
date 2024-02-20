# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# MazeSolver
MazeSolver is a web application designed to generate, solve, and store complex mazes. MazeSolver is a sophisticated algorithmic core that utilizes Breadth-First Search (BFS) for maze generation, randomly select the next node to ensure a randomized maze upon each refresh. Therefore, each generated maze has a unique solution with no inaccessible areas, providing a challenging and engaging experience. <br>

Once a maze is generated, users have the option to solve it using one of two distinct algorithms: Dijkstra's algorithm or Depth-First Search (DFS). Dijkstra's algorithm is renowned for finding the shortest path in a weighted graph, making it ideal for solving mazes with varied path costs. On the other hand, DFS offers a more straightforward approach, exploring as far as possible along each branch before backtracking, which is fascinating to observe in mazes with many branches.<br>

A unique feature of MazeMaster is its integration with MongoDB, a powerful NoSQL database. This integration allows for the storage of mazes in the cloud, enabling users to save their generated mazes and their solutions. Users can search through a vast library of previously solved mazes, filtering by size, complexity, and the algorithm used for solving. This database functionality not only enhances user engagement by allowing them to revisit their past challenges but also facilitates a community aspect where users can share and attempt mazes created by others.<br>

MazeMaster's intuitive web interface is user-friendly, catering to maze enthusiasts and algorithm hobbyists. The interface visually represents the maze-solving process in real time, allowing users to see the intricacies of each algorithm's approach to maze-solving. This feature is particularly educational for those interested in learning about graph theory and pathfinding algorithms.<br>

# Demo of the algorithms

Djiktra:<br>
{<img src="[URL_OF_YOUR_GIF](https://github.com/QuocNguyen216/mazeSolver/blob/master/GIFstorage/dfs.gif)https://github.com/QuocNguyen216/mazeSolver/blob/master/GIFstorage/dfs.gif" width="300" height="200">}





