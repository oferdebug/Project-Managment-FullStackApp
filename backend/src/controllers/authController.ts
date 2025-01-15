import { Request, Response } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const RegisterNewUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        // Check If User Already Exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash The Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create New User
        const NewUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await NewUser.save();

        // Generate JWT Token
        const token = jwt.sign(
            { userId: NewUser._id },
            process.env.JWT_SECRET!,
            { expiresIn: '24h' }
        );

        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const LoginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        //Find User By
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check If The Password Is Correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET!,
            { expiresIn: '24h' }
        );

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

