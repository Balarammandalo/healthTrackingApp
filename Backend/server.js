const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config();     
connectDB();         

const app = express();
app.use(express.json());

app.use(cors());  

app.get("/", (req, res) => {
    res.send("APp is running success");
})

app.use("/user", require("./routes/userRoutes"));

app.use("/auth", require("./routes/planRoutes"));


app.listen(5000, () => {
  console.log("Server running on port 5000");
});