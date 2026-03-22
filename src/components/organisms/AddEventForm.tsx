import React, { useState } from 'react';
import { CreateEventDTO } from '../../types';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';
import { Plus } from 'lucide-react';

interface AddEventFormProps {
  onSubmit: (data: CreateEventDTO) => Promise<void>;
  isLoading?: boolean;
}

const AddEventForm: React.FC<AddEventFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<CreateEventDTO>({
    title: '',
    description: '',
    date: '',
    location: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    setFormData({ title: '', description: '', date: '', location: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-8 bg-surface dark:bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-border shadow-sm transition-all hover:shadow-md">
      <h3 className="text-xl font-bold flex items-center text-primary">
        <Plus className="mr-2" size={24} />
        Nouvel Évènement
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Titre"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Ex: Conférence Tech"
        />
        <FormField
          label="Lieu"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          placeholder="Ex: Paris"
        />
        <FormField
          label="Date"
          name="date"
          type="datetime-local"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <FormField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          placeholder="Description de l'évènement"
        />
      </div>
      <div className="flex justify-end">
        <Button type="submit" isLoading={isLoading} className="w-full md:w-auto">
          Créer l'évènement
        </Button>
      </div>
    </form>
  );
};

export default AddEventForm;
