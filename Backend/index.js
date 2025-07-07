import express from "express"
import mongoose from "mongoose"
import todoRoute from "../Backend/routes/todo.route.js"
import userRoute from "../Backend/routes/user.route.js"
const app=express();
import dotenv from "dotenv"
dotenv.config();
const PORT=process.env.port|| 4001
const DB_URI=process.env.MONGODB_URI;

// database connection code 1:15

try{
  mongoose.connect(DB_URI)
  console.log("connected to mongoDB")

}catch(Err){
  console.log(Err)

}

app.use(express.json())

app.use("/todo",todoRoute)
app.use("/user",userRoute)


app.get("/",(req,res)=>{
  res.send("hello world")

})

app.listen(PORT,()=>{
  console.log("server is running on port no 3000")
})