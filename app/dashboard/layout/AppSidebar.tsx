"use client";

import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import {
  FileText,
  Sparkles,
  LayoutDashboard,
  ScrollText,
  BriefcaseBusiness,
  Download,
  Settings,
  Star,
  ChevronDown,
  Layers,
} from "lucide-react";
import { useState, useRef } from "react";

type MenuItem = {
  name: string;
  path?: string;
  icon: React.ReactNode;
  subItems?: { name: string; path: string; sub?: string }[];
};

type AppSidebarProps = {
  onNavigate?: (path: string, sub?: string) => void;
  selectedView?: string;
  selectedSub?: string;
};

const menu: MenuItem[] = [
  {
    name: "Dashboard",
    path: "/overview",
    icon: <LayoutDashboard size={30} strokeWidth={1} />,
  },
  {
    name: "My CVs",
    path: "/my-cvs",
    icon: <ScrollText size={30} strokeWidth={1} />,
  },
  {
    name: "AI Assistant",
    path: "/ai-assistant",
    icon: <Sparkles size={30} strokeWidth={1} />,
  },
  {
    name: "Templates",
    path: "/templates",
    icon: <Layers size={30} strokeWidth={1} />,
  },
  {
    name: "Job Search",
    path: "/job-search",
    icon: <BriefcaseBusiness size={30} strokeWidth={1} />,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: <Settings size={30} strokeWidth={1} />,
  },
  {
    name: "Upgrade to Pro",
    path: "/upgrade",
    icon: <Star size={30} strokeWidth={1} className="text-yellow-500" />,
  },
];

export default function AppSidebar({
  onNavigate,
  selectedView,
  selectedSub,
}: AppSidebarProps) {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const [openTemplate, setOpenTemplate] = useState(false);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isActive = (path?: string, sub?: string) =>
    path === selectedView && sub === selectedSub;

  // Responsive width and show/hide logic
  const sidebarOpen = isExpanded || isMobileOpen || isHovered;
  const sidebarWidth = sidebarOpen ? "w-[250px]" : "w-[80px]";
  const sidebarTranslate =
    isMobileOpen ? "translate-x-0" : "-translate-x-full";
  // On desktop, always visible; on mobile, slide in/out
  const sidebarClasses = [
    "fixed", // not flex, use fixed for sidebar
    "top-0",
    "left-0",
    "z-30",
    "h-screen",
    "border-r",
    "border-gray-200",
    "dark:border-gray-800",
    "text-gray-900",
    "dark:text-white",
    "px-5",
    "pt-6",
    "transition-all",
    "duration-300",
    sidebarWidth,
    "lg:translate-x-0",
    "lg:static",
    "lg:block",
    isMobileOpen ? "block" : "hidden",
    "lg:flex", // only use flex on large screens for layout, not for sizing
  ].join(" ");

  // Mouse hover logic
  const handleMouseEnter = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => setIsHovered(false), 200);
  };

  return (
    <aside
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={sidebarClasses}
      style={{
        minWidth: sidebarOpen ? 220 : 64,
        maxWidth: 300,
        width: sidebarOpen ? 250 : 80,
        boxSizing: "border-box",
        display: "block",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <button
          onClick={() => onNavigate?.("/")}
          className="flex items-center gap-2 px-2 mb-8 text-xl font-bold focus:outline-none focus:ring-0"
          style={{
            minHeight: 48,
            alignItems: "center",
            display: "flex",
          }}
        >
          <FileText className="text-blue-600" size={28} />
          {sidebarOpen && <span>SmartCV</span>}
        </button>

        <p className="px-3 py-2" style={{ minHeight: 32 }}>
          {sidebarOpen ? "Menu" : "...."}
        </p>

        <nav
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            overflowY: "auto",
          }}
        >
          {menu.map((item) =>
            item.subItems ? (
              <div key={item.name}>
                <button
                  onClick={() => setOpenTemplate((prev) => !prev)}
                  className={`flex items-center gap-3 w-full px-3 py-2 rounded-md text-left focus:outline-none focus:ring-0 hover:bg-gray-100 dark:hover:bg-gray-800 ${openTemplate ? "bg-gray-100 dark:bg-gray-800" : ""
                    }`}
                  style={{
                    minHeight: 40,
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {item.icon}
                  {sidebarOpen && (
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

                {openTemplate && sidebarOpen && (
                  <ul
                    className="mt-1"
                    style={{
                      marginLeft: 24,
                      display: "flex",
                      flexDirection: "column",
                      gap: 4,
                    }}
                  >
                    {item.subItems.map((sub) => (
                      <li key={sub.name}>
                        <button
                          onClick={() => onNavigate?.(sub.path, sub.sub)}
                          className={`block w-full text-left px-2 py-1 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-0 ${isActive(sub.path, sub.sub)
                              ? "font-semibold text-blue-600"
                              : ""
                            }`}
                          style={{
                            width: "100%",
                            textAlign: "left",
                            minHeight: 32,
                          }}
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
                className={`flex items-center gap-3 w-full px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-0 ${isActive(item.path)
                    ? "bg-gray-100 dark:bg-gray-800 font-semibold text-blue-600"
                    : ""
                  }`}
                style={{
                  minHeight: 40,
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {item.icon}
                {sidebarOpen && <span>{item.name}</span>}
              </button>
            )
          )}
        </nav>
      </div>
    </aside>
  );
}
