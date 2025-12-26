
import React, { useState } from 'react';
import { StoveState, RiskLevel } from '../types';
import { Power, Flame, Activity, Thermometer, Clock, AlertTriangle, ShieldCheck } from 'lucide-react';

interface Props {
  stove: StoveState;
  onToggle: () => void;
}

const Dashboard: React.FC<Props> = ({ stove, onToggle }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getRiskColor = (level: RiskLevel) => {
    switch(level) {
      case RiskLevel.HIGH: return 'text-red-600 bg-red-50 border-red-100';
      case RiskLevel.MEDIUM: return 'text-orange-600 bg-orange-50 border-orange-100';
      default: return 'text-emerald-600 bg-emerald-50 border-emerald-100';
    }
  };

  const getRiskIcon = (level: RiskLevel) => {
    if (level === RiskLevel.LOW) return <ShieldCheck size={18} />;
    return <AlertTriangle size={18} />;
  };

  return (
    <div className="px-6 space-y-6">
      {/* Main Status Card */}
      <div className={`relative p-8 rounded-3xl transition-all duration-500 overflow-hidden ${stove.isOn ? 'bg-slate-900 text-white shadow-2xl scale-[1.02]' : 'bg-white border border-slate-200 text-slate-900'}`}>
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className={`mb-6 p-5 rounded-full transition-all duration-700 ${stove.isOn ? 'bg-orange-500/20 animate-pulse' : 'bg-slate-100'}`}>
            <Flame size={48} className={stove.isOn ? 'text-orange-500 drop-shadow-[0_0_10px_rgba(249,115,22,0.6)]' : 'text-slate-300'} />
          </div>
          
          <h2 className="text-3xl font-bold tracking-tight mb-2">
            {stove.isOn ? 'Cocina Encendida' : 'Cocina Apagada'}
          </h2>
          
          <div className="flex items-center gap-2 mb-8">
            <div className={`w-2.5 h-2.5 rounded-full ${stove.isInUse && stove.isOn ? 'bg-green-500 animate-ping' : 'bg-slate-300'}`} />
            <span className={`text-sm font-medium ${stove.isOn ? 'text-slate-300' : 'text-slate-500'}`}>
              {stove.isInUse && stove.isOn ? 'Movimiento detectado' : 'Sin actividad cercana'}
            </span>
          </div>

          <button
            onClick={() => stove.isOn ? setShowConfirm(true) : onToggle()}
            className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 font-bold transition-all ${
              stove.isOn 
                ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30' 
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20'
            }`}
          >
            <Power size={20} />
            {stove.isOn ? 'Apagar Ahora' : 'Encender Cocina'}
          </button>
        </div>

        {/* Decorative background elements when ON */}
        {stove.isOn && (
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-3xl -mr-16 -mt-16 rounded-full" />
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Power size={32} />
            </div>
            <h3 className="text-xl font-bold text-center mb-2">¿Confirmar apagado?</h3>
            <p className="text-slate-500 text-center mb-8">La cocina se apagará inmediatamente por seguridad.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowConfirm(false)} className="flex-1 py-4 rounded-xl font-bold text-slate-500 bg-slate-100">Cancelar</button>
              <button onClick={() => {onToggle(); setShowConfirm(false);}} className="flex-1 py-4 rounded-xl font-bold text-white bg-red-500">Apagar</button>
            </div>
          </div>
        </div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4">
        <MetricCard 
          icon={<Thermometer className="text-orange-500" size={20} />} 
          label="Temperatura" 
          value={`${stove.temperature.toFixed(1)}°C`} 
          active={stove.isOn}
        />
        <MetricCard 
          icon={<Clock className="text-blue-500" size={20} />} 
          label="Tiempo" 
          value={formatTime(stove.timeOnSeconds)} 
          active={stove.isOn}
        />
        <MetricCard 
          icon={<Activity className="text-indigo-500" size={20} />} 
          label="Última Actividad" 
          value={stove.lastActivity} 
          active={true}
        />
        <div className={`p-4 rounded-2xl border flex flex-col gap-1 ${getRiskColor(stove.riskLevel)}`}>
           <div className="flex items-center gap-2">
             {getRiskIcon(stove.riskLevel)}
             <span className="text-xs font-semibold uppercase tracking-wider">Riesgo Actual</span>
           </div>
           <span className="text-xl font-bold mt-1">{stove.riskLevel}</span>
        </div>
      </div>

      {/* Safety Alert Rule Description */}
      {stove.riskLevel !== RiskLevel.LOW && (
        <div className="p-4 bg-orange-50 border border-orange-100 rounded-2xl flex gap-3 animate-bounce">
          <AlertTriangle className="text-orange-500 shrink-0" />
          <p className="text-sm text-orange-800 leading-relaxed font-medium">
            {stove.riskLevel === RiskLevel.MEDIUM 
              ? "Se ha detectado falta de movimiento prolongada mientras la cocina está encendida."
              : "¡ALERTA! Posible descuido: Cocina encendida sin actividad ni cambios de temperatura detectados."}
          </p>
        </div>
      )}
    </div>
  );
};

const MetricCard: React.FC<{ icon: React.ReactNode, label: string, value: string, active: boolean }> = ({ icon, label, value, active }) => (
  <div className={`p-5 rounded-3xl border transition-all ${active ? 'bg-white border-slate-200' : 'bg-slate-50 border-slate-100 grayscale'}`}>
    <div className="flex items-center gap-2 mb-2 text-slate-400">
      {icon}
      <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
    </div>
    <span className="text-lg font-bold text-slate-900">{value}</span>
  </div>
);

export default Dashboard;
