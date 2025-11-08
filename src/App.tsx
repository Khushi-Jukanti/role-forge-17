import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ParentLoginOTP from "./pages/ParentLoginOTP";
import Unauthorized from "./pages/Unauthorized";
import Hierarchy from "./pages/Hierarchy";
import SuperAdminDashboard from "./pages/dashboards/SuperAdminDashboard";
import SubAdminDashboard from "./pages/dashboards/SubAdminDashboard";
import CDCAdminDashboard from "./pages/dashboards/CDCAdminDashboard";
import PsychiatristDashboard from "./pages/dashboards/PsychiatristDashboard";
import DoctorDashboard from "./pages/dashboards/DoctorDashboard";
import ParentDashboard from "./pages/dashboards/ParentDashboard";
import HelpDeskDashboard from "./pages/dashboards/HelpDeskDashboard";
import MarketingDashboard from "./pages/dashboards/MarketingDashboard";
import CreateSubAdmin from "./pages/create/CreateSubAdmin";
import CreateCDCAdmin from "./pages/create/CreateCDCAdmin";
import CreateDoctor from "./pages/create/CreateDoctor";
import CreatePsychiatrist from "./pages/create/CreatePsychiatrist";
import CreateHelpDesk from "./pages/create/CreateHelpDesk";
import CreateMarketing from "./pages/create/CreateMarketing";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/parent-login" element={<ParentLoginOTP />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            {/* Dashboard Routes */}
            <Route path="/dashboard/super-admin" element={
              <ProtectedRoute allowedRoles={['Super Admin']}>
                <SuperAdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/sub-admin" element={
              <ProtectedRoute allowedRoles={['Sub Admin']}>
                <SubAdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/cdc-admin" element={
              <ProtectedRoute allowedRoles={['CDC Admin']}>
                <CDCAdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/psychiatrist" element={
              <ProtectedRoute allowedRoles={['Psychiatrist']}>
                <PsychiatristDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/doctor" element={
              <ProtectedRoute allowedRoles={['Doctor']}>
                <DoctorDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/parent" element={
              <ProtectedRoute allowedRoles={['Parent']}>
                <ParentDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/help-desk" element={
              <ProtectedRoute allowedRoles={['Help Desk']}>
                <HelpDeskDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/marketing" element={
              <ProtectedRoute allowedRoles={['Marketing']}>
                <MarketingDashboard />
              </ProtectedRoute>
            } />
            
            {/* Hierarchy Route */}
            <Route path="/hierarchy" element={
              <ProtectedRoute>
                <Hierarchy />
              </ProtectedRoute>
            } />
            
            {/* Create User Routes */}
            <Route path="/create/subadmin" element={
              <ProtectedRoute allowedRoles={['Super Admin']}>
                <CreateSubAdmin />
              </ProtectedRoute>
            } />
            <Route path="/create/cdcadmin" element={
              <ProtectedRoute allowedRoles={['Super Admin', 'Sub Admin']}>
                <CreateCDCAdmin />
              </ProtectedRoute>
            } />
            <Route path="/create/doctor" element={
              <ProtectedRoute allowedRoles={['CDC Admin']}>
                <CreateDoctor />
              </ProtectedRoute>
            } />
            <Route path="/create/psychiatrist" element={
              <ProtectedRoute allowedRoles={['Super Admin', 'Sub Admin', 'CDC Admin']}>
                <CreatePsychiatrist />
              </ProtectedRoute>
            } />
            <Route path="/create/helpdesk" element={
              <ProtectedRoute allowedRoles={['Super Admin']}>
                <CreateHelpDesk />
              </ProtectedRoute>
            } />
            <Route path="/create/marketing" element={
              <ProtectedRoute allowedRoles={['Super Admin']}>
                <CreateMarketing />
              </ProtectedRoute>
            } />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
