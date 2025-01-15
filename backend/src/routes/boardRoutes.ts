import express from 'express';
import { createBoard, getBoards } from '../controllers/boardController';
import { auth } from '../middleware/auth';

const router = express.Router();

router.post('/', auth, createBoard);
router.get('/', auth, getBoards);

export default router; 