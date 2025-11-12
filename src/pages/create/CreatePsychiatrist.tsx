import { userAPI } from '@/lib/api';
import DashboardLayout from '@/components/DashboardLayout';
import CreateUserForm from '@/components/CreateUserForm';

export default function CreatePsychiatrist() {
  return (
    <DashboardLayout>
      <CreateUserForm
        title="Create Psychiatrist"
        description="Create a new Psychiatrist account for assessments"
        onSubmit={userAPI.createPsychiatrist}
        showAssignedTo
      />
    </DashboardLayout>
  );
}
