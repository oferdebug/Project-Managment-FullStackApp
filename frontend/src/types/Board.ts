export interface Card {
    id: string;
    title: string;
    description?: string;
    dueDate?: Date;
    assignees: string[];
}

export interface List {
    id: string;
    title: string;
    cards: Card[];
}

export interface Board {
    id: string;
    title: string;
    description?: string;
    owner: string;
    members: string[];
    lists: List[];
    createdAt: Date;
    updatedAt: Date;
}