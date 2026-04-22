// components/AdminTable.jsx
import { Users, Mail, Phone, Calendar, Edit, Trash2, Shield, MoreVertical } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { getStorageUrl } from "../../utils/authStorage";

export default function AdminTable({ admins, onEdit, onDelete }) {
  const { t } = useTranslation();
  const [openMenu, setOpenMenu] = useState(null);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const getImageUrl = (imagePath) => getStorageUrl(imagePath);

  const getInitials = (nom, prenom) =>
    `${nom?.charAt(0) || ""}${prenom?.charAt(0) || ""}`.toUpperCase();

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-between">
        <h3 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
          <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
          <span className="hidden sm:inline">{t("adminsTable.list.title")}</span>
          <span className="sm:hidden">{t("adminsTable.list.title")}</span>
          <span className="text-gray-500 text-sm">({admins.length})</span>
        </h3>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase text-gray-600">
            <tr>
              <th className="px-6 py-4 text-left font-semibold">{t("adminsTable.table.headers.admin")}</th>
              <th className="px-6 py-4 text-left font-semibold">{t("adminsTable.table.headers.contact")}</th>
              <th className="px-6 py-4 text-left font-semibold">{t("adminsTable.table.headers.role")}</th>
              <th className="px-6 py-4 text-left font-semibold">{t("adminsTable.table.headers.createdAt")}</th>
              <th className="px-6 py-4 text-center font-semibold">{t("adminsTable.table.headers.actions")}</th>
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
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden shadow-sm border border-gray-200 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-600 font-semibold text-base">
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

                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 text-xs font-semibold rounded-full border border-blue-200">
                      <Shield className="w-3 h-3" />
                      {admin.role === "super_admin" ? t("adminsTable.status.superAdmin") : t("adminsTable.status.admin")}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {formatDate(admin.created_at)}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => onEdit(admin)}
                        className="p-2 rounded-lg text-blue-600 hover:text-blue-800 hover:bg-blue-100 transition transform hover:scale-110"
                        title={t("adminsTable.actions.edit")}
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => onDelete(admin)}
                        className="p-2 rounded-lg text-red-600 hover:text-red-800 hover:bg-red-100 transition transform hover:scale-110"
                        title={t("adminsTable.actions.delete")}
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

      {/* Mobile Card View */}
      <div className="md:hidden divide-y divide-gray-100">
        {admins.map((admin) => {
          const imageUrl = getImageUrl(admin.photo);
          const initials = getInitials(admin.nom, admin.prenom);
          const isMenuOpen = openMenu === admin.id;

          return (
            <div
              key={admin.id}
              className="p-4 hover:bg-blue-50 transition-colors duration-150"
            >
              {/* Header avec avatar et actions */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3 flex-1">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shadow-sm border border-gray-200 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-600 font-semibold text-sm flex-shrink-0">
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
                  <div className="min-w-0">
                    <div className="font-semibold text-gray-900 text-sm truncate">
                      {admin.nom} {admin.prenom}
                    </div>
                    <div className="text-xs text-gray-500">ID: {admin.id}</div>
                  </div>
                </div>

                {/* Menu button */}
                <div className="relative">
                  <button
                    onClick={() => setOpenMenu(isMenuOpen ? null : admin.id)}
                    className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 transition"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>

                  {/* Dropdown menu */}
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                      <button
                        onClick={() => {
                          onEdit(admin);
                          setOpenMenu(null);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-blue-600 hover:bg-blue-50 flex items-center gap-2 border-b border-gray-100"
                      >
                        <Edit className="w-4 h-4" />
                        {t("adminsTable.actions.edit")}
                      </button>
                      <button
                        onClick={() => {
                          onDelete(admin);
                          setOpenMenu(null);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        {t("adminsTable.actions.delete")}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Role badge */}
              <div className="mb-3">
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 text-xs font-semibold rounded-full border border-blue-200">
                  <Shield className="w-3 h-3" />
                  {admin.role === "super_admin" ? t("adminsTable.status.superAdmin") : t("adminsTable.status.admin")}
                </span>
              </div>

              {/* Contact info */}
              <div className="space-y-2 mb-3 bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-xs text-gray-700">
                  <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="truncate">{admin.email}</span>
                </div>
                {admin.telephone && (
                  <div className="flex items-center gap-2 text-xs text-gray-700">
                    <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span>{admin.telephone}</span>
                  </div>
                )}
              </div>

              {/* Date */}
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                {formatDate(admin.created_at)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty state */}
      {admins.length === 0 && (
        <div className="py-12 text-center">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">{t("adminsTable.emptyState")}</p>
        </div>
      )}
    </div>
  );
}
