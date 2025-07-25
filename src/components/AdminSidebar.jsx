import React from "react";
import { BarChart2, Edit } from "lucide-react";

const AdminSidebar = ({ selected, onSelect }) => {
  return (
    <aside className="w-72 bg-white/80 shadow-xl rounded-xl py-6 px-6 flex flex-col gap-6 mr-8 mt-8 glassmorphism">
      <button
        className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-lg transition border border-slate-200 hover:bg-blue-100 ${selected === 'results' ? 'bg-blue-200 text-blue-800' : 'bg-white text-slate-700'}`}
        onClick={() => onSelect('results')}
      >
        <BarChart2 className="w-6 h-6" />
        Total Team Results
      </button>
      <button
        className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-lg transition border border-slate-200 hover:bg-green-100 ${selected === 'enter' ? 'bg-green-200 text-green-800' : 'bg-white text-slate-700'}`}
        onClick={() => onSelect('enter')}
      >
        <Edit className="w-6 h-6" />
        Enter Marks
      </button>
    </aside>
  );
};

export default AdminSidebar;
