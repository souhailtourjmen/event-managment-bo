import apiClient from './apiClient';
import { Event, CreateEventDTO, Client } from '../types';

export const eventService = {
    getEvents: async (): Promise<Event[]> => {
        const response = await apiClient.get('/api/v1/events');
        return response.data.data;
    },

    getEventById: async (id: string): Promise<Event> => {
        const response = await apiClient.get(`/api/v1/events/${id}`);
        return response.data.data;
    },

    createEvent: async (data: CreateEventDTO): Promise<Event> => {
        const response = await apiClient.post('/api/v1/events', data);
        return response.data.data;
    },

    deleteEvent: async (id: string): Promise<void> => {
        await apiClient.delete(`/api/v1/events/${id}`);
    },

    getEventClients: async (id: string): Promise<Client[]> => {
        const response = await apiClient.get(`/api/v1/events/${id}/clients`);
        return response.data.data;
    },
};
