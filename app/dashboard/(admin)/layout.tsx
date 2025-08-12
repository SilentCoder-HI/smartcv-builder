"use client";

import ClientInitializer from "@/components/providers/ClientInitializer";
import ReduxProvider from "@/components/providers/ReduxProvider";
import { useSidebar } from "@dashboard/context/SidebarContext";
import Backdrop from "@dashboard/layout/Backdrop";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { Toaster } from "sonner";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  // Dynamic class for main content margin based on sidebar state
  // const mainContentMargin = isMobileOpen
  //   ? "ml-0"
  //   : isExpanded || isHovered
  //     ? "lg:ml-[290px]"
  //     : "lg:ml-[90px]";

  return (
    <SessionProvider>
      <ReduxProvider>
        <ClientInitializer>
          <Toaster richColors position="top-right"/>
          <div className="min-h-screen">
            <Backdrop />
            <div
              className={`transition-all duration-300 ease-in-out`}
            >
              <div className="mx-auto">{children}</div>
            </div>
          </div>
        </ClientInitializer>
      </ReduxProvider>
    </SessionProvider>
  );
}
