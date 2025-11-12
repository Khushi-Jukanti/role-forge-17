import { userAPI } from '@/lib/api';
import DashboardLayout from '@/components/DashboardLayout';
import CreateUserForm from '@/components/CreateUserForm';

export default function CreateMarketing() {
  return (
    <DashboardLayout>
      <CreateUserForm
        title="Create Marketing User"
        description="Create a new Marketing team member account"
        onSubmit={userAPI.createMarketing}
        showAssignedTo
      />
    </DashboardLayout>
  );
}
