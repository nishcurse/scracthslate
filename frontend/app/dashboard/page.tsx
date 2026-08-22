import DeletableBoardsDashboard from "@/components/dashboard/DeletableBoardsDashboard";
import {AuthGuard} from "@/auth/auth-guard"

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-paper">
      <AuthGuard>
        <DeletableBoardsDashboard />
      </AuthGuard>
    </main>
  );
}
