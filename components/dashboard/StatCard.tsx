"use client";

import { FaFileAlt, FaBriefcase, FaRobot } from "react-icons/fa";

const icons = {
  "file-alt": <FaFileAlt className="text-blue-600 text-xl" />,
  briefcase: <FaBriefcase className="text-green-600 text-xl" />,
  robot: <FaRobot className="text-purple-600 text-xl" />,
};

type Props = {
  title: string;
  value: string;
  icon: "file-alt" | "briefcase" | "robot";
  color: string;
  description: string;
};

export default function StatCard({ title, value, icon, description }: Props) {
  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        {icons[icon]}
      </div>
      <p className="text-4xl font-extrabold text-gray-900">{value}</p>
      <p className="mt-2 text-sm text-gray-500">{description}</p>
    </div>
  );
}