import React from "react";
import { Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AccessDenied() {
    const navigate = useNavigate();


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center max-w-md">
        <div className="mb-6 flex justify-center">
          <Lock className="w-12 h-12 text-red-600" />
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-2">Accès refusé</h1>
        
        <p className="text-gray-600 mb-8">
          Vous n'avez pas les permissions nécessaires pour accéder à cette page.
        </p>
      </div>
    </div>
  );
}