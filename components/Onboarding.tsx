
import React, { useState } from 'react';
import { ShieldCheck, Navigation, Bell, ChevronRight, Flame } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

const Onboarding: React.FC<Props> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Bienvenido a GasSafe",
      desc: "Protege tu hogar monitoreando tu cocina a gas en tiempo real desde cualquier lugar.",
      icon: <Flame size={64} className="text-orange-500" />,
      color: "bg-orange-50 text-orange-600"
    },
    {
      title: "Seguridad Inteligente",
      desc: "Recibe alertas críticas si la cocina queda encendida sin actividad o presencia cercana.",
      icon: <ShieldCheck size={64} className="text-blue-500" />,
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "Permisos Necesarios",
      desc: "Requerimos ubicación (geocerca) y notificaciones para garantizar que tu hogar esté siempre seguro.",
      icon: <Bell size={64} className="text-indigo-500" />,
      color: "bg-indigo-50 text-indigo-600"
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const current = steps[step];

  return (
    <div className="h-full flex flex-col px-8 py-12 justify-between animate-in fade-in duration-500">
      <div className="flex justify-end">
        <button onClick={onComplete} className="text-slate-400 font-bold text-sm">Omitir</button>
      </div>

      <div className="flex flex-col items-center text-center space-y-8">
        <div className={`p-10 rounded-[40px] ${current.color} shadow-inner transition-all duration-700 animate-in zoom-in-50`}>
          {current.icon}
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">{current.title}</h2>
          <p className="text-slate-500 text-lg leading-relaxed">{current.desc}</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-center gap-2">
          {steps.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-slate-900' : 'w-2 bg-slate-200'}`} />
          ))}
        </div>
        <button 
          onClick={handleNext}
          className="w-full py-5 bg-slate-900 text-white rounded-3xl font-bold flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all"
        >
          {step === steps.length - 1 ? "Comenzar" : "Siguiente"}
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
