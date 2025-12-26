
import React from 'react';
import { HistoryEvent } from '../types';
import { Flame, Power, Activity, AlertTriangle, Info } from 'lucide-react';

interface Props {
  events: HistoryEvent[];
}

const History: React.FC<Props> = ({ events }) => {
  const getIcon = (type: string) => {
    switch(type) {
      case 'Flame': return <Flame size={16} className="text-orange-500" />;
      case 'PowerOff': return <Power size={16} className="text-slate-500" />;
      case 'Alert': return <AlertTriangle size={16} className="text-red-500" />;
      default: return <Info size={16} className="text-blue-500" />;
    }
  };

  return (
    <div className="px-6 space-y-6">
      <h2 className="text-xl font-bold">Historial de Eventos</h2>
      
      <div className="relative pl-8 space-y-8 before:content-[''] before:absolute before:left-[15px] before:top-2 before:bottom-0 before:w-0.5 before:bg-slate-100">
        {events.map((event) => (
          <div key={event.id} className="relative">
            <div className="absolute -left-[31px] top-1 p-1.5 rounded-full bg-white border-2 border-slate-50 z-10">
              {getIcon(event.icon)}
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{event.timestamp}</span>
              <h4 className="font-bold text-slate-900">{event.action}</h4>
              <p className="text-sm text-slate-500 mt-0.5">{event.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
