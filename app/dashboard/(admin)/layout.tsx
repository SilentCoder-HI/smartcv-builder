"use client";

import { useSidebar } from "@dashboard/context/SidebarContext";
import AppHeader from "@dashboard/layout/AppHeader";
import AppSidebar from "@dashboard/layout/AppSidebar";
import Backdrop from "@dashboard/layout/Backdrop";
import { SessionProvider } from "next-auth/react";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
      ? "lg:ml-[290px]"
      : "lg:ml-[90px]";

  return (
    <SessionProvider>
      <div className="min-h-screen xl:flex">
        {/* Sidebar and Backdrop */}
        {/* <AppSidebar /> */}
        <Backdrop />
        {/* Main Content Area */}
        <div
          className={`flex-1 transition-all  duration-300 ease-in-out ${mainContentMargin}`}
        >
          {/* Header */}
          <AppHeader />
          {/* Page Content */}
          <div className="mx-auto">{children}</div>
        </div>
      </div>
    </SessionProvider>
  );
}
