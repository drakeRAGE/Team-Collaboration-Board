import express from 'express';

import { getAllBoards, addNewBoard } from '../controllers/board.controller.js';

const router = express.Router();

// Board Routi APIs
router.get('/boards', getAllBoards);
router.post('/boards', addNewBoard);

export default router;