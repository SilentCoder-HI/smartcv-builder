"use client"

import { Heart, Github, Twitter, Linkedin, Mail, Globe, Coffee } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-20 border-t border-gray-200 dark:border-gray-700 text-gray-700 dark:text-white bg-transparent dark:bg-transparent backdrop-blur-sm transition-colors duration-300">
      {/* Main Footer Content */}
      <div className="container px-4 py-12 w-full max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                <Coffee className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  SmartCV Builder
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">AI-powered Resume Builder</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md leading-relaxed">
              Create professional, ATS-friendly resumes in minutes with smart templates and AI assistance.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <Heart className="h-4 w-4 text-red-500 dark:text-red-400" />
              <span>Made with passion for job seekers worldwide</span>
            </div>
          </div>

          {/* Creator Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Creator</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">SC</span>
                </div>
                <div>
                  <p className="font-medium">Hussnain Iftikhar</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Full-Stack Engineer</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                Passionate about building AI-powered tools to help you land your dream job.
              </p>
            </div>
          </div>

          {/* Quick Links / Features */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                <span className="text-sm hover:text-blue-600 dark:hover:text-white cursor-pointer transition-colors">AI Content Generation</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                <span className="text-sm hover:text-purple-600 dark:hover:text-white cursor-pointer transition-colors">Modern Templates</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
                <span className="text-sm hover:text-indigo-600 dark:hover:text-white cursor-pointer transition-colors">ATS Friendly</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-teal-400 rounded-full"></div>
                <span className="text-sm hover:text-teal-600 dark:hover:text-white cursor-pointer transition-colors">Live Preview</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                <span className="text-sm hover:text-green-600 dark:hover:text-white cursor-pointer transition-colors">Easy Export</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-gray-300 dark:bg-gray-700" />

        {/* Social Links & Tech Stack */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <span className="text-gray-500 dark:text-gray-400 text-sm">Connect with the creator:</span>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
                onClick={() => window.open("https://github.com/SilentCoder-HI/", "_blank")}
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-white"
                onClick={() => window.open("https://twitter.com/SilentCoderHI", "_blank")}
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-blue-700 dark:text-gray-400 dark:hover:text-white"
                onClick={() => window.open("https://linkedin.com/in/silentcoder-hi", "_blank")}
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-rose-500 dark:text-gray-400 dark:hover:text-white"
                onClick={() => window.open("mailto:silentcoder.hi@gmail.com", "_blank")}
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <span>Built with Next.js & AI</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Powered by OpenAI GPT-4</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-300 dark:border-gray-700 bg-gray-100/70 dark:bg-gray-900/40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              © {currentYear} SmartCV Builder. Crafted with <Heart className="inline h-4 w-4 text-red-500 dark:text-red-400 mx-1" />
              for job seekers everywhere.
            </p>
            <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
              <span className="hover:text-black dark:hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
              <span>•</span>
              <span className="hover:text-black dark:hover:text-white cursor-pointer transition-colors">Terms of Service</span>
              <span>•</span>
              <span className="hover:text-black dark:hover:text-white cursor-pointer transition-colors">Contact</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer