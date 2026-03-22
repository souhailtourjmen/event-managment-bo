export interface Client {
    id: string;
    fullName: string;
    email: string;
    phoneNumber?: string;
    createdAt?: string;
}

export interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    clients?: Client[];
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateEventDTO {
    title: string;
    description: string;
    date: string;
    location: string;
}

export interface SignupDTO {
    fullName: string;
    email: string;
    phoneNumber: string;
    password?: string;
}
