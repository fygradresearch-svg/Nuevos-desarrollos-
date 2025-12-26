
import React, { useState, useEffect, useCallback } from 'react';
import { AppScreen, StoveState, RiskLevel, Alert, HistoryEvent, AlertType } from './types';
import Onboarding from './components/Onboarding';
import Login from './components/Login';
import Pairing from './components/Pairing';
import Dashboard from './components/Dashboard';
import Alerts from './components/Alerts';
import History from './components/History';
import Settings from './components/Settings';
import Profile from './components/Profile';
import Geofence from './components/Geofence';
import { 
  Home, 
  Bell, 
  History as HistoryIcon, 
  Settings as SettingsIcon,
  User,
  ShieldAlert
} from 'lucide-react';

const App: React.FC = () => {
  // Navigation State
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.ONBOARDING);
  
  // App Global State
  const [stove, setStove] = useState<StoveState>({
    isOn: false,
    isInUse: false,
    temperature: 24,
    timeOnSeconds: 0,
    lastActivity: 'Hace 5 min',
    riskLevel: RiskLevel.LOW,
    atHome: true
  });

  const [alerts, setAlerts] = useState<Alert[]>([
    { id: '1', timestamp: 'Hoy, 10:30 AM', type: AlertType.MOTION, severity: 'medium', resolved: true },
    { id: '2', timestamp: 'Ayer, 08:15 PM', type: AlertType.BOTH, severity: 'high', resolved: true }
  ]);

  const [history, setHistory] = useState<HistoryEvent[]>([
    { id: '1', timestamp: '10:30 AM', action: 'Apagado remoto', details: 'Acción manual por el usuario', icon: 'PowerOff' },
    { id: '2', timestamp: '10:25 AM', action: 'Alerta generada', details: 'Sin movimiento detectado', icon: 'Alert' },
    { id: '3', timestamp: '10:15 AM', action: 'Cocina encendida', details: 'Encendido manual', icon: 'Flame' }
  ]);

  const [settings, setSettings] = useState({
    ruleAMinutes: 15,
    ruleBMinutes: 20,
    tempThreshold: 2.5,
    conditionalIgnition: true
  });

  // Simulation Logic: Periodic updates
  useEffect(() => {
    let interval: any;
    if (stove.isOn) {
      interval = setInterval(() => {
        setStove(prev => {
          const newTime = prev.timeOnSeconds + 1;
          const newTemp = prev.temperature + (Math.random() > 0.7 ? 0.2 : -0.1);
          
          // Logic for Risk Levels (Simplified Simulation)
          let newRisk = RiskLevel.LOW;
          if (newTime > settings.ruleAMinutes * 60 && !prev.isInUse) {
             newRisk = RiskLevel.MEDIUM;
          }
          if (newTime > settings.ruleBMinutes * 60) {
             newRisk = RiskLevel.HIGH;
          }
          if (!prev.atHome && prev.isOn) {
             newRisk = RiskLevel.HIGH;
          }

          return {
            ...prev,
            timeOnSeconds: newTime,
            temperature: Math.min(newTemp, 280),
            riskLevel: newRisk
          };
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [stove.isOn, stove.isInUse, stove.atHome, settings]);

  // Handlers
  const handleToggleStove = useCallback(() => {
    if (!stove.isOn && !stove.atHome && settings.conditionalIgnition) {
      alert("⚠️ Encendido bloqueado: Solo se permite encender la cocina si estás en casa.");
      return;
    }

    setStove(prev => ({
      ...prev,
      isOn: !prev.isOn,
      timeOnSeconds: 0,
      temperature: !prev.isOn ? 30 : 24,
      riskLevel: RiskLevel.LOW
    }));

    setHistory(prev => [
      {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action: !stove.isOn ? 'Cocina Encendida' : 'Cocina Apagada',
        details: 'Acción remota desde App',
        icon: !stove.isOn ? 'Flame' : 'PowerOff'
      },
      ...prev
    ]);
  }, [stove.isOn, stove.atHome, settings.conditionalIgnition]);

  const renderScreen = () => {
    switch (currentScreen) {
      case AppScreen.ONBOARDING: return <Onboarding onComplete={() => setCurrentScreen(AppScreen.LOGIN)} />;
      case AppScreen.LOGIN: return <Login onLogin={() => setCurrentScreen(AppScreen.PAIRING)} />;
      case AppScreen.PAIRING: return <Pairing onPair={() => setCurrentScreen(AppScreen.DASHBOARD)} />;
      case AppScreen.DASHBOARD: return <Dashboard stove={stove} onToggle={handleToggleStove} />;
      case AppScreen.ALERTS: return <Alerts alerts={alerts} onResolve={(id) => setAlerts(prev => prev.filter(a => a.id !== id))} onActionOff={handleToggleStove} />;
      case AppScreen.HISTORY: return <History events={history} />;
      case AppScreen.SETTINGS: return <Settings config={settings} onUpdate={setSettings} />;
      case AppScreen.PROFILE: return <Profile stove={stove} />;
      case AppScreen.GEOFENCE: return <Geofence stove={stove} onToggleHome={() => setStove(p => ({...p, atHome: !p.atHome}))} config={settings} onUpdate={setSettings} />;
      default: return <Dashboard stove={stove} onToggle={handleToggleStove} />;
    }
  };

  const showNav = ![AppScreen.ONBOARDING, AppScreen.LOGIN, AppScreen.PAIRING].includes(currentScreen);

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white border-x border-slate-200 overflow-hidden relative">
      <header className="px-6 pt-8 pb-4 flex justify-between items-center bg-white sticky top-0 z-10">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">GasSafe IoT</h1>
          <div className="flex items-center gap-1.5 mt-0.5">
            <div className={`w-2 h-2 rounded-full ${stove.atHome ? 'bg-green-500' : 'bg-orange-500'}`} />
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              {stove.atHome ? 'En casa' : 'Fuera de casa'}
            </span>
          </div>
        </div>
        <button 
          onClick={() => setCurrentScreen(AppScreen.GEOFENCE)}
          className="p-2.5 rounded-full bg-slate-100 text-slate-600 active:scale-95 transition-transform"
        >
          <ShieldAlert size={20} />
        </button>
      </header>

      <main className="flex-1 overflow-y-auto pb-24">
        {renderScreen()}
      </main>

      {showNav && (
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-sm border-t border-slate-100 flex justify-around items-center py-3 px-2 z-20">
          <NavItem icon={<Home size={22} />} label="Inicio" active={currentScreen === AppScreen.DASHBOARD} onClick={() => setCurrentScreen(AppScreen.DASHBOARD)} />
          <NavItem icon={<Bell size={22} />} label="Alertas" active={currentScreen === AppScreen.ALERTS} onClick={() => setCurrentScreen(AppScreen.ALERTS)} badge={alerts.filter(a => !a.resolved).length} />
          <NavItem icon={<HistoryIcon size={22} />} label="Registro" active={currentScreen === AppScreen.HISTORY} onClick={() => setCurrentScreen(AppScreen.HISTORY)} />
          <NavItem icon={<SettingsIcon size={22} />} label="Reglas" active={currentScreen === AppScreen.SETTINGS} onClick={() => setCurrentScreen(AppScreen.SETTINGS)} />
          <NavItem icon={<User size={22} />} label="Perfil" active={currentScreen === AppScreen.PROFILE} onClick={() => setCurrentScreen(AppScreen.PROFILE)} />
        </nav>
      )}
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode, label: string, active: boolean, onClick: () => void, badge?: number }> = ({ icon, label, active, onClick, badge }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center flex-1 py-1 transition-all relative ${active ? 'text-blue-600' : 'text-slate-400'}`}
  >
    {icon}
    <span className="text-[10px] mt-1 font-medium">{label}</span>
    {badge ? (
      <span className="absolute top-0 right-1/4 w-4 h-4 bg-red-500 text-white text-[9px] rounded-full flex items-center justify-center font-bold">
        {badge}
      </span>
    ) : null}
    {active && <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-1 bg-blue-600 rounded-b-full" />}
  </button>
);

export default App;
