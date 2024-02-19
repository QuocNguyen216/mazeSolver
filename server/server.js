const express = require("express");
const cors = require('cors');
const app = express();
const mongoRoute = require("./routes/mongo");

/*
  This is a middleware that allow request from our server to go through.
  Please change the server port as needed if your react server run on a different port.
  The provided code will default the server to the port 3000 in react
*/ 
app.use(cors({
    origin: 'http://localhost:3000' 
  }));

//This is a middleware that parse our request body, ensuring that we are receiving a JSON object
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*This is to get our enviroment variables */
require("dotenv").config();

/*This is just to redirect our route to our mongodb code */
app.use("/mongo", mongoRoute);

/*We will be running on port 5000, so change the process.env.port to your refer port */
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
