
import React from 'react';
import { Alert, AlertType } from '../types';
import { Bell, Flame, Activity, Thermometer, ShieldAlert, CheckCircle, ChevronRight, Power } from 'lucide-react';

interface Props {
  alerts: Alert[];
  onResolve: (id: string) => void;
  onActionOff: () => void;
}

const Alerts: React.FC<Props> = ({ alerts, onResolve, onActionOff }) => {
  return (
    <div className="px-6 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Bell className="text-red-500" /> Alertas Activas
        </h2>
        <span className="bg-red-100 text-red-600 text-xs px-2.5 py-1 rounded-full font-bold">
          {alerts.length} Pendientes
        </span>
      </div>

      {alerts.length === 0 ? (
        <div className="py-16 flex flex-col items-center text-center space-y-4 grayscale opacity-60">
          <CheckCircle size={64} className="text-emerald-500" />
          <div>
            <h3 className="font-bold text-lg">Todo seguro</h3>
            <p className="text-sm text-slate-500">No hay alertas de riesgo en este momento.</p>
          </div>
        </div>
      ) : (
        alerts.map(alert => (
          <div 
            key={alert.id} 
            className={`p-5 rounded-3xl border transition-all animate-in slide-in-from-right-4 ${
              alert.severity === 'high' ? 'bg-red-50 border-red-100' : 'bg-orange-50 border-orange-100'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-3">
                <div className={`p-2 rounded-xl ${alert.severity === 'high' ? 'bg-red-500 text-white' : 'bg-orange-500 text-white'}`}>
                  {alert.type === AlertType.BOTH ? <ShieldAlert size={20} /> : <Activity size={20} />}
                </div>
                <div>
                  <h4 className={`font-bold ${alert.severity === 'high' ? 'text-red-900' : 'text-orange-900'}`}>{alert.type}</h4>
                  <span className="text-[11px] font-medium opacity-60">{alert.timestamp}</span>
                </div>
              </div>
            </div>

            <p className="text-sm mb-6 leading-relaxed text-slate-700">
              {alert.type === AlertType.BOTH 
                ? "Detección crítica: no hay movimiento ni cambios de temperatura. Se recomienda apagar de inmediato."
                : "No se ha detectado presencia cerca de la cocina en los últimos 15 minutos."}
            </p>

            <div className="flex gap-2">
              <button 
                onClick={onActionOff}
                className={`flex-[2] py-3 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all ${
                  alert.severity === 'high' ? 'bg-red-600 shadow-red-200' : 'bg-orange-600 shadow-orange-200'
                }`}
              >
                <Power size={16} /> Apagar Ahora
              </button>
              <button 
                onClick={() => onResolve(alert.id)}
                className="flex-1 py-3 rounded-xl font-bold text-slate-600 bg-white/60 border border-slate-200/50 flex items-center justify-center"
              >
                Ignorar
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Alerts;
