import { Request, Response } from 'express';
import { Board } from '../models/Board';

// Create a new board
export const createBoard = async (req: Request, res: Response) => {
    try {
        const { title, description } = req.body;
        const board = new Board({
            title,
            description,
            owner: (req as any).user.userId,
            members: [(req as any).user.userId]
        });
        await board.save();
        res.status(201).json(board);
    } catch (error) {
        res.status(500).json({ message: 'Error creating board' });
    }
};

// Get all boards for a user
export const getBoards = async (req: Request, res: Response) => {
    try {
        const boards = await Board.find({
            members: (req as any).user.userId
        });
        res.json(boards);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching boards' });
    }
}; 