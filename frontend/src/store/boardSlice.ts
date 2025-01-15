import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Board } from '../types/Board';

interface BoardState {
    boards: Board[];
    currentBoard: Board | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: BoardState = {
    boards: [],
    currentBoard: null,
    isLoading: false,
    error: null
};

