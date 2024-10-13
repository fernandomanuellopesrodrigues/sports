import React, { useState, useEffect } from 'react';
import { PlusCircle, X } from 'lucide-react';

interface SportsManagerProps {
  sports: string[];
  onAddSport: (sport: string) => void;
  onRemoveSport: (sport: string) => void;
}

const SportsManager: React.FC<SportsManagerProps> = ({ sports, onAddSport, onRemoveSport }) => {
  const [newSport, setNewSport] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSport.trim()) {
      onAddSport(newSport.trim());
      setNewSport('');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Sports</h2>
      <form onSubmit={handleSubmit} className="mb-4 flex">
        <input
          type="text"
          value={newSport}
          onChange={(e) => setNewSport(e.target.value)}
          placeholder="Enter new sport"
          className="flex-grow mr-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <PlusCircle size={20} />
        </button>
      </form>
      <ul className="space-y-2">
        {sports.map((sport) => (
          <li key={sport} className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-md">
            <span>{sport}</span>
            <button
              onClick={() => onRemoveSport(sport)}
              className="text-red-500 hover:text-red-700 focus:outline-none"
            >
              <X size={20} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SportsManager;