import mongoose from 'mongoose';

const boardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    lists: [{
        title: String,
        cards: [{
            title: String,
            description: String,
            dueDate: Date,
            assignees: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }]
        }]
    }]
}, {
    timestamps: true
}); 

export const Board = mongoose.model('Board', boardSchema); 