import React, { useState } from 'react';
import { PlusCircle, X } from 'lucide-react';

interface Team {
  id: string;
  name: string;
  sport: string;
}

interface TeamManagementPageProps {
  sports: string[];
}

const TeamManagementPage: React.FC<TeamManagementPageProps> = ({ sports }) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [newTeam, setNewTeam] = useState({ name: '', sport: '' });

  const addTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTeam.name && newTeam.sport) {
      setTeams([...teams, { ...newTeam, id: Date.now().toString() }]);
      setNewTeam({ name: '', sport: '' });
    }
  };

  const removeTeam = (id: string) => {
    setTeams(teams.filter(team => team.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Team Management</h1>
      <form onSubmit={addTeam} className="mb-8 space-y-4">
        <div>
          <label htmlFor="teamName" className="block text-sm font-medium text-gray-700">Team Name</label>
          <input
            type="text"
            id="teamName"
            value={newTeam.name}
            onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label htmlFor="teamSport" className="block text-sm font-medium text-gray-700">Sport</label>
          <select
            id="teamSport"
            value={newTeam.sport}
            onChange={(e) => setNewTeam({ ...newTeam, sport: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          >
            <option value="">Select a sport</option>
            {sports.map((sport) => (
              <option key={sport} value={sport}>{sport}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusCircle className="mr-2" size={16} />
          Add Team
        </button>
      </form>
      <div className="space-y-4">
        {sports.map((sport) => (
          <div key={sport} className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">{sport}</h3>
            </div>
            <ul className="divide-y divide-gray-200">
              {teams.filter(team => team.sport === sport).map((team) => (
                <li key={team.id} className="px-4 py-4 sm:px-6 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{team.name}</span>
                  <button
                    onClick={() => removeTeam(team.id)}
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                  >
                    <X size={20} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamManagementPage;