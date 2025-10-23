import { Home, Building2, Users, Mail, Settings, HelpCircle, Activity, TrendingUp, Clock } from 'lucide-react';



function HelpPage() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Aide</h2>
        <p className="text-slate-600">Besoin d'assistance ?</p>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
        <div className="text-center py-12">
          <HelpCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
          <h3 className="text-xl font-bold text-slate-800 mb-2">Centre d'Aide</h3>
          <p className="text-slate-600">Contenu de la page aide à venir...</p>
        </div>
      </div>
    </div>
  );
}
export default HelpPage;