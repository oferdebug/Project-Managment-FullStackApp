import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer', '');

        if (!token) {
            throw new Error();
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        (req as any).user = decoded;
        
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
}