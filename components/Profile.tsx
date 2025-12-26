
import React from 'react';
import { StoveState } from '../types';
import { User, ShieldCheck, Fingerprint, Cpu, LogOut, ChevronRight, Globe } from 'lucide-react';

interface Props {
  stove: StoveState;
}

const Profile: React.FC<Props> = ({ stove }) => {
  return (
    <div className="px-6 space-y-8">
      <div className="flex flex-col items-center pt-4">
        <div className="w-24 h-24 rounded-full bg-slate-100 border-4 border-white shadow-xl flex items-center justify-center mb-4 overflow-hidden">
          <img src="https://picsum.photos/200" alt="Avatar" className="w-full h-full object-cover" />
        </div>
        <h2 className="text-xl font-bold">Ricardo García</h2>
        <p className="text-sm text-slate-500">ricardo.g@safehome.com</p>
      </div>

      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Cuenta y Seguridad</h3>
        
        <ProfileItem icon={<Fingerprint className="text-indigo-500" />} label="Biometría para acciones críticas" toggle={true} active={true} />
        <ProfileItem icon={<ShieldCheck className="text-emerald-500" />} label="Cambiar PIN de seguridad" />
        <ProfileItem icon={<Cpu className="text-blue-500" />} label="Gestionar Dispositivos IoT" badge="1 Activo" />
        <ProfileItem icon={<Globe className="text-slate-500" />} label="Idioma" value="Español (ES)" />
      </div>

      <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100">
         <div className="flex justify-between items-center mb-4">
            <h4 className="font-bold text-sm">Estado del Sensor</h4>
            <span className="text-[10px] bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-bold">Online</span>
         </div>
         <div className="space-y-3">
            <DeviceStat label="Modelo" value="GasGuard v2.4-Pro" />
            <DeviceStat label="Firmware" value="1.0.8-stable" />
            <DeviceStat label="ID" value="GG-8842-KT" />
         </div>
      </div>

      <button className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 text-red-500 font-bold border border-red-100 hover:bg-red-50 transition-colors">
        <LogOut size={18} /> Cerrar Sesión
      </button>
    </div>
  );
};

const ProfileItem: React.FC<{ icon: React.ReactNode, label: string, value?: string, toggle?: boolean, active?: boolean, badge?: string }> = ({ icon, label, value, toggle, active, badge }) => (
  <div className="p-4 rounded-2xl bg-white border border-slate-100 flex items-center justify-between cursor-pointer active:bg-slate-50 transition-colors">
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-xl bg-slate-50">{icon}</div>
      <span className="text-sm font-semibold text-slate-700">{label}</span>
    </div>
    <div className="flex items-center gap-2">
      {badge && <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">{badge}</span>}
      {value && <span className="text-xs text-slate-400">{value}</span>}
      {toggle ? (
        <div className={`w-10 h-5 rounded-full relative transition-colors ${active ? 'bg-indigo-600' : 'bg-slate-200'}`}>
          <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${active ? 'left-5.5' : 'left-0.5'}`} />
        </div>
      ) : (
        <ChevronRight size={16} className="text-slate-300" />
      )}
    </div>
  </div>
);

const DeviceStat: React.FC<{ label: string, value: string }> = ({ label, value }) => (
  <div className="flex justify-between items-center text-xs">
    <span className="text-slate-500">{label}</span>
    <span className="font-bold text-slate-800">{value}</span>
  </div>
);

export default Profile;
