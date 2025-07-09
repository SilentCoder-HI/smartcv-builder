'use client';

import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, easeInOut } from 'framer-motion';
import Link from 'next/link';
import {
  Github,
  Linkedin,
  Mail,
  Lock,
  EyeOff,
  LogIn,
  UserPlus,
} from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';

interface AuthPageProps {
  mode: 'signin' | 'signup';
}

export default function AuthComp({ mode }: AuthPageProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>(mode);
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    setActiveTab(mode); // update if mode changes from parent
  }, [mode]);

  const handleTabChange = (tab: 'signin' | 'signup') => {
    setActiveTab(tab);
    router.push(`/auth?mode=${tab}`);
  };

  const handleSocialSignIn = async (provider: string) => {
    setLoadingProvider(provider);
    await signIn(provider, { callbackUrl: '/' });
    setLoadingProvider(null);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    // TODO: handle your credentials login/register here
    setTimeout(() => {
      setFormLoading(false);
    }, 1000);
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: easeInOut },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3, ease: easeInOut },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4">
      <div className="container mx-auto max-w-4xl bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
        {/* Mobile Tabs */}
        <div className="flex md:hidden border-b border-gray-200">
          {(['signin', 'signup'] as const).map((tab) => (
            <button
              key={tab}
              className={`flex-1 py-4 text-lg font-semibold transition-colors duration-300 ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-blue-500'
              }`}
              onClick={() => handleTabChange(tab)}
            >
              {tab === 'signin' ? 'Sign In' : 'Sign Up'}
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className={`w-full md:w-1/2 p-8 md:p-12 ${
                activeTab === 'signup' ? 'bg-gray-50' : ''
              }`}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
                {activeTab === 'signin' ? 'Sign In' : 'Sign Up'}
              </h2>
              <p className="text-gray-600 text-center mb-6">
                {activeTab === 'signin'
                  ? 'Access your SmartCV account'
                  : 'Create your SmartCV account'}
              </p>

              <div className="space-y-4">
                {[
                  {
                    id: 'google',
                    name: 'Google',
                    icon: <FcGoogle className="w-5 h-5" />,
                    style:
                      'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100',
                  },
                  {
                    id: 'github',
                    name: 'GitHub',
                    icon: <Github className="w-5 h-5" />,
                    style: 'bg-gray-800 text-white hover:bg-gray-900',
                  },
                  {
                    id: 'linkedin',
                    name: 'LinkedIn',
                    icon: <Linkedin className="w-5 h-5" />,
                    style: 'bg-blue-700 text-white hover:bg-blue-800',
                  },
                ].map(({ id, name, icon, style }) => (
                  <button
                    key={id}
                    onClick={() => handleSocialSignIn(id)}
                    disabled={loadingProvider === id}
                    className={`w-full inline-flex items-center justify-center gap-2 h-11 rounded-md font-medium text-lg transition duration-200 ${style} ${
                      loadingProvider === id ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {icon}
                    <span className="text-sm">
                      {loadingProvider === id ? 'Loading...' : `Sign ${activeTab === 'signin' ? 'in' : 'up'} with ${name}`}
                    </span>
                  </button>
                ))}

                <div className="flex items-center justify-center gap-2 my-6">
                  <hr className="w-full border-gray-300" />
                  <span className="text-gray-400 text-sm">OR</span>
                  <hr className="w-full border-gray-300" />
                </div>

                <form className="space-y-4" onSubmit={handleFormSubmit}>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        className="w-full h-11 pl-10 rounded-md border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="w-full h-11 pl-10 rounded-md border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                      />
                    </div>
                  </div>

                  {activeTab === 'signup' && (
                    <div>
                      <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <EyeOff className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          id="confirm-password"
                          type="password"
                          placeholder="••••••••"
                          className="w-full h-11 pl-10 rounded-md border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === 'signin' && (
                    <div className="flex justify-between items-center">
                      <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                        Forgot Password?
                      </Link>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={formLoading}
                    className="w-full h-11 rounded-md bg-blue-600 text-white hover:bg-blue-700 font-semibold text-lg transition-colors inline-flex justify-center items-center gap-2"
                  >
                    {formLoading ? 'Processing...' : (
                      <>
                        {activeTab === 'signin' ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                        {activeTab === 'signin' ? 'Sign In' : 'Sign Up'}
                      </>
                    )}
                  </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-6">
                  {activeTab === 'signin'
                    ? "Don't have an account?"
                    : 'Already have an account?'}{' '}
                  <button
                    onClick={() => handleTabChange(activeTab === 'signin' ? 'signup' : 'signin')}
                    className="text-blue-600 hover:underline"
                  >
                    {activeTab === 'signin' ? 'Sign Up' : 'Sign In'}
                  </button>
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Side Banner */}
          <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-purple-600 text-white p-12 flex-col justify-center items-center gap-4">
            <h3 className="text-3xl font-bold">Welcome to SmartCV</h3>
            <p className="text-lg text-center">
              Build professional resumes effortlessly and get noticed faster.
            </p>
            <div className="flex gap-2 mt-4">
              <span className="bg-white text-blue-600 text-xs px-3 py-1 rounded-full">Secure</span>
              <span className="bg-white text-blue-600 text-xs px-3 py-1 rounded-full">Modern UI</span>
              <span className="bg-white text-blue-600 text-xs px-3 py-1 rounded-full">100% Free</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
