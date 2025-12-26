
import React from 'react';
import { Mail, Lock, ChevronRight } from 'lucide-react';

interface Props {
  onLogin: () => void;
}

const Login: React.FC<Props> = ({ onLogin }) => {
  return (
    <div className="h-full px-8 flex flex-col justify-center animate-in slide-in-from-bottom-8 duration-500">
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-2">Inicia Sesión</h2>
        <p className="text-slate-500">Accede a tu cuenta SafeHome</p>
      </div>

      <div className="space-y-4 mb-8">
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="email" 
            placeholder="Correo electrónico" 
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 outline-none"
            defaultValue="ricardo.g@safehome.com"
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="password" 
            placeholder="Contraseña" 
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 outline-none"
            defaultValue="********"
          />
        </div>
        <div className="flex justify-end">
          <button className="text-sm font-bold text-blue-600">¿Olvidaste tu contraseña?</button>
        </div>
      </div>

      <button 
        onClick={onLogin}
        className="w-full py-5 bg-slate-900 text-white rounded-3xl font-bold shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
      >
        Entrar <ChevronRight size={20} />
      </button>

      <div className="mt-8 text-center">
        <p className="text-slate-500 text-sm">¿No tienes cuenta? <button className="font-bold text-slate-900">Regístrate gratis</button></p>
      </div>
    </div>
  );
};

export default Login;
