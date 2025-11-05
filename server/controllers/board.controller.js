import Board from '../models/board.model.js';
export async function getAllBoards(req, res) {
    try {
        const boards = await Board.find();
        res.json(boards);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function addNewBoard(req, res) {
    try {
        const board = new Board(req.body);
        await board.save();
        res.status(201).json(board);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
