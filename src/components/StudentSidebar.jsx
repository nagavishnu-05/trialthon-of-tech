import React from 'react';
import { Users, User2 } from 'lucide-react';

const StudentSidebar = ({ selected, onSelect }) => {
  return (
    <aside className="w-72 bg-white/80 shadow-xl rounded-xl py-6 px-6 flex flex-col gap-6 mr-8 mt-8 glassmorphism" style={{ minHeight: 'auto' }}>
      <button
        className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-lg transition border border-slate-200 hover:bg-blue-100 ${selected === 'all' ? 'bg-blue-200 text-blue-800' : 'bg-white text-slate-700'}`}
        onClick={() => onSelect('all')}
      >
        <Users className="w-6 h-6" />
        All Team Activity
      </button>
      <button
        className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-lg transition border border-slate-200 hover:bg-green-100 ${selected === 'team' ? 'bg-green-200 text-green-800' : 'bg-white text-slate-700'}`}
        onClick={() => onSelect('team')}
      >
        <User2 className="w-6 h-6" />
        My Team
      </button>
    </aside>
  );
};

export default StudentSidebar;
