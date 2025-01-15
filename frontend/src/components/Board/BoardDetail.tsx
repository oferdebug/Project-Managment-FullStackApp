import React, { useState } from 'react';
import { Board, List } from '../../types/Board';
import BoardList from './BoardList';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

interface BoardDEtailProps{
    board: Board;
    onUpdateBoard: (board: Board) => void;
}

const BoardDetail: React.FC<BoardDEtailProps> = ({ board, onUpdateBoard }) => {
    const [lists, setLists] = useState<List[]>(board.lists);

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const { source, destination } = result;
        const newLists = Array.from(lists);

        // Moving Between Lists
        if (source.droppableId !== destination.droppableId) {
            const sourceList = newLists.find(list => list.id === source.droppableId);
            const destinationList = newLists.find(list => list.id === destination.droppableId);

            if (sourceList && destinationList) {
                const [movedCard] = sourceList.cards.splice(source.index, 1);
                destinationList.cards.splice(destination.index, 0, movedCard);
            }
        }

        // Moving within The Same List
        else {
            const list = newLists.find(list => list.id === source.droppableId);
            if (list) {
                const [movedCard] = list.cards.splice(source.index);
                list.cards.splice(destination.index, 0, movedCard);
            }
        }

        setLists(newLists);
        onUpdateBoard({ ...board, lists: newLists });
    };

    return (
        <div className='p-4'>
            <div className='mb-6'>
                <h1 className='text-2xl font-bold'>{board.title}</h1>
                <p className='text-gray-500'>{board.description}</p>
            </div>
            <BoardList lists={lists} onDragEnd={handleDragEnd} />
        </div>
    );
};

export default BoardDetail;