import jwt from "jsonwebtoken";
import express from "express";
import { authenticateJwt, secretKey } from "../middleware/index";
import { User } from "../db";
const router = express.Router();
import { z } from "zod";

const signUpInput = z.object({
    username: z.string().min(10).max(50),
    password: z.string().min(6).max(15)
})

type SignUpParams = z.infer<typeof signUpInput>; // we will be figure out a way to send it to the frontend

router.post('/signup', async (req, res) => {
    const parsedInput = signUpInput.safeParse(req.body);
    if (!parsedInput.success) {
        return res.status(411).json({
            error: parsedInput.error
        })
    }
    const username = parsedInput.data.username;
    const password = parsedInput.data.password;

    const user = await User.findOne({ username });
    if (user) {
        res.status(403).json({ message: 'User already exists' });
    } else {
        const newUser = new User({ username, password });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, secretKey, { expiresIn: '1h' });
        res.json({ message: 'User created successfully', token });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
        const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });
        res.json({ message: 'Logged in successfully', token });
    } else {
        res.status(403).json({ message: 'Invalid username or password' });
    }
});

router.get('/me', authenticateJwt, async (req, res) => {
    const userId = req.headers['userId'];
    const user = await User.findOne({ _id: userId });
    if (user) {
        res.json({ username: user.username });
    } else {
        res.status(403).json({ message: 'User not logged in' });
    }
});


export default router;