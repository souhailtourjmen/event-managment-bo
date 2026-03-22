import React from 'react';
import { Event } from '../../types';
import EventCard from '../molecules/EventCard';

interface EventGridProps {
  events: Event[];
  onDelete: (id: string) => void;
  onViewClients: (id: string) => void;
  isLoading?: boolean;
}

const EventGrid: React.FC<EventGridProps> = ({ events, onDelete, onViewClients, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-64 bg-gray-100 animate-pulse rounded-xl"></div>
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <p className="text-xl font-medium">Aucun évènement trouvé</p>
        <p>Commencez par en ajouter un nouveau !</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onDelete={onDelete}
          onViewClients={onViewClients}
        />
      ))}
    </div>
  );
};

export default EventGrid;
