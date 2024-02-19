const express = require('express');
const router = express.Router();
const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config();

/*
  Varible for the client connection, which is used throughout the code after connection is 
  established
*/
let client;
/*
  A safegaurd variable to ensure that we have logged in before executing any code
*/
let login2 = false;

/*
  This function listen for any post request made to the server and process that post request.
  The server will listen for any user and password input and try to establish a connection.
  If success, the server will notify the client and also send back all of the data inside mongodb
  If failed, the server will notify the client and send nothing back
 */
router.post("/connect",async (req,res) =>{
  let login = true;
  const receivedData = req.body;
  console.log("Username: "+receivedData.username+" + "+receivedData.password);
  let uri = "mongodb+srv://" + receivedData.username + ":" + receivedData.password + "@mazestorage.g81b7ci.mongodb.net/?retryWrites=true&w=majority";
  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  const clientLogon = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  //try to establish a connection
  async function run() {
    try {
      
      await clientLogon.connect();
      client = clientLogon;
      login2 = true;
      let arrayList = await client.db("MazeStorage").collection("Mazes").find({}).toArray();
      return arrayList;
    } finally {
      // Ensures that the client will close when you finish/error
    }
  }

  //Run the connection code and catch any error if any
  let arrayList = await run().catch((e) => {
    login2 = false;
    login = false;
    console.log("Error connecting to MongoDB");
    //Sending data upon failure to indicate failure to the client
    res.send({data: "Error connecting to MongoDB!",
              error: e,
              login: false});
  });

  //If we were able to logged on, we will send these data instead.
  if(login){
    console.log("Successfully connected to MongoDB!");
    res.send({data: "Successfully connected to MongoDB!",
              error: null,
              login: true,
              list: arrayList
    });
    login2 = true;
  }
})

/*
  This code listen for any get request made to the signout route, signing out the current user. 
  It will return whether we have sucessfully signed out or not.
 */
router.get("/signout",async (req,res) =>{
  if(login2){
    try{ 
      //test whether we have signed out or not.
      await client.close();
      login2 = false;
      console.log("Signed out");
      res.send({data: "good",
                error: null,});
    }
    catch(e){
      //catch any error and report back to the client.
      console.log("Error signing out");
      res.send({data: "bad",
                error: e,});
      login2 = true;
    }
  }
});


/*
  This method listen for any post request that contain a object for insertion. 
  It will report back to the client upon successful insertion, or otherwise failure.
 */
router.post("/insert",async (req,res) =>{
  try{
    await client.db("MazeStorage").collection("Mazes").insertOne(req.body);
    res.send({data: "good"});
  }
  catch(e){
    console.log(e);
    res.send({data: "bad"});
  }
});

/*
  This method listen for any post request to the search route, searching for a record within the database.
  It will return the corresponding object(s) within the database upon success and nothing if fail.
  The query is generated and attached to the body by the client.
 */
router.post("/search",async (req,res) =>{
  try{
    let arrayList = await client.db("MazeStorage").collection("Mazes").find(req.body).toArray();
    res.send({data: "good",
              list: arrayList});
  }
  catch(e){
    console.log(e);
    res.send({data: "bad"});
  }
});


/*
  This method listen for any delete post request. The body of the post request will contain the object, which 
  the client want to delete. The server will then lookup the object properties within the database and delete
  the matched record. Similarly, it will return sucess or failure after the operation.
 */
router.post("/delete",async (req,res) =>{
  let deleteObj = {
    grid: req.body.grid,
    rows: req.body.rows,
    cols: req.body.cols,
    algorithm: req.body.algorithm
  };
  let deleted;
  try{
    deleted = await client.db("MazeStorage").collection("Mazes").deleteOne(deleteObj);
    res.send({data: "good",
              deleted : deleted});
  }
  catch(e){
    console.log(e);
    res.send({data: "bad"});
  }
});



module.exports =  router