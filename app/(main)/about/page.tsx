'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaBars, FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { Bot, Paintbrush, Shield } from 'lucide-react';

export default function AboutPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen">
      <main className="max-w-5xl mx-auto px-6 py-20">
        <section className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl font-extrabold text-indigo-700 mb-6 leading-tight">
            About Smart CV Builder
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Smart CV Builder is a powerful AI-driven resume and CV creation platform built especially for
            students and professionals who want to create polished, effective resumes quickly and easily. As a
            solo developer and designer, I have crafted every aspect of this app with care and dedication to
            provide a seamless, professional experience.
          </p>
        </section>

        <section className="bg-white rounded-2xl shadow-lg p-12 mb-20">
          <h2 className="text-3xl font-bold text-indigo-700 mb-8 text-center">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            <div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-indigo-600 mb-4">AI-Powered Resume Builder</h3>
                <p className="text-gray-700 leading-relaxed">
                  Create professional, ATS-friendly resumes with the help of AI suggestions that improve grammar,
                  tone, and content relevance.
                </p>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-indigo-600 mb-4">Real-Time Editing & Preview</h3>
                <p className="text-gray-700 leading-relaxed">
                  Build your resume section by section with instant preview so you always know how your final CV
                  will look.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-indigo-600 mb-4">Multiple Export Options</h3>
                <p className="text-gray-700 leading-relaxed">
                  Export your resume as PDF or Word document, ready to send to recruiters or upload to job
                  portals.
                </p>
              </div>
            </div>
            <div>
              <Image
                alt="Laptop screen showing a clean, modern resume builder interface with AI suggestions"
                src="https://storage.googleapis.com/a1aa/image/b29f3b00-17e4-408e-2ad5-b52b6108d126.jpg"
                width={600}
                height={400}
                className="rounded-2xl shadow-lg w-full object-cover"
              />
            </div>
          </div>
        </section>
        <section aria-label="Why Choose Smart CV Builder" className="max-w-6xl mx-auto my-20">
          <h2 className="text-4xl font-extrabold text-indigo-700 mb-12 text-center">
            Why Choose Smart CV Builder?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center">
              {/* AI Icon */}
              <span aria-hidden="true" className="text-indigo-600 text-6xl mb-6">
                {/* lucide-react: Bot */}
                <Bot size={70} />
              </span>
              <h3 className="text-2xl font-semibold mb-3">
                AI-Powered Precision
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Our advanced AI engine crafts tailored resumes and cover letters
                that pass ATS filters and impress recruiters.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center">
              {/* Template Icon */}
              <span aria-hidden="true" className="text-indigo-600 text-6xl mb-6">
                {/* lucide-react: Paintbrush */}
                <Paintbrush size={70} />
              </span>
              <h3 className="text-2xl font-semibold mb-3">
                Professional Templates
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Choose from a curated collection of modern, ATS-optimized templates
                designed by industry experts.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center">
              {/* Security Icon */}
              <span aria-hidden="true" className="text-indigo-600 text-6xl mb-6">
                {/* lucide-react: Shield */}
                <Shield size={70} />
              </span>
              <h3 className="text-2xl font-semibold mb-3">
                Security &amp; Privacy
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                We prioritize your data security with end-to-end encryption and
                strict GDPR compliance.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-indigo-700 mb-8">Built With Passion & Precision</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            As a solo developer and designer, I have poured my passion and expertise into building Smart CV
            Builder from the ground up. Every feature, design element, and AI integration is thoughtfully created
            to help you succeed in your career journey.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Whether you are a student preparing your first resume or a professional looking to update your CV,
            Smart CV Builder is designed to make the process simple, efficient, and effective.
          </p>
        </section>
      </main>
    </div>
  );
}
