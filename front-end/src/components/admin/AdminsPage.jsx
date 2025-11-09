// AdminsPage.jsx
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../../context/UserContext';
import AccessDenied from './AccessDenied';

import AdminHeader from './AdminHeader';
import ConfirmDeleteModal from './ConfirmDeleteModal';

import AdminEmptyState from './AdminEmptyState';
import AdminStats from './AdminStats';
import AdminTable from './AdminTable';
import AddAdminModal from './AddAdminModal';
import UpdateAdminModal from './UpdateAdminModal';
import DeleteConfirmModal from './DeleteConfirmModal';

function AdminsPage() {
  const user = JSON.parse(localStorage.getItem('user'));
  const { t } = useTranslation();
  const { admins } = useContext(UserContext);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const handleEdit = (admin) => {
    setSelectedAdmin(admin);
    setShowUpdateModal(true);
  };

  const handleDelete = (admin) => {
    setSelectedAdmin(admin);
    setShowDeleteModal(true);
  };

  if (user?.role !== 'Admin') {
    return <AccessDenied />;
  }

  return (
    <div className="space-y-8">
      <AdminHeader onAddClick={() => setShowAddModal(true)} />
      <AdminStats admins={admins} />

      {admins && admins.length > 0 ? (
        <AdminTable admins={admins} onEdit={handleEdit} onDelete={handleDelete} />
      ) : (
        <AdminEmptyState onAddClick={() => setShowAddModal(true)} />
      )}

      {showAddModal && <AddAdminModal onClose={() => setShowAddModal(false)} />}
      {showUpdateModal && (
        <UpdateAdminModal
          admin={selectedAdmin}
          onClose={() => setShowUpdateModal(false)}
        />
      )}
      {showDeleteModal && (
        <DeleteConfirmModal
          admin={selectedAdmin}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}

export default AdminsPage;