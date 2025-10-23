import { Home, Building2, Users, Mail, Settings, HelpCircle, Activity, TrendingUp, Clock } from 'lucide-react';


function RequestsPage() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Demandes</h2>
        <p className="text-slate-600">Gérez les demandes des clients</p>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
        <div className="text-center py-12">
          <Mail className="w-16 h-16 mx-auto text-orange-500 mb-4" />
          <h3 className="text-xl font-bold text-slate-800 mb-2">Liste des Demandes</h3>
          <p className="text-slate-600">Contenu de la page demandes à venir...</p>
        </div>
      </div>
    </div>
  );
}
export default RequestsPage;