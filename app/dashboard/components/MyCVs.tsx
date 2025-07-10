"use client";

import { useState } from "react";
import {
  Eye,
  Edit2,
  Trash2,
  Plus,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type CV = {
  id: number;
  title: string;
  updatedAt: string;
  description: string;
};

const sampleCVs: CV[] = [
  {
    id: 1,
    title: "Software Engineer CV",
    updatedAt: "2024-05-15",
    description:
      "Experienced software engineer with expertise in frontend and backend development, skilled in React, Node.js, and cloud technologies.",
  },
  {
    id: 2,
    title: "Product Manager CV",
    updatedAt: "2024-04-20",
    description:
      "Product manager with 5+ years experience leading cross-functional teams and delivering successful products in tech industry.",
  },
  {
    id: 3,
    title: "Data Scientist CV",
    updatedAt: "2024-03-10",
    description:
      "Data scientist skilled in machine learning, statistical analysis, and data visualization with Python and R.",
  },
];

export default function MyCVs() {
  const [cvs, setCvs] = useState(sampleCVs);

  const handlePreview = (cv: CV) => {
    alert(`Previewing: ${cv.title}`);
  };

  const handleEdit = (cv: CV) => {
    alert(`Editing: ${cv.title}`);
  };

  const handleDelete = (cvId: number) => {
    const confirmDelete = confirm("Are you sure you want to delete this CV?");
    if (confirmDelete) {
      setCvs(cvs.filter((cv) => cv.id !== cvId));
    }
  };

  return (
    <div className="relative w-full mx-auto p-6 bg-white shadow-md rounded-lg space-y-8">
      {/* Top header */}
      <div className="flex justify-between items-center border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-semibold text-blue-700">My CVs</h2>
        <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
          <Plus size={16} /> Add New CV
        </Button>
      </div>

      {/* CV List */}
      <div className="space-y-6">
        {cvs.map((cv) => (
          <div
            key={cv.id}
            className="border border-gray-200 rounded p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-semibold text-gray-800">{cv.title}</h3>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  onClick={() => handlePreview(cv)}
                >
                  <Eye size={16} /> Preview
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-green-600 hover:text-green-800 flex items-center gap-1"
                  onClick={() => handleEdit(cv)}
                >
                  <Edit2 size={16} /> Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-800 flex items-center gap-1"
                  onClick={() => handleDelete(cv.id)}
                >
                  <Trash2 size={16} /> Delete
                </Button>
              </div>
            </div>
            <p className="text-gray-600 mb-2">Last updated: {cv.updatedAt}</p>
            <p className="text-gray-700">{cv.description}</p>
          </div>
        ))}
      </div>

      {/* Bottom sticky button */}
      <div className="sticky bottom-6 w-full flex justify-center">
        <Button variant="outline" className="flex items-center gap-2 shadow">
          <EyeOff size={16} />
          Preview 2 Mode
        </Button>
      </div>
    </div>
  );
}
