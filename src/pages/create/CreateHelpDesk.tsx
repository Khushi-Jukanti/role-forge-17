import { userAPI } from '@/lib/api';
import DashboardLayout from '@/components/DashboardLayout';
import CreateUserForm from '@/components/CreateUserForm';

export default function CreateHelpDesk() {
  return (
    <DashboardLayout>
      <CreateUserForm
        title="Create Help Desk User"
        description="Create a new Help Desk support account"
        onSubmit={userAPI.createHelpDesk}
        showAssignedTo
      />
    </DashboardLayout>
  );
}
