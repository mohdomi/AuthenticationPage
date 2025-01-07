const express = require("express");
const app  = express();
const bodyParser = require("body-parser");
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");

app.use(bodyParser.json());

app.use("/admin" , adminRouter);
app.use("/user" , userRouter);

app.listen(3000 , ()=>{
    console.log("Website is live on port 3000");
})
