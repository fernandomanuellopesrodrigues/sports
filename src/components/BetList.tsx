import React from 'react';
import { Bet } from '../types';
import { Edit, Trash2 } from 'lucide-react';

interface BetListProps {
  bets: Bet[];
  onEdit: (bet: Bet) => void;
  onDelete: (id: string) => void;
}

const BetList: React.FC<BetListProps> = ({ bets, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Sport</th>
            <th className="py-3 px-6 text-left">Event</th>
            <th className="py-3 px-6 text-center">Amount</th>
            <th className="py-3 px-6 text-center">Odds</th>
            <th className="py-3 px-6 text-center">Result</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {bets.map((bet) => (
            <tr key={bet.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">{bet.sport}</td>
              <td className="py-3 px-6 text-left">{bet.event}</td>
              <td className="py-3 px-6 text-center">${bet.amount.toFixed(2)}</td>
              <td className="py-3 px-6 text-center">{bet.odds.toFixed(2)}</td>
              <td className="py-3 px-6 text-center">
                <span
                  className={`py-1 px-3 rounded-full text-xs ${
                    bet.result === 'win'
                      ? 'bg-green-200 text-green-600'
                      : bet.result === 'loss'
                      ? 'bg-red-200 text-red-600'
                      : 'bg-yellow-200 text-yellow-600'
                  }`}
                >
                  {bet.result.charAt(0).toUpperCase() + bet.result.slice(1)}
                </span>
              </td>
              <td className="py-3 px-6 text-center">
                <div className="flex item-center justify-center">
                  <button
                    onClick={() => onEdit(bet)}
                    className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(bet.id)}
                    className="w-4 mr-2 transform hover:text-red-500 hover:scale-110"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BetList;