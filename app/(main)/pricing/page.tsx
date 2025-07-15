"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0/month",
    description: "Perfect for getting started with basic features.",
    features: [
      "3 Professional Templates",
      "PDF Export",
      "1 CV Profile",
      "Basic Job Board Access",
      "Limited AI Suggestions",
      "Community Support",
    ],
    buttonText: "Start for Free",
    href: "/auth?mode=signup",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$4.99/month",
    description: "Ideal for job seekers looking to stand out.",
    features: [
      "25+ Premium Templates",
      "AI Resume Assistant",
      "PDF & Word Export",
      "Unlimited CV Profiles",
      "AI Cover Letter Generator",
      "Job-CV Match Analyzer",
      "Priority Email Support",
    ],
    buttonText: "Upgrade to Pro",
    href: "/auth?mode=signup",
    highlight: true,
  },
  {
    name: "Pro+",
    price: "$9.99/month",
    description: "Best for professionals and power users.",
    features: [
      "All Pro Features",
      "Job Tracker & Notifications",
      "LinkedIn Sync & Import",
      "Real-time Collaboration",
      "Interview Q&A Generator",
      "Priority Support + Chat",
    ],
    buttonText: "Go Pro+",
    href: "/auth?mode=signup",
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-white pt-24 pb-32 px-4"
    >
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto mb-20">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl text-gray-600">
          Choose the plan that fits your job search. Smart CV Builder is free to try, no credit card required.
        </p>
      </div>

      {/* Plans */}
      <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto px-2 sm:px-0">
        {plans.map((plan, idx) => (
          <Card
            key={idx}
            className={`relative border-2 ${
              plan.highlight ? "border-blue-600" : "border-gray-200"
            } shadow-md rounded-2xl hover:scale-[1.02] transition-transform duration-200`}
          >
            {plan.highlight && (
              <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow">
                Most Popular
              </span>
            )}
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="text-4xl font-bold mt-4">{plan.price}</div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 mb-6 mt-4">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-2" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link href={plan.href}>
                <Button className="w-full">{plan.buttonText}</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* FAQ Section */}
      <section
        aria-label="Frequently Asked Questions"
        className="mt-32 max-w-4xl mx-auto text-gray-800 px-2 sm:px-0"
      >
        <h2 className="text-3xl font-bold mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          <details className="bg-white rounded-lg shadow p-5 border border-gray-200">
            <summary className="font-semibold text-lg cursor-pointer select-none">
              Is there a free version of Smart CV Builder?
            </summary>
            <p className="mt-3 text-gray-700">
              Yes! You can use Smart CV Builder for free with access to basic templates, manual resume building, PDF export, and limited job board access. No credit card required.
            </p>
          </details>
          <details className="bg-white rounded-lg shadow p-5 border border-gray-200">
            <summary className="font-semibold text-lg cursor-pointer select-none">
              What do I get with a paid plan?
            </summary>
            <p className="mt-3 text-gray-700">
              Paid plans unlock premium templates, AI resume and cover letter writing, Word export, multiple CV profiles, ATS optimization, and more advanced features to boost your job search.
            </p>
          </details>
          <details className="bg-white rounded-lg shadow p-5 border border-gray-200">
            <summary className="font-semibold text-lg cursor-pointer select-none">
              Can I cancel or change my subscription anytime?
            </summary>
            <p className="mt-3 text-gray-700">
              Absolutely! You can upgrade, downgrade, or cancel your subscription at any time from your account dashboard. Your data and resumes remain safe.
            </p>
          </details>
          <details className="bg-white rounded-lg shadow p-5 border border-gray-200">
            <summary className="font-semibold text-lg cursor-pointer select-none">
              Do you offer refunds?
            </summary>
            <p className="mt-3 text-gray-700">
              Yes, we offer a 7-day money-back guarantee if you’re not satisfied with your purchase.
            </p>
          </details>
          <details className="bg-white rounded-lg shadow p-5 border border-gray-200">
            <summary className="font-semibold text-lg cursor-pointer select-none">
              Is my payment and data secure?
            </summary>
            <p className="mt-3 text-gray-700">
              100%. All payments are processed securely, and your data is encrypted and never shared. We are fully GDPR-compliant.
            </p>
          </details>
        </div>
      </section>
    </motion.div>
  );
}
