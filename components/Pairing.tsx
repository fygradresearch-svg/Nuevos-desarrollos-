
import React, { useState, useEffect } from 'react';
import { Cpu, Wifi, CheckCircle, Search, Loader2 } from 'lucide-react';

interface Props {
  onPair: () => void;
}

const Pairing: React.FC<Props> = ({ onPair }) => {
  const [status, setStatus] = useState<'searching' | 'found' | 'pairing' | 'success'>('searching');

  useEffect(() => {
    const t1 = setTimeout(() => setStatus('found'), 2500);
    return () => clearTimeout(t1);
  }, []);

  const startPairing = () => {
    setStatus('pairing');
    setTimeout(() => setStatus('success'), 3000);
  };

  return (
    <div className="h-full px-8 py-12 flex flex-col items-center justify-center space-y-10 animate-in fade-in">
      {status === 'searching' && (
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-blue-50 flex items-center justify-center">
              <Search size={48} className="text-blue-600 animate-pulse" />
            </div>
            <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">Buscando Dispositivo</h2>
            <p className="text-slate-500">Asegúrate de que tu cocina inteligente esté en modo emparejamiento.</p>
          </div>
        </div>
      )}

      {status === 'found' && (
        <div className="flex flex-col items-center space-y-8 text-center animate-in zoom-in-75">
          <div className="w-32 h-32 rounded-full bg-emerald-50 flex items-center justify-center">
            <Cpu size={48} className="text-emerald-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">¡Cocina Detectada!</h2>
            <p className="text-slate-500">Se encontró: <b>GasGuard_XT_8842</b></p>
          </div>
          <button 
            onClick={startPairing}
            className="w-full py-5 bg-slate-900 text-white rounded-3xl font-bold shadow-xl active:scale-95 transition-all"
          >
            Vincular Ahora
          </button>
        </div>
      )}

      {status === 'pairing' && (
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className="w-32 h-32 rounded-full bg-slate-50 flex items-center justify-center">
            <Loader2 size={48} className="text-slate-400 animate-spin" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">Vinculando...</h2>
            <p className="text-slate-500">Configurando protocolos de seguridad y conexión Wi-Fi.</p>
          </div>
        </div>
      )}

      {status === 'success' && (
        <div className="flex flex-col items-center space-y-8 text-center animate-in slide-in-from-bottom-8">
          <div className="w-32 h-32 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-200">
            <CheckCircle size={56} />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">¡Viculación Exitosa!</h2>
            <p className="text-slate-500">Tu cocina inteligente está lista para ser monitoreada.</p>
          </div>
          <button 
            onClick={onPair}
            className="w-full py-5 bg-emerald-600 text-white rounded-3xl font-bold shadow-xl active:scale-95 transition-all"
          >
            Ir al Tablero
          </button>
        </div>
      )}
    </div>
  );
};

export default Pairing;
