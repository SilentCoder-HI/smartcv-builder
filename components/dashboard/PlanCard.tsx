"use client";

import Link from "next/link";

export default function PlanCard() {
  return (
    <section>
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Your Plan</h3>
      <div className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold text-gray-900">Pro+ Plan</p>
          <p className="text-sm text-gray-600">Next billing date: 2024-07-15</p>
        </div>
        <Link
          href="/dashboard/subscription"
          className="mt-4 md:mt-0 inline-block px-6 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          Manage Subscription
        </Link>
      </div>
    </section>
  );
}