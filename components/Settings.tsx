
import React from 'react';
import { Timer, Thermometer, Volume2, ShieldCheck, ChevronRight } from 'lucide-react';

interface Config {
  ruleAMinutes: number;
  ruleBMinutes: number;
  tempThreshold: number;
  conditionalIgnition: boolean;
}

interface Props {
  config: Config;
  onUpdate: React.Dispatch<React.SetStateAction<Config>>;
}

const Settings: React.FC<Props> = ({ config, onUpdate }) => {
  return (
    <div className="px-6 space-y-8">
      <header>
        <h2 className="text-xl font-bold mb-1">Reglas de Seguridad</h2>
        <p className="text-sm text-slate-500">Configura la inteligencia de detección de tu cocina.</p>
      </header>

      <section className="space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Detección de Inactividad</h3>
        
        <RuleItem 
          icon={<Timer size={20} className="text-blue-500" />}
          title="Regla A: Sin movimiento"
          desc="Notificar si no hay actividad cercana por:"
          value={`${config.ruleAMinutes} min`}
          onInc={() => onUpdate(p => ({...p, ruleAMinutes: p.ruleAMinutes + 5}))}
          onDec={() => onUpdate(p => ({...p, ruleAMinutes: Math.max(5, p.ruleAMinutes - 5)}))}
        />

        <RuleItem 
          icon={<Thermometer size={20} className="text-orange-500" />}
          title="Regla B: Temperatura estable"
          desc="Notificar si la temp. no varía por:"
          value={`${config.ruleBMinutes} min`}
          onInc={() => onUpdate(p => ({...p, ruleBMinutes: p.ruleBMinutes + 5}))}
          onDec={() => onUpdate(p => ({...p, ruleBMinutes: Math.max(5, p.ruleBMinutes - 5)}))}
        />
      </section>

      <section className="space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Ajustes Avanzados</h3>
        
        <ToggleItem 
          title="Encendido condicionado"
          desc="Solo permitir encendido si el teléfono está dentro del hogar."
          active={config.conditionalIgnition}
          onToggle={() => onUpdate(p => ({...p, conditionalIgnition: !p.conditionalIgnition}))}
        />

        <div className="p-4 rounded-2xl bg-white border border-slate-100 flex items-center justify-between cursor-pointer active:bg-slate-50">
          <div className="flex items-center gap-3">
            <Volume2 size={20} className="text-slate-400" />
            <div>
              <p className="font-bold text-sm">Horarios de silencio</p>
              <p className="text-xs text-slate-500">03:00 AM - 06:00 AM</p>
            </div>
          </div>
          <ChevronRight size={18} className="text-slate-300" />
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck size={20} className="text-emerald-400" />
            <div>
              <p className="font-bold text-sm">Contacto de emergencia</p>
              <p className="text-xs text-slate-400">Bomberos / Familiar</p>
            </div>
          </div>
          <button className="text-xs font-bold bg-white/10 px-3 py-1.5 rounded-lg">Editar</button>
        </div>
      </section>
    </div>
  );
};

const RuleItem: React.FC<{ 
  icon: React.ReactNode, 
  title: string, 
  desc: string, 
  value: string,
  onInc: () => void,
  onDec: () => void 
}> = ({ icon, title, desc, value, onInc, onDec }) => (
  <div className="p-5 rounded-3xl bg-white border border-slate-100 space-y-4">
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-xl bg-slate-50">{icon}</div>
      <div>
        <h4 className="font-bold text-sm">{title}</h4>
        <p className="text-xs text-slate-500">{desc}</p>
      </div>
    </div>
    <div className="flex items-center justify-between bg-slate-50 p-2 rounded-2xl">
      <button onClick={onDec} className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm text-slate-600 font-bold">-</button>
      <span className="font-bold text-lg">{value}</span>
      <button onClick={onInc} className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm text-slate-600 font-bold">+</button>
    </div>
  </div>
);

const ToggleItem: React.FC<{ title: string, desc: string, active: boolean, onToggle: () => void }> = ({ title, desc, active, onToggle }) => (
  <div className="p-5 rounded-3xl bg-white border border-slate-100 flex items-center justify-between">
    <div className="max-w-[80%]">
      <h4 className="font-bold text-sm">{title}</h4>
      <p className="text-xs text-slate-500 leading-relaxed mt-1">{desc}</p>
    </div>
    <button 
      onClick={onToggle}
      className={`w-12 h-6 rounded-full transition-colors relative ${active ? 'bg-blue-600' : 'bg-slate-200'}`}
    >
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${active ? 'left-7' : 'left-1'}`} />
    </button>
  </div>
);

export default Settings;
