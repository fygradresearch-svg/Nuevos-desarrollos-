
import React from 'react';
import { StoveState } from '../types';
import { MapPin, Navigation, Wifi, Home, AlertCircle } from 'lucide-react';

interface Props {
  stove: StoveState;
  onToggleHome: () => void;
  config: any;
  onUpdate: any;
}

const Geofence: React.FC<Props> = ({ stove, onToggleHome, config, onUpdate }) => {
  return (
    <div className="px-6 space-y-8 animate-in fade-in duration-300">
      <header className="flex flex-col items-center text-center space-y-3">
        <div className={`p-6 rounded-full ${stove.atHome ? 'bg-emerald-50 text-emerald-500' : 'bg-orange-50 text-orange-500'}`}>
          <MapPin size={48} />
        </div>
        <h2 className="text-2xl font-bold">Estado Geográfico</h2>
        <p className="text-slate-500">Determinamos si estás en casa mediante ubicación GPS y red Wi-Fi.</p>
      </header>

      <div className="p-6 rounded-3xl border border-slate-200 bg-white space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Navigation size={20} className="text-blue-500" />
            <span className="font-bold">Modo Manual (Demo)</span>
          </div>
          <button 
            onClick={onToggleHome}
            className={`px-6 py-2 rounded-xl font-bold transition-all ${stove.atHome ? 'bg-orange-500 text-white' : 'bg-emerald-500 text-white'}`}
          >
            {stove.atHome ? 'Salir de casa' : 'Llegar a casa'}
          </button>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Wifi size={20} className="text-slate-400" />
            <span className="text-sm font-medium">Wi-Fi Hogar: <b className="text-slate-900">TP-LINK_Kitchen_IoT</b></span>
          </div>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </div>

      <div className="p-5 rounded-3xl bg-slate-50 border border-slate-100 flex gap-3">
        <AlertCircle className="text-blue-500 shrink-0" size={20} />
        <div className="space-y-1">
          <h4 className="text-sm font-bold">Encendido Condicionado</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Si esta opción está activa, la cocina no podrá ser encendida desde la App si detectamos que estás fuera del hogar. Esta es una medida de seguridad crítica.
          </p>
          <div className="flex items-center gap-2 mt-4">
             <button 
              onClick={() => onUpdate((p:any) => ({...p, conditionalIgnition: !p.conditionalIgnition}))}
              className={`px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wider ${config.conditionalIgnition ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}
             >
              {config.conditionalIgnition ? 'Desactivar bloqueo' : 'Activar bloqueo'}
             </button>
          </div>
        </div>
      </div>

      {!stove.atHome && stove.isOn && (
        <div className="p-6 rounded-3xl bg-red-600 text-white space-y-4 animate-pulse">
           <div className="flex items-center gap-3">
             <AlertCircle />
             <h3 className="font-bold">¡Riesgo Potencial!</h3>
           </div>
           <p className="text-sm opacity-90">Detectamos que estás fuera de casa pero la cocina sigue encendida. ¿Deseas apagarla ahora?</p>
           <button className="w-full py-3 bg-white text-red-600 font-bold rounded-xl shadow-lg">Apagar ahora</button>
        </div>
      )}
    </div>
  );
};

export default Geofence;
