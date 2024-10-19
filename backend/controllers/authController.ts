import { Request, Response } from 'express';
import User from '../models/User'

async function loginUser(req: Request, res: Response): Promise<void> {
  try {

    res.status(200).send("Login successful");
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
}

async function signupUser(req: Request, res: Response): Promise<void> {

  try {
    const { name, email, password, confirmPassword, country } = req.body;
    console.log(name, email, password, confirmPassword, country)
    if (!email) {
      await res.status(400).json({ error: "No email provided" });
    }

    if (password !== confirmPassword) {
      await res.status(400).json({ error: "Passwords do not match" });
    }
    const newUser = new User({
      name, email, password, country
    })
    await newUser.save()

    res.status(201).json({
      message: "User registered successfully",
      user: { name, email, country },
    });
  } catch (error) {
    res.status(500).json({ error: "Signup failed" });
  }
}

async function dummy(req: Request, res: Response): Promise<void> {
  await res.status(200).json({ "message": "Server is online" })
}
export { loginUser, signupUser, dummy };
