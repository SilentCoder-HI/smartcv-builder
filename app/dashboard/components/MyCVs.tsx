"use client";

import { useState } from "react";
import { Eye, Edit2, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

type CV = {
  id: number;
  title: string;
  updatedAt: string;
  description: string;
  profile: string; // NEW: Profile name
};

const sampleCVs: CV[] = [
  {
    id: 1,
    title: "Software Engineer CV",
    updatedAt: "2024-05-15",
    description:
      "Experienced software engineer skilled in frontend, backend, and cloud tech.",
    profile: "Tech Profile",
  },
  {
    id: 2,
    title: "Product Manager CV",
    updatedAt: "2024-04-20",
    description:
      "Product manager with 5+ years of experience in cross-functional leadership.",
    profile: "Management Profile",
  },
  {
    id: 3,
    title: "Data Scientist CV",
    updatedAt: "2024-03-10",
    description:
      "Expert in machine learning, analysis, and data visualization using Python.",
    profile: "Tech Profile",
  },
];

export default function MyCVs() {
  const [cvs, setCvs] = useState(sampleCVs);

  const handlePreview = (cv: CV) => alert(`Previewing: ${cv.title}`);
  const handleEdit = (cv: CV) => alert(`Editing: ${cv.title}`);
  const handleDelete = (cvId: number) => {
    const confirmDelete = confirm("Are you sure you want to delete this CV?");
    if (confirmDelete) setCvs(cvs.filter((cv) => cv.id !== cvId));
  };

  const profiles = Array.from(new Set(cvs.map((cv) => cv.profile)));

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4 border-gray-200">
        <h2 className="text-2xl font-semibold text-blue-700">My CV Profiles</h2>
        <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
          <Plus size={16} /> Add New CV
        </Button>
      </div>

      {/* Grouped CVs by Profile */}
      {profiles.map((profileName) => {
        const profileCVs = cvs.filter((cv) => cv.profile === profileName);

        return (
          <div key={profileName} className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 border-b pb-2">
              {profileName}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {profileCVs.map((cv) => (
                <div
                  key={cv.id}
                  className="group border border-gray-200 rounded-lg p-4 shadow-md transition-all duration-200 hover:scale-[1.02] hover:shadow-lg cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">
                        {cv.title}
                      </h4>
                      <p className="text-sm text-gray-500">
                        Updated: {cv.updatedAt}
                      </p>
                    </div>
                    <Eye
                      size={20}
                      className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    />
                  </div>

                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {cv.description}
                  </p>

                  <div className="flex justify-between border-t pt-3 mt-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handlePreview(cv)}
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <Eye size={16} /> Preview
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(cv)}
                      className="text-green-600 hover:text-green-800 flex items-center gap-1"
                    >
                      <Edit2 size={16} /> Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(cv.id)}
                      className="text-red-600 hover:text-red-800 flex items-center gap-1"
                    >
                      <Trash2 size={16} /> Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Sticky Footer Button */}
      <div className="sticky bottom-6 w-full flex justify-center">
        <Button variant="outline" className="flex items-center gap-2 shadow">
          <Eye size={16} /> Preview 2 Mode
        </Button>
      </div>
    </div>
  );
}
