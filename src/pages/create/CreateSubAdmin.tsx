import { userAPI } from '@/lib/api';
import DashboardLayout from '@/components/DashboardLayout';
import CreateUserForm from '@/components/CreateUserForm';

export default function CreateSubAdmin() {
  return (
    <DashboardLayout>
      <CreateUserForm
        title="Create Sub Admin"
        description="Create a new Sub Admin user who can manage CDC Admins and Psychiatrists"
        onSubmit={userAPI.createSubAdmin}
        showAssignedTo
      />
    </DashboardLayout>
  );
}
