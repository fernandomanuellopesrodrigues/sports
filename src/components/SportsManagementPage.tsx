import React from 'react';
import SportsManager from './SportsManager';

interface SportsManagementPageProps {
  sports: string[];
  onAddSport: (sport: string) => void;
  onRemoveSport: (sport: string) => void;
}

const SportsManagementPage: React.FC<SportsManagementPageProps> = ({ sports, onAddSport, onRemoveSport }) => {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Sports Management</h1>
      <SportsManager sports={sports} onAddSport={onAddSport} onRemoveSport={onRemoveSport} />
    </div>
  );
};

export default SportsManagementPage;