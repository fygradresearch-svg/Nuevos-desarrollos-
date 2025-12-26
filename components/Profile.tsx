import React, { useState } from 'react';
import { StoveState } from '../types';
import { User, ShieldCheck, Fingerprint, Cpu, LogOut, ChevronRight, Globe, X, Check, Lock } from 'lucide-react';

interface Props {
  stove: StoveState;
}

const Profile: React.FC<Props> = ({ stove }) => {
  // Functional States
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState('Español (ES)');
  const [showPinModal, setShowPinModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [toast, setToast] = useState<{message: string, type: 'success' | 'info'} | null>(null);

  const showFeedback = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const languages = ['Español (ES)', 'English (US)', 'Português (BR)', 'Français (FR)'];

  const handleSavePin = () => {
    if (pinInput.length === 4) {
      setShowPinModal(false);
      setPinInput('');
      showFeedback('PIN actualizado correctamente');
    } else {
      showFeedback('El PIN debe tener 4 dígitos', 'info');
    }
  };

  return (
    <div className="px-6 space-y-8 relative pb-10">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-top-4">
          <div className={`px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm font-bold border ${toast.type === 'success' ? 'bg-emerald-500 text-white border-emerald-400' : 'bg-slate-800 text-white border-slate-700'}`}>
            {toast.type === 'success' ? <Check size={16} /> : <Fingerprint size={16} />}
            {toast.message}
          </div>
        </div>
      )}

      <div className="flex flex-col items-center pt-4">
        <div className="w-24 h-24 rounded-full bg-slate-100 border-4 border-white shadow-xl flex items-center justify-center mb-4 overflow-hidden relative group">
          <img src="https://picsum.photos/200" alt="Avatar" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <User className="text-white" size={24} />
          </div>
        </div>
        <h2 className="text-xl font-bold text-slate-900">Ricardo García</h2>
        <p className="text-sm text-slate-500">ricardo.g@safehome.com</p>
      </div>

      <div className="space-y-3">
        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] pl-2">Cuenta y Seguridad</h3>
        
        <ProfileItem 
          icon={<Fingerprint className="text-indigo-500" />} 
          label="Biometría para acciones críticas" 
          toggle={true} 
          active={biometricsEnabled} 
          onClick={() => {
            const nextState = !biometricsEnabled;
            setBiometricsEnabled(nextState);
            showFeedback(nextState ? 'Biometría activada' : 'Biometría desactivada', 'info');
          }}
        />
        <ProfileItem 
          icon={<ShieldCheck className="text-emerald-500" />} 
          label="Cambiar PIN de seguridad" 
          onClick={() => setShowPinModal(true)}
        />
        <ProfileItem 
          icon={<Cpu className="text-blue-500" />} 
          label="Gestionar Dispositivos IoT" 
          badge="1 Activo" 
          onClick={() => showFeedback('Módulo GasGuard activo y verificado', 'info')}
        />
        <ProfileItem 
          icon={<Globe className="text-slate-500" />} 
          label="Idioma" 
          value={currentLanguage} 
          onClick={() => setShowLanguageModal(true)}
        />
      </div>

      <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/60">
         <div className="flex justify-between items-center mb-4">
            <h4 className="font-bold text-sm text-slate-900">Estado del Sensor</h4>
            <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">Online</span>
         </div>
         <div className="space-y-3">
            <DeviceStat label="Modelo" value="GasGuard v2.4-Pro" />
            <DeviceStat label="Firmware" value="1.0.8-stable" />
            <DeviceStat label="ID" value="GG-8842-KT" />
         </div>
      </div>

      <button className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 text-red-500 font-bold border border-red-100 hover:bg-red-50 active:scale-[0.97] transition-all">
        <LogOut size={18} /> Cerrar Sesión
      </button>

      {/* PIN Change Modal */}
      {showPinModal && (
        <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-sm p-0 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-sm rounded-t-[32px] sm:rounded-[32px] p-8 shadow-2xl animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-8 duration-300">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                <Lock size={24} />
              </div>
              <button onClick={() => setShowPinModal(false)} className="p-2 bg-slate-100 rounded-full text-slate-400 active:bg-slate-200 transition-colors">
                <X size={20} />
              </button>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Cambiar PIN</h3>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed">Crea un nuevo código de 4 dígitos para autorizar encendidos remotos.</p>
            
            <div className="space-y-6">
              <input 
                type="text" 
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={4} 
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ''))}
                placeholder="0000" 
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-5 px-6 text-center text-3xl tracking-[0.8em] font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:opacity-30" 
              />
              <button 
                onClick={handleSavePin}
                disabled={pinInput.length !== 4}
                className={`w-full py-4 rounded-2xl font-bold shadow-lg transition-all active:scale-95 ${
                  pinInput.length === 4 ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-300 cursor-not-allowed'
                }`}
              >
                Actualizar PIN
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Language Modal */}
      {showLanguageModal && (
        <div className="fixed inset-0 z-[110] flex items-end justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-t-[40px] p-8 pb-12 shadow-2xl animate-in slide-in-from-bottom-full duration-400">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-slate-900">Seleccionar Idioma</h3>
              <button onClick={() => setShowLanguageModal(false)} className="p-2 bg-slate-100 rounded-full text-slate-400 active:bg-slate-200 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-3">
              {languages.map(lang => (
                <button 
                  key={lang}
                  onClick={() => {
                    setCurrentLanguage(lang);
                    setShowLanguageModal(false);
                    showFeedback(`Idioma cambiado a ${lang.split(' ')[0]}`);
                  }}
                  className={`w-full p-5 rounded-2xl flex items-center justify-between transition-all group active:scale-[0.98] ${
                    currentLanguage === lang 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-transparent'
                  }`}
                >
                  <span className="font-bold">{lang}</span>
                  {currentLanguage === lang ? (
                    <Check size={20} className="text-white" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-slate-200 group-hover:border-slate-300 transition-colors" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ProfileItem: React.FC<{ 
  icon: React.ReactNode, 
  label: string, 
  value?: string, 
  toggle?: boolean, 
  active?: boolean, 
  badge?: string,
  onClick?: () => void 
}> = ({ icon, label, value, toggle, active, badge, onClick }) => (
  <div 
    onClick={onClick}
    className="p-4 rounded-2xl bg-white border border-slate-100 flex items-center justify-between cursor-pointer active:bg-slate-50 transition-all hover:border-slate-200 hover:shadow-sm"
  >
    <div className="flex items-center gap-3">
      <div className="p-2.5 rounded-xl bg-slate-50/80 flex items-center justify-center w-11 h-11 border border-slate-100/50">{icon}</div>
      <span className="text-sm font-semibold text-slate-800">{label}</span>
    </div>
    <div className="flex items-center gap-3">
      {badge && <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100/50">{badge}</span>}
      {value && <span className="text-xs text-slate-400 font-semibold">{value}</span>}
      {toggle ? (
        <div className={`w-12 h-6 rounded-full relative transition-all duration-300 ease-in-out ${active ? 'bg-indigo-600' : 'bg-slate-200'}`}>
          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-300 ease-in-out ${active ? 'left-[26px]' : 'left-1'}`} />
        </div>
      ) : (
        <ChevronRight size={18} className="text-slate-300" />
      )}
    </div>
  </div>
);

const DeviceStat: React.FC<{ label: string, value: string }> = ({ label, value }) => (
  <div className="flex justify-between items-center text-xs">
    <span className="text-slate-500 font-medium">{label}</span>
    <span className="font-bold text-slate-800">{value}</span>
  </div>
);

export default Profile;