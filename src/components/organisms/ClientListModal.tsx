import React from 'react';
import { Client } from '../../types';
import Button from '../atoms/Button';
import { X, User, Mail, Phone } from 'lucide-react';

interface ClientListModalProps {
  isOpen: boolean;
  onClose: () => void;
  clients: Client[];
  isLoading?: boolean;
}

const ClientListModal: React.FC<ClientListModalProps> = ({ isOpen, onClose, clients, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md transition-all duration-300">
      <div className="bg-surface dark:bg-zinc-900/90 dark:backdrop-blur-2xl rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl border border-border overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="flex items-center justify-between p-8 border-b border-border">
          <h3 className="text-2xl font-bold text-text-main">Clients Inscrits</h3>
          <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full">
            <X size={24} />
          </Button>
        </div>

        <div className="flex-grow overflow-y-auto p-8">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 bg-background/50 animate-pulse rounded-2xl"></div>
              ))}
            </div>
          ) : clients.length === 0 ? (
            <div className="text-center py-20 text-text-placeholder">
              <p className="text-lg">Aucun client inscrit pour cet évènement.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {clients.map((client) => (
                <div key={client.id} className="flex items-center p-5 rounded-2xl border border-border/50 hover:bg-background/30 transition-all group">
                  <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mr-5 group-hover:scale-110 transition-transform">
                    <User size={24} />
                  </div>
                  <div className="flex-grow">
                    <p className="font-bold text-text-main text-lg">{client.fullName}</p>
                    <div className="flex flex-wrap gap-x-6 gap-y-1 mt-1 text-sm text-text-placeholder">
                      <span className="flex items-center">
                        <Mail size={16} className="mr-2 text-primary/50" />
                        {client.email}
                      </span>
                      {client.phoneNumber && (
                        <span className="flex items-center">
                          <Phone size={16} className="mr-2 text-primary/50" />
                          {client.phoneNumber}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-8 border-t border-border bg-background/50 flex justify-end">
          <Button onClick={onClose} size="lg" className="px-10">Fermer</Button>
        </div>
      </div>
    </div>
  );
};

export default ClientListModal;
