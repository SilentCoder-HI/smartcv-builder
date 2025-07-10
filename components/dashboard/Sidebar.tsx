// components/dashboard/Sidebar.tsx
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  FaChartPie,
  FaFileAlt,
  FaRobot,
  FaBriefcase,
  FaTasks,
  FaFileExport,
  FaCog,
  FaBell,
  FaLifeRing,
  FaCreditCard,
} from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";

const navItems = [
  { name: "Overview", href: "/dashboard", icon: <FaChartPie /> },
  { name: "My CVs", href: "/dashboard/my-cvs", icon: <FaFileAlt /> },
  { name: "AI Assistant", href: "/dashboard/ai-assistant", icon: <FaRobot /> },
  { name: "Job Board", href: "/dashboard/job-board", icon: <FaBriefcase /> },
  { name: "Job Tracker", href: "/dashboard/job-tracker", icon: <FaTasks /> },
  { name: "Export Center", href: "/dashboard/export-center", icon: <FaFileExport /> },
  { name: "LinkedIn Sync", href: "/dashboard/linkedin-sync", icon: <FaLinkedin /> },
  { name: "Subscription", href: "/dashboard/subscription", icon: <FaCreditCard /> },
  { name: "Settings", href: "/dashboard/settings", icon: <FaCog /> },
  { name: "Notifications", href: "/dashboard/notifications", icon: <FaBell /> },
  { name: "Support", href: "/dashboard/support", icon: <FaLifeRing /> },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:flex-col md:w-64 bg-white border-r border-gray-200 shadow-inner">
      <nav className="flex flex-col py-6 px-4 space-y-2 text-gray-700 font-semibold text-sm">
        {navItems.map(({ name, href, icon }) => (
          <Link
            key={name}
            href={href}
            className={`flex items-center gap-3 px-3 py-2 rounded-md transition hover:bg-blue-100 hover:text-blue-700 ${
              pathname === href ? "bg-blue-100 text-blue-700" : ""
            }`}
          >
            <span className="w-5 h-5">{icon}</span>
            {name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
