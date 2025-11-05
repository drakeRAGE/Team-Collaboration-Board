import React from 'react';

const BoardList = ({ boards = [], activeBoard, onBoardSelect, onCreateBoard, onDeleteBoard }) => {
    return (
        <div className="sidebar bg-gray-50 p-4 w-64 border-r border-gray-200">
            <h2 className="text-lg font-semibold mb-2">Boards</h2>
            <button
                onClick={() => onCreateBoard()}
                className="mb-4 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                New Board
            </button>
            {Array.isArray(boards) && boards.map(board => (
                <div
                    key={board._id}
                    className={`board-item ${activeBoard === board._id ? 'active' : ''} flex items-center justify-between p-2 rounded hover:bg-gray-100`}
                >
                    <span
                        onClick={() => onBoardSelect(board._id)}
                        className="cursor-pointer text-sm text-gray-700"
                    >
                        {board.name}
                    </span>
                    <button
                        onClick={() => onDeleteBoard(board._id)}
                        className="ml-2 text-sm text-red-600 hover:text-red-800"
                    >
                        Delete
                    </button>
                </div>
            ))}

        </div>
    );
};

export default BoardList;