"use client"

import { Heart, Github, Twitter, Linkedin, Mail, Globe, Coffee } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-gradient-to-br from-blue-50 via-white to-purple-50 border-t border-gray-200 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 dark:border-gray-800 text-gray-700 dark:text-gray-200 transition-colors duration-300">
      <div className="container mx-auto px-4 py-10 max-w-7xl">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10">
          {/* Brand & Description */}
          <div className="flex-1 mb-8 md:mb-0">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow">
                <Coffee className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                SmartCV Builder
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-sm leading-relaxed">
              Build your standout, ATS-friendly resume in minutes with AI-powered templates and smart tools.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <Heart className="h-4 w-4 text-red-500 dark:text-red-400" />
              <span>Made with passion for job seekers</span>
            </div>
          </div>

          {/* Features */}
          <div className="flex-1 mb-8 md:mb-0">
            <h4 className="text-lg font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-sm">AI Content Generation</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-sm">Modern Templates</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                <span className="text-sm">ATS Friendly</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                <span className="text-sm">Live Preview</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm">Easy Export</span>
              </li>
            </ul>
          </div>

          {/* Creator */}
          <div className="flex-1 mb-8 md:mb-0">
            <h4 className="text-lg font-semibold mb-4">Creator</h4>
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">SC</span>
              </div>
              <div>
                <p className="font-medium">Hussnain Iftikhar</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Full-Stack Engineer</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              Building AI-powered tools to help you land your dream job.
            </p>
            <div className="flex space-x-2 mt-3">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
                onClick={() => window.open("https://github.com/SilentCoder-HI/", "_blank")}
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-white"
                onClick={() => window.open("https://twitter.com/SilentCoderHI", "_blank")}
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-500 hover:text-blue-700 dark:text-gray-400 dark:hover:text-white"
                onClick={() => window.open("https://linkedin.com/in/silentcoder-hi", "_blank")}
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-500 hover:text-rose-500 dark:text-gray-400 dark:hover:text-white"
                onClick={() => window.open("mailto:silentcoder.hi@gmail.com", "_blank")}
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="flex-1">
            <h4 className="text-lg font-semibold mb-4">Tech</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-center space-x-2">
                <Globe className="h-4 w-4" />
                <span className="text-sm">Built with Next.js & AI</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">Powered by OpenAI GPT-4</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-gray-300 dark:bg-gray-700" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
            © {currentYear} SmartCV Builder. Crafted with{" "}
            <Heart className="inline h-4 w-4 text-red-500 dark:text-red-400 mx-1" />
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
    </footer>
  )
}

export default Footer