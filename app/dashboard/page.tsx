"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import StatCard from "@/components/dashboard/StatCard";
import RecentActivity from "@/components/dashboard/RecentActivity";
import PlanCard from "@/components/dashboard/PlanCard";

export default function DashboardPage() {
  return (
    <div className="min-h-full flex flex-col">
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <section className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <StatCard title="Active Resumes" value="7" icon="file-alt" color="blue" description="You have 7 active resumes." />
              <StatCard title="Job Applications" value="23" icon="briefcase" color="green" description="Applications tracked this month." />
              <StatCard title="AI Tokens Used" value="12,450" icon="robot" color="purple" description="Tokens consumed this billing cycle." />
            </div>
            <RecentActivity />
            <PlanCard />
          </section>
        </main>
      </div>
    </div>
  );
}