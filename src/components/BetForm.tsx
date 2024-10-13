import React, { useState } from 'react';
import { Bet } from '../types';
import { PlusCircle, Save } from 'lucide-react';

interface BetFormProps {
  onSubmit: (bet: Omit<Bet, 'id'>) => void;
  initialBet?: Bet;
}

const BetForm: React.FC<BetFormProps> = ({ onSubmit, initialBet }) => {
  const [bet, setBet] = useState<Omit<Bet, 'id'>>(
    initialBet || {
      sport: '',
      event: '',
      amount: 0,
      odds: 0,
      result: 'pending',
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(bet);
    if (!initialBet) {
      setBet({
        sport: '',
        event: '',
        amount: 0,
        odds: 0,
        result: 'pending',
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBet((prevBet) => ({ ...prevBet, [name]: name === 'amount' || name === 'odds' ? parseFloat(value) : value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="sport" className="block text-sm font-medium text-gray-700">
          Sport
        </label>
        <input
          type="text"
          id="sport"
          name="sport"
          value={bet.sport}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="event" className="block text-sm font-medium text-gray-700">
          Event
        </label>
        <input
          type="text"
          id="event"
          name="event"
          value={bet.event}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={bet.amount}
          onChange={handleChange}
          required
          min="0"
          step="0.01"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="odds" className="block text-sm font-medium text-gray-700">
          Odds
        </label>
        <input
          type="number"
          id="odds"
          name="odds"
          value={bet.odds}
          onChange={handleChange}
          required
          min="1"
          step="0.01"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="result" className="block text-sm font-medium text-gray-700">
          Result
        </label>
        <select
          id="result"
          name="result"
          value={bet.result}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="pending">Pending</option>
          <option value="win">Win</option>
          <option value="loss">Loss</option>
        </select>
      </div>
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {initialBet ? <Save className="mr-2" size={16} /> : <PlusCircle className="mr-2" size={16} />}
        {initialBet ? 'Save Changes' : 'Add Bet'}
      </button>
    </form>
  );
};

export default BetForm;