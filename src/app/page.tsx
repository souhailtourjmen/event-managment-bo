'use client';

import { useEffect, useState } from 'react';
import DashboardTemplate from '@/components/templates/DashboardTemplate';
import AddEventForm from '@/components/organisms/AddEventForm';
import EventGrid from '@/components/organisms/EventGrid';
import ClientListModal from '@/components/organisms/ClientListModal';
import { eventService } from '@/services/eventService';
import { Event, Client, CreateEventDTO } from '@/types';

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [selectedEventClients, setSelectedEventClients] = useState<Client[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClientsLoading, setIsClientsLoading] = useState(false);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const data = await eventService.getEvents();
      // Ensure data is an array
      setEvents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch events:', error);
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleAddEvent = async (formData: CreateEventDTO) => {
    setIsActionLoading(true);
    try {
      await eventService.createEvent(formData);
      await fetchEvents();
    } catch (error) {
      console.error('Failed to create event:', error);
      alert('Erreur lors de la création de l\'évènement');
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet évènement ?')) return;
    
    try {
      await eventService.deleteEvent(id);
      setEvents(events.filter((e) => e.id !== id));
    } catch (error) {
      console.error('Failed to delete event:', error);
      alert('Erreur lors de la suppression');
    }
  };

  const handleViewClients = async (id: string) => {
    setIsModalOpen(true);
    setIsClientsLoading(true);
    try {
      const clients = await eventService.getEventClients(id);
      setSelectedEventClients(Array.isArray(clients) ? clients : []);
    } catch (error) {
      console.error('Failed to fetch clients:', error);
      setSelectedEventClients([]);
    } finally {
      setIsClientsLoading(false);
    }
  };

  return (
    <DashboardTemplate>
      <div className="space-y-10">
        <section>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-4xl font-extrabold text-text-main tracking-tight">Tableau de Bord</h2>
              <p className="text-lg text-text-placeholder mt-2">Gérez vos évènements et suivez les inscriptions en temps réel.</p>
            </div>
          </div>
          <AddEventForm onSubmit={handleAddEvent} isLoading={isActionLoading} />
        </section>

        <section>
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-text-main">Évènements à venir</h3>
            <div className="h-1 flex-grow mx-8 bg-border/20 rounded-full hidden md:block" />
          </div>
          <EventGrid
            events={events}
            isLoading={isLoading}
            onDelete={handleDeleteEvent}
            onViewClients={handleViewClients}
          />
        </section>
      </div>

      <ClientListModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        clients={selectedEventClients}
        isLoading={isClientsLoading}
      />
    </DashboardTemplate>
  );
}
