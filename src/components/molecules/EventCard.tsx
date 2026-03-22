import React from 'react';
import { Event } from '../../types';
import Card, { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../atoms/Card';
import Button from '../atoms/Button';
import { Calendar, MapPin, Trash2, Users } from 'lucide-react';
import { format } from 'date-fns';

interface EventCardProps {
  event: Event;
  onDelete: (id: string) => void;
  onViewClients: (id: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onDelete, onViewClients }) => {
  const formattedDate = format(new Date(event.date), 'PPP');

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg line-clamp-1">{event.title}</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
            onClick={() => onDelete(event.id)}
          >
            <Trash2 size={16} />
          </Button>
        </div>
        <CardDescription className="line-clamp-2">{event.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        <div className="flex items-center text-sm text-text-placeholder">
          <Calendar size={16} className="mr-2 text-primary" />
          {formattedDate}
        </div>
        <div className="flex items-center text-sm text-text-placeholder">
          <MapPin size={16} className="mr-2 text-primary" />
          {event.location}
        </div>
      </CardContent>
      <CardFooter className="border-t border-border pt-4 mt-auto">
        <Button
          variant="secondary"
          className="w-full flex items-center justify-center font-bold"
          onClick={() => onViewClients(event.id)}
        >
          <Users size={16} className="mr-2" />
          Voir les inscrits
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
