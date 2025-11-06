import { userAPI } from '@/lib/api';
import DashboardLayout from '@/components/DashboardLayout';
import CreateUserForm from '@/components/CreateUserForm';

export default function CreateCDCAdmin() {
  return (
    <DashboardLayout>
      <CreateUserForm
        title="Create CDC Admin"
        description="Create a new CDC Admin user who can manage their facility's doctors and caregivers"
        onSubmit={userAPI.createCDCAdmin}
        showAssignedTo
      />
    </DashboardLayout>
  );
}
