const express = require("express");


//it will attach all values in env file to process object
require("dotenv").config();

//express ap
const app = express();

//router
const workoutRouter = require("./routes/record");

//middleware
app.use(express.json());

//middleware
app.use((req,res, next) =>{
    console.log(req.path, req.method);
    next();
})


//listen for requests
app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT} fuck off`);
});


app.use('/api/workouts',workoutRouter);

// // routes 
// app.get('/', (req,res)=>{
//     res.json({msg:"Welcome to the app"});
// });
