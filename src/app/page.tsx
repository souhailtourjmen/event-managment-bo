'use client';

import { useEffect, useState } from 'react';
import DashboardTemplate from '@/components/templates/DashboardTemplate';
import AddEventForm from '@/components/organisms/AddEventForm';
import EventGrid from '@/components/organisms/EventGrid';
import ClientListModal from '@/components/organisms/ClientListModal';
import { eventService } from '@/services/eventService';
import { clientServices } from '@/services/clientServices';
import { Event, Client, CreateEventDTO } from '@/types';

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [allClients, setAllClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClientsListLoading, setIsClientsListLoading] = useState(true);
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

  const fetchAllClients = async () => {
    setIsClientsListLoading(true);
    try {
      const data = await clientServices.getClients();
      setAllClients(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch clients:', error);
      setAllClients([]);
    } finally {
      setIsClientsListLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchAllClients();
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
      const clients = await clientServices.getEventClients(id);
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
      <div className="space-y-10 scroll-smooth">
        <section id="dashboard">
          <div className="flex justify-between items-center mb-8 pt-4">
            <div>
              <h2 className="text-4xl font-extrabold text-text-main tracking-tight">Tableau de Bord</h2>
              <p className="text-lg text-text-placeholder mt-2">Gérez vos évènements et suivez les inscriptions en temps réel.</p>
            </div>
          </div>
          <AddEventForm onSubmit={handleAddEvent} isLoading={isActionLoading} />
        </section>

        <section id="events" className="scroll-mt-24">
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

        <section id="clients" className="scroll-mt-24 pb-20">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-text-main">Aperçu des Clients</h3>
            <div className="h-1 flex-grow mx-8 bg-border/20 rounded-full hidden md:block" />
          </div>
          <div className="bg-surface rounded-3xl border border-border shadow-sm overflow-hidden">
            {isClientsListLoading ? (
              <div className="p-8 space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-16 bg-background/50 animate-pulse rounded-2xl"></div>
                ))}
              </div>
            ) : allClients.length === 0 ? (
              <div className="p-20 text-center text-text-placeholder">
                <p className="text-lg">Aucun client trouvé dans le système.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-background/50 border-b border-border">
                      <th className="p-5 font-bold text-text-main">Nom Complet</th>
                      <th className="p-5 font-bold text-text-main">Email</th>
                      <th className="p-5 font-bold text-text-main">Téléphone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allClients.map((client) => (
                      <tr key={client.id} className="border-b border-border/50 hover:bg-background/30 transition-all">
                        <td className="p-5 text-text-main font-semibold">{client.fullName}</td>
                        <td className="p-5 text-text-placeholder">{client.email}</td>
                        <td className="p-5 text-text-placeholder">{client.phoneNumber || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
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
