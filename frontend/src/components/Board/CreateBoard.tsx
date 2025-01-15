import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateBoard = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:5001/api/boards',
                { title, description },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            navigate(`/boards/${response.data.id}`);
        } catch (error) {
            console.error('Error creating board:', error);
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-background'>
            <form onSubmit={handleSubmit} className='bg-white p-8 rounded-lg shadow-md w-96'>
                <h2 className='text-2xl font-bold mb-6 text-center'>Create A New Board</h2>
                <div className='mb-5'>
                    <input
                        type='text'
                        placeholder='Board Title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='w-full p-2 border rounded'
                        required
                    />
                </div>
                <div className='mb-6'>
                    <textarea
                        placeholder='Description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className='w-full p-2 border rounded h-24'
                    />
                </div>
                <button
                    type='submit'
                    className='w-full bg-primary text-white p-2 rounded hover:bg-blue-600'
                >
                    Create Board
                </button>
            </form>
        </div>
    );
};

export default CreateBoard;