const express = require("express");
const cors = require('cors');
const app = express();
const mongoRoute = require("./routes/mongo");
app.use(cors({
    origin: 'http://localhost:5173' // or your React app's origin
  }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();


app.use("/mongo", mongoRoute);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
