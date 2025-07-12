"use client";

import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import {
  FileText,
  Sparkles,
  LayoutDashboard,
  ScrollText,
  BriefcaseBusiness,
  ListChecks,
  Download,
  Settings,
  Star,
  ChevronDown,
  Layers,
  DotIcon,
  Dot,
} from "lucide-react";
import { useState } from "react";

type MenuItem = {
  name: string;
  path?: string;
  icon: React.ReactNode;
  subItems?: { name: string; path: string }[];
};

type AppSidebarProps = {
  onNavigate?: (path: string) => void;
};

const menu: MenuItem[] = [
  { name: "Dashboard", path: "/", icon: <LayoutDashboard size={30} strokeWidth={1}/> },
  { name: "My CVs", path: "/my-cvs", icon: <ScrollText size={30} strokeWidth={1} /> },
  { name: "AI Resume Assistant", path: "/ai-assistant", icon: <Sparkles size={30} strokeWidth={1} /> },
  {
    name: "Templates",
    icon: <Layers size={30} strokeWidth={1} />,
    subItems: [
      { name: "Free Templates", path: "/templates/free" },
      { name: "Pro Templates", path: "/templates/pro" },
    ],
  },
  { name: "Job Board", path: "/jobs", icon: <BriefcaseBusiness size={30}  strokeWidth={1}/> },
  { name: "Job Tracker", path: "/tracker", icon: <ListChecks size={30} strokeWidth={1} /> },
  { name: "Exports", path: "/exports", icon: <Download size={30} strokeWidth={1} /> },
  { name: "Settings", path: "/settings", icon: <Settings size={30} strokeWidth={1} /> },
  { name: "Upgrade to Pro", path: "/upgrade", icon: <Star size={30} strokeWidth={1} className="text-yellow-500" /> },
];

export default function AppSidebar({ onNavigate }: AppSidebarProps) {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();
  const [openTemplate, setOpenTemplate] = useState(false);

  let hoverTimeout: ReturnType<typeof setTimeout>;


  const isActive = (path?: string) => path === pathname;

  return (
    <aside
      onMouseEnter={() => {
        clearTimeout(hoverTimeout);
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        hoverTimeout = setTimeout(() => setIsHovered(false), 200);
      }}
      className={`fixed top-0 left-0 z-50 h-screen border-r bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-5 pt-6 transition-all duration-300 ${isExpanded || isMobileOpen || isHovered ? "w-[250px]" : "w-[80px]"
        } ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
    >

      <button
        onClick={() => onNavigate?.("/")}
        className="flex items-center gap-2 px-2 mb-8 text-xl font-bold focus:outline-none focus:ring-0"
      >
        <FileText className="text-blue-600" size={28} />
        {(isExpanded || isHovered || isMobileOpen) && "SmartCV"}
      </button>
      <p className="px-3 py-2">
        {(isExpanded || isHovered || isMobileOpen) ? (
          "Menu"
        ) : (
          "...."
        )}
      </p>

      <nav className="flex flex-col gap-2">
        {menu.map((item) =>
          item.subItems ? (
            <div key={item.name}>
              <button
                onClick={() => setOpenTemplate((prev) => !prev)}
                className={`flex items-center gap-3 w-full px-3 py-2 rounded-md text-left focus:outline-none focus:ring-0 hover:bg-gray-100 dark:hover:bg-gray-800 ${openTemplate ? "bg-gray-100 dark:bg-gray-800" : ""
                  }`}
              >
                {item.icon}
                {(isExpanded || isHovered || isMobileOpen) && (
                  <>
                    <span>{item.name}</span>
                    <ChevronDown
                      size={16}
                      className={`ml-auto transition-transform ${openTemplate ? "rotate-180" : ""
                        }`}
                    />
                  </>
                )}
              </button>

              {openTemplate && (isExpanded || isHovered || isMobileOpen) && (
                <ul className="ml-8 mt-1 flex flex-col gap-1">
                  {item.subItems.map((sub) => (
                    <li key={sub.name}>
                      <button
                        onClick={() => onNavigate?.(sub.path)}
                        className={`block w-full text-left px-2 py-1 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-0 ${isActive(sub.path) ? "font-semibold text-blue-600" : ""
                          }`}
                      >
                        {sub.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <button
              key={item.name}
              onClick={() => onNavigate?.(item.path!)}
              className={`flex items-center gap-3 w-full px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-0 ${isActive(item.path) ? "bg-gray-100 dark:bg-gray-800 font-semibold text-blue-600" : ""
                }`}
            >
              {item.icon}
              {(isExpanded || isHovered || isMobileOpen) && <span>{item.name}</span>}
            </button>
          )
        )}
      </nav>
    </aside>
  );
}
