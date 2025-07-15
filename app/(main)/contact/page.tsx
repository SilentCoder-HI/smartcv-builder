"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto py-24 px-4"
    >
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">Contact Us</h1>
      <p className="text-lg text-gray-700 mb-10 text-center">
        Have a question or need help? Fill out the form below, and we’ll get back to you as soon as possible.
      </p>

      <form className="space-y-6">
        <div>
          <label className="block font-medium mb-1 text-gray-800">Name</label>
          <Input type="text" placeholder="Your full name" required />
        </div>

        <div>
          <label className="block font-medium mb-1 text-gray-800">Email</label>
          <Input type="email" placeholder="you@example.com" required />
        </div>

        <div>
          <label className="block font-medium mb-1 text-gray-800">Message</label>
          <Textarea placeholder="Type your message here..." rows={6} required />
        </div>

        <Button className="bg-blue-600 text-white hover:bg-blue-700">Send Message</Button>
      </form>
    </motion.div>
  );
}
