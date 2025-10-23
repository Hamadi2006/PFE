import { Home, Building2, Users, Mail, Settings, HelpCircle, Activity, TrendingUp, Clock } from 'lucide-react';


function SettingsPage() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Paramètres</h2>
        <p className="text-slate-600">Configurez votre application</p>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
        <div className="text-center py-12">
          <Settings className="w-16 h-16 mx-auto text-slate-500 mb-4" />
          <h3 className="text-xl font-bold text-slate-800 mb-2">Paramètres</h3>
          <p className="text-slate-600">Contenu de la page paramètres à venir...</p>
        </div>
      </div>
    </div>
  );
}
export default SettingsPage;