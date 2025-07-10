"use client";

import { FaArrowRight } from "react-icons/fa";

const activities = [
  {
    title: "Updated Resume: Senior Frontend Architect",
    time: "2 hours ago",
  },
  {
    title: "Applied to: Frontend Engineer at BlueWave Solutions",
    time: "1 day ago",
  },
  {
    title: "AI Assistant: Generated cover letter for NextSphere Technologies",
    time: "3 days ago",
  },
];

export default function RecentActivity() {
  return (
    <section className="mb-10">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Recent Activity</h3>
      <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
        {activities.map((item, index) => (
          <div
            key={index}
            className="p-4 flex items-center justify-between hover:bg-gray-50 transition"
          >
            <div>
              <p className="text-gray-900 font-medium">{item.title}</p>
              <p className="text-sm text-gray-500">{item.time}</p>
            </div>
            <button className="text-blue-600 hover:text-blue-800">
              <FaArrowRight />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
