import Todo from "../model/todo.model.js"
export  const createTodo=async(req,res)=>{
  const todo=new Todo({
    text:req.body.text,
    complete:req.body.complete
  })
  try{
    const newTodo= await todo.save()
    res.status(201).json({message:"Todo created successfully",newTodo})
  }catch(err){
    console.log(err)
    res.status(400).json({message:"server error"})
  }
 }

 export const getTodos=async(req,res)=>{
  try{
    const todos=await Todo.find()
    res.status(201).json({message:"todo fetched successfully",todos})
  }catch(err){
    console.log(err)
    res.status(400).json({message:"error occuring in todo fetching"})
  }
 }

 export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo updated successfully", todo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error occurred while updating todo" });
  }
};


export const deleteTodo=async(req,res)=>{
  try{
    await Todo.findByIdAndDelete(req.params.id)
    res.status(201).json({message:"Todo deleted successfully",Todo})
  }
  catch(err){
    console.log(err)
    res.status(400).json({message:"Error occuring in Todo Deletion"})
  }
}