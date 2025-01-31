import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
require("dotenv").config()

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

async function loginUser(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Please provide both email and password" });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User doesn't exist. Try signing up" });
      return; 
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(400).json({ message: "Invalid password" });
      return; 
    }

    const token = jwt.sign({ userId: user._id, username: user.name }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({
      message: "Login successful",
      token,
    });
    return

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
    return
  }
}

async function signupUser(req: Request, res: Response) {
  try {
    const { name, email, password, confirmPassword, country } = req.body;

    if (!email || !password || !name || !confirmPassword || !country) {
      await res.status(400).json({ error: "All fields are required" });
      return; 
    }

    if (password !== confirmPassword) {
      await res.status(400).json({ error: "Passwords do not match" });
      return; 
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      await res.status(400).json({ error: "User already exists. Please log in." });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      country,
    });

    await newUser.save();

    await res.status(201).json({
      message: "User registered successfully",
      user: { name, email, country },
    });

  } catch (e) {
    console.error("Signup error:", e);
    await res.status(500).json({ error: "Signup failed" });
  }
}
async function getUser(req:Request, res:Response) {
    const user = await User.findById(req.body.user_id)
    if(!user){
      res.status(404).json({"message": "No user with that ID exists."})
      return
    }
    res.status(200).json({user})
    return;
}
async function updateUser(req: Request, res: Response) {
  try {
    const { name, password, email} = req.body;
    const userId = req.body.user_id
 
    if (!name || !password || !email) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    
    const hashedPassword = await bcrypt.hash(password, 10); 

    const updatedUser = await User.findByIdAndUpdate(userId, {
      name,
      password: hashedPassword,
      email,
    }, { new: true });
    if (!updatedUser) {
      res.status(404).json({ error: 'User not found' });
      return
    }

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
async function deleteUser(req: Request, res: Response) {
 
  try {
    const userId = req.body.user_id;

   
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      res.status(404).json({ error: 'User not found' });
      return
    }
    res.status(200).json({ message: 'User deleted successfully' });
    return
  } catch (e:any) {
    console.error('Error deleting user:', e);
    res.status(500).json({ error: 'Internal server error' });
    return
  }
}
async function dummy(req: Request, res: Response): Promise<void> {
  await res.status(200).json({ message: "Server is online" });
}

export { loginUser, signupUser, getUser, dummy, updateUser, deleteUser};
