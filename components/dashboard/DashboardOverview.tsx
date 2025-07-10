import { Progress } from "@/components/ui/progress";
import Image from "next/image";

export function DashboardOverview() {
  return (
    <section className="w-full">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">
        Dashboard Overview
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Active Resumes */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Active Resumes
            </h3>
            <i className="fas fa-file-alt text-blue-600 text-xl"></i>
          </div>
          <p className="text-4xl font-extrabold text-gray-900">7</p>
          <p className="mt-2 text-sm text-gray-500">You have 7 active resumes.</p>
        </div>

        {/* Job Applications */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Job Applications
            </h3>
            <i className="fas fa-briefcase text-green-600 text-xl"></i>
          </div>
          <p className="text-4xl font-extrabold text-gray-900">23</p>
          <p className="mt-2 text-sm text-gray-500">
            Applications tracked this month.
          </p>
        </div>

        {/* AI Token Usage */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">
              AI Tokens Used
            </h3>
            <i className="fas fa-robot text-purple-600 text-xl"></i>
          </div>
          <p className="text-4xl font-extrabold text-gray-900">12,450</p>
          <p className="mt-2 text-sm text-gray-500">
            Tokens consumed this billing cycle.
          </p>
          <Progress value={62} className="mt-4" />
          <p className="text-xs text-gray-400 mt-1">62% of your monthly quota</p>
        </div>
      </div>

      {/* Recent CVs */}
      <div className="mb-10">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Your Recent CVs
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col"
            >
              <Image
                src={`/placeholder/cv-${item}.jpg`}
                alt={`CV Template ${item}`}
                width={400}
                height={200}
                className="rounded mb-4 object-cover w-full h-48"
              />
              <h4 className="text-lg font-semibold text-gray-900 mb-1">
                Frontend Engineer
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                Last edited {item * 2} days ago
              </p>
              <a
                href={`/dashboard/my-cvs/${item}`}
                className="mt-auto inline-block text-blue-600 hover:text-blue-800 font-semibold"
              >
                Edit CV
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mb-10">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Recent Activity
        </h3>
        <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
          {[
            "Updated Resume: Senior Frontend Architect",
            "Applied to: Frontend Engineer at BlueWave",
            "AI Assistant: Generated cover letter for NextSphere"
          ].map((activity, index) => (
            <div
              key={index}
              className="p-4 flex items-center justify-between"
            >
              <div>
                <p className="text-gray-900 font-medium">{activity}</p>
                <p className="text-sm text-gray-500">{index + 1} day(s) ago</p>
              </div>
              <button className="text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
