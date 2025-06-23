import { FileText } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FileText className="h-8 w-8 text-blue-600" />
          <Link href={'/'} className="text-2xl font-bold text-gray-900">SmartCV Builder</Link>
        </div>
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
      </div>
    </header>
  );
};

export default Header;
