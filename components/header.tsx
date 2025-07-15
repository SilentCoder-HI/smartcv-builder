"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
import { FileText } from "lucide-react";

const NAV_DROPDOWNS = [
  {
    label: "Resume Templates",
    id: "resume-templates",
    items: [
      { label: "All Templates", href: "/templates" },
      { label: "Modern", href: "/templates?type=modern" },
      { label: "Professional", href: "/templates?type=professional" },
      { label: "Creative", href: "/templates?type=creative" },
    ],
  },
  {
    label: "Resources",
    id: "resources",
    items: [
      { label: "Blog", href: "/blog" },
      { label: "Resume Tips", href: "/blog/resume-tips" },
      { label: "Job Search", href: "/blog/job-search" },
      { label: "Career Advice", href: "/blog/career-advice" },
    ],
  },
];

const NAV_LINKS = [
  { label: "Pricing", href: "/pricing" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();
  const { data: session, status } = useSession();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <Link href="/"
          className="flex items-center gap-2 text-2xl font-bold focus:outline-none focus:ring-0"
        >

          <FileText className="text-blue-600" size={28} />
          {"SmartCV"}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center text-sm font-medium text-gray-700 dark:text-gray-200">
          {NAV_DROPDOWNS.map((dropdown) => (
            <div className="relative group" key={dropdown.id}>
              <button
                onClick={() => setOpenDropdown(dropdown.id === openDropdown ? null : dropdown.id)}
                className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400"
              >
                {dropdown.label}
                <i className={`fas fa-chevron-down text-xs transition-transform ${openDropdown === dropdown.id ? "rotate-180" : ""}`} />
              </button>
              {openDropdown === dropdown.id && (
                <div className="absolute bg-white dark:bg-gray-800 mt-2 rounded shadow-lg border border-gray-200 dark:border-gray-700 w-48">
                  {dropdown.items.map((item) => (
                    <Link key={item.href} href={item.href} className="block px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700">
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-blue-600 dark:hover:text-blue-400">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
            aria-label="Toggle Theme"
          >
            <i className={`fas ${theme === "dark" ? "fa-sun" : "fa-moon"}`} />
          </button>

          {status === "authenticated" ? (
            <Link href="/dashboard" className="hidden md:inline px-4 py-2 rounded-md text-blue-600 border border-blue-600 dark:border-gray-600 text-sm font-semibold dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
              Dashboard
            </Link>
          ) : (
            <Link href="/auth?mode=signin" className="hidden md:inline px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700">
              Sign In
            </Link>
          )}

          <button
            className="md:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <i className={`fas ${mobileMenuOpen ? "fa-times" : "fa-bars"}`} />
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 py-4 space-y-2 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          {[...NAV_DROPDOWNS, ...NAV_LINKS].map((item: any) => (
            "items" in item ? (
              <div key={item.id}>
                <div className="font-semibold py-2">{item.label}</div>
                {item.items.map((subItem: any) => (
                  <Link
                    key={subItem.href}
                    href={subItem.href}
                    className="block pl-4 py-1 text-sm hover:text-blue-600 dark:hover:text-blue-400"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {subItem.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="block py-2 font-medium hover:text-blue-600 dark:hover:text-blue-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            )
          ))}
          {status === "authenticated" ? (
            <Link
              href="/app"
              className="block py-2 font-medium hover:text-blue-600 dark:hover:text-blue-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/auth?mode=signin"
              className="block py-2 font-medium hover:text-blue-600 dark:hover:text-blue-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;