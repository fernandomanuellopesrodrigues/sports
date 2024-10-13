import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Bet } from './types';
import BetForm from './components/BetForm';
import BetList from './components/BetList';
import SportsManagementPage from './components/SportsManagementPage';
import TeamManagementPage from './components/TeamManagementPage';
import { TrendingUp, ListFilter, Home, Settings, Users } from 'lucide-react';

const App: React.FC = () => {
  const [bets, setBets] = useState<Bet[]>([]);
  const [editingBet, setEditingBet] = useState<Bet | null>(null);
  const [sports, setSports] = useState<string[]>([]);

  useEffect(() => {
    const storedSports = localStorage.getItem('sports');
    if (storedSports) {
      setSports(JSON.parse(storedSports));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('sports', JSON.stringify(sports));
  }, [sports]);

  const addBet = (newBet: Omit<Bet, 'id'>) => {
    const bet: Bet = { ...newBet, id: Date.now().toString() };
    setBets([...bets, bet]);
  };

  const updateBet = (updatedBet: Bet) => {
    setBets(bets.map((bet) => (bet.id === updatedBet.id ? updatedBet : bet)));
    setEditingBet(null);
  };

  const deleteBet = (id: string) => {
    setBets(bets.filter((bet) => bet.id !== id));
  };

  const startEditing = (bet: Bet) => {
    setEditingBet(bet);
  };

  const cancelEditing = () => {
    setEditingBet(null);
  };

  const addSport = (sport: string) => {
    if (!sports.includes(sport)) {
      setSports([...sports, sport]);
    }
  };

  const removeSport = (sport: string) => {
    setSports(sports.filter((s) => s !== sport));
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-5">
                  <div className="h-14 w-14 bg-cyan-500 rounded-full flex items-center justify-center">
                    <TrendingUp size={24} color="white" />
                  </div>
                  <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                    <h2 className="leading-relaxed">Sports Betting Stats</h2>
                    <p className="text-sm text-gray-500 font-normal leading-relaxed">Manage your bets and track your performance</p>
                  </div>
                </div>
              </div>
              <nav className="mb-8">
                <ul className="flex space-x-4">
                  <li>
                    <Link to="/" className="flex items-center text-blue-500 hover:text-blue-600">
                      <Home size={20} className="mr-1" />
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/sports" className="flex items-center text-blue-500 hover:text-blue-600">
                      <Settings size={20} className="mr-1" />
                      Manage Sports
                    </Link>
                  </li>
                  <li>
                    <Link to="/teams" className="flex items-center text-blue-500 hover:text-blue-600">
                      <Users size={20} className="mr-1" />
                      Manage Teams
                    </Link>
                  </li>
                </ul>
              </nav>
              <Routes>
                <Route path="/" element={
                  <div className="divide-y divide-gray-200">
                    <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                      <BetForm
                        onSubmit={editingBet ? updateBet : addBet}
                        initialBet={editingBet || undefined}
                      />
                      {editingBet && (
                        <button
                          onClick={cancelEditing}
                          className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Cancel Editing
                        </button>
                      )}
                    </div>
                    <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
                      <BetList bets={bets} onEdit={startEditing} onDelete={deleteBet} />
                    </div>
                  </div>
                } />
                <Route path="/sports" element={
                  <SportsManagementPage
                    sports={sports}
                    onAddSport={addSport}
                    onRemoveSport={removeSport}
                  />
                } />
                <Route path="/teams" element={
                  <TeamManagementPage sports={sports} />
                } />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;