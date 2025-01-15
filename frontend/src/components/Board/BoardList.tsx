import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { List, Card } from '../../types/Board';

interface BoardListProps {
    lists: List[];
    onDragEnd: (result: DropResult) => void;
}

const BoardList: React.FC<BoardListProps> = ({ lists, onDragEnd }) => {
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex gap-4 overflow-x-auto p-4">
                {lists.map((list, index) => (
                    <Droppable key={list.id} droppableId={list.id}>
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="w-72 bg-gray-100 rounded-lg p-3"
                            >
                                <h3 className="font-bold mb-2">{list.title}</h3>
                                {list.cards.map((card, cardIndex) => (
                                    <Draggable
                                        key={card.id}
                                        draggableId={card.id}
                                        index={cardIndex}
                                    >
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="bg-white p-3 rounded mb-2 shadow"
                                            >
                                                {card.title}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                ))}
            </div>
        </DragDropContext>
    );
};

export default BoardList;
