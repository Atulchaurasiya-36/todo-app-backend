import User from "../model/user.model.js"
import {z} from "zod"
import bcrypt from "bcryptjs"
import { generateTokenAndSaveInCookies } from "../jwt/token.js"
// validation code

const userSchem=z.object({
  email:z.string().email({message:"Invalid email address"}),
  username:z.string().min(3,{message:"UserName alteast 3 characters long"}),
  password:z.string().min(6,{message:"password alteast 6 characters long"})
})

export const register=async(req,res)=>{
  try{
    const{email,username,password}=req.body
    if(!email || !username || !password){
      return res.status(400).json({message:"All fields are required"})
    }
    const validation=userSchem.safeParse({email,username,password})
    if(!validation.success){
      const errorMessage=validation.error.errors.map((err)=>err.message)
      return res.status(400).json({errors:errorMessage})
    }

    const user = await User.findOne({ email });
    if(user){
      return res.status(400).json({message:"user already registered"})
    }
    const hashPassword=await bcrypt.hash(password,10)

    const newUser=new User({email,username,password:hashPassword})
    await newUser.save()
    if(newUser){
      const token=generateTokenAndSaveInCookies(newUser._id,res)
      res.status(201).json({message:"user registered successfully", newUser,token})

  }
  }catch(err){
    console.log(err)
    res.status(500).json({message:"error occuring in registering"})
  }
  
  
}
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
   const token=generateTokenAndSaveInCookies(user ._id,res)
    return res.status(200).json({ message: "User logged in successfully", user,token });

  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Problem in login" });
  }
};

export const logout=(req,res)=>{
 try{
  res.clearCookie("jwt",{
    path:"/",
  })
  return res.status(200).json({message:"user logged out successfully"})

 }catch(err){
  console.log(err)
  return res.status(500).json({message:"Error in logging out"})
 }

}
