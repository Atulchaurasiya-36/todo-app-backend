import mongoose from "mongoose";

const TodoSchema=new mongoose.Schema({
  text:{
    type:String,
    require:true
  },
  complete:{
    type:Boolean,
    required:true

  }
})
const Todo=mongoose.model("Todo",TodoSchema)
export default Todo