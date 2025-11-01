// components/AdminTable.jsx
import { Users, Mail, Phone, Calendar, Edit, Trash2, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function AdminTable({ admins, onEdit, onDelete }) {
  const { t } = useTranslation();

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const getImageUrl = (imagePath) =>
    imagePath ? `http://localhost:8000/storage/${imagePath}` : null;

  const getInitials = (nom, prenom) =>
    `${nom?.charAt(0) || ""}${prenom?.charAt(0) || ""}`.toUpperCase();

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-600" />
          {t("admins.list.title")} <span className="text-gray-500">({admins.length})</span>
        </h3>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase text-gray-600">
            <tr>
              <th className="px-6 py-4 text-left font-semibold">Administrateur</th>
              <th className="px-6 py-4 text-left font-semibold">Contact</th>
              <th className="px-6 py-4 text-left font-semibold">Rôle</th>
              <th className="px-6 py-4 text-left font-semibold">Créé le</th>
              <th className="px-6 py-4 text-center font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {admins.map((admin) => {
              const imageUrl = getImageUrl(admin.photo);
              const initials = getInitials(admin.nom, admin.prenom);

              return (
                <tr
                  key={admin.id}
                  className="hover:bg-blue-50 transition-colors duration-150"
                >
                  {/* Avatar + nom */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden shadow-sm border border-gray-200 bg-gray-100 flex items-center justify-center text-blue-600 font-semibold text-base">
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={`${admin.nom} ${admin.prenom}`}
                            className="w-full h-full object-cover"
                            onError={(e) => (e.target.style.display = "none")}
                          />
                        ) : (
                          <span>{initials}</span>
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {admin.nom} {admin.prenom}
                        </div>
                        <div className="text-xs text-gray-500">ID: {admin.id}</div>
                      </div>
                    </div>
                  </td>

                  {/* Contact */}
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span>{admin.email}</span>
                      </div>
                      {admin.telephone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span>{admin.telephone}</span>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Role */}
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                      <Shield className="w-3 h-3" />
                      {admin.role || "Admin"}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {formatDate(admin.created_at)}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => onEdit(admin)}
                        className="p-2 rounded-lg text-blue-600 hover:text-blue-800 hover:bg-blue-100 transition"
                        title="Modifier"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => onDelete(admin)}
                        className="p-2 rounded-lg text-red-600 hover:text-red-800 hover:bg-red-100 transition"
                        title="Supprimer"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
