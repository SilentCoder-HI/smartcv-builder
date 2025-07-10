"use client";

import { FileText } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

const Header = () => {
  const { data: session, status } = useSession();

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <FileText className="h-8 w-8 text-blue-600" />
          <Link href="/" className="text-2xl font-bold text-gray-900">
            SmartCV Builder
          </Link>
        </div>

        {/* Main Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">
            Features
          </a>
          <a href="#templates" className="text-gray-600 hover:text-blue-600 transition-colors">
            Templates
          </a>
          <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">
            How It Works
          </a>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          {status === "loading" ? (
            <p className="text-gray-500">Loading...</p>
          ) : session ? (
            <>
              <Link
                href="/dashboard"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Dashboard
              </Link>
              <button
                onClick={() => signOut()}
                className="text-sm text-gray-600 hover:text-red-600 transition"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href={"/auth?mode=signin"}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
