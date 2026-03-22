import apiClient from './apiClient';
import { Client } from '../types';

export const clientServices = {
    getClients: async (): Promise<Client[]> => {
        const response = await apiClient.get('/api/v1/clients');
        return response.data.data;
    },

    getEventClients: async (eventId: string): Promise<Client[]> => {
        const response = await apiClient.get(`/api/v1/events/${eventId}/clients`);
        return response.data.data;
    },
};
