const express = require('express');
const router = express.Router();
const { MongoClient, ServerApiVersion } = require('mongodb');

let client;
let login2 = false;

router.post("/connect",async (req,res) =>{
  let login = true;
  const receivedData = req.body;
  console.log('Received data:', receivedData.username, receivedData.password);
  let uri = "mongodb+srv://" + receivedData.username + ":" + receivedData.password + "@mazestorage.g81b7ci.mongodb.net/?retryWrites=true&w=majority";
  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  const clientLogon = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
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
  let arrayList = await run().catch((e) => {
    login2 = false;
    login = false;
    console.log("Error connecting to MongoDB");
    res.send({data: "Error connecting to MongoDB!",
              error: e,
              login: false});
  });
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

router.get("/signout",async (req,res) =>{
  //console.log(client);
  console.log("Signing out...");
  if(login2){
    try{ 
      await client.close();
      login2 = false;
      console.log("Signed out");
      res.send({data: "good",
                error: null,});
    }
    catch(e){
      console.log("Error signing out");
      res.send({data: "bad",
                error: e,});
      login2 = true;
    }
  }
});

router.post("/insert",async (req,res) =>{
  //console.log(req.body);
  try{
    await client.db("MazeStorage").collection("Mazes").insertOne(req.body);
    res.send({data: "good"});
  }
  catch(e){
    console.log(e);
    res.send({data: "bad"});
  }
});

router.post("/search",async (req,res) =>{
  //console.log(req.body);
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