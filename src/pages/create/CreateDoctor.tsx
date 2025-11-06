import { userAPI } from '@/lib/api';
import DashboardLayout from '@/components/DashboardLayout';
import CreateUserForm from '@/components/CreateUserForm';

export default function CreateDoctor() {
  return (
    <DashboardLayout>
      <CreateUserForm
        title="Create Doctor"
        description="Create a new Doctor account for your facility"
        onSubmit={userAPI.createDoctor}
        showAssignedTo
      />
    </DashboardLayout>
  );
}
