"use client";

import { useState } from "react";
import { Eye, Edit2, Trash2, Plus, FilePlus2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type CV = {
  id: number;
  title: string;
  updatedAt: string;
  description: string;
  profile: string;
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
  const [newProfile, setNewProfile] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [showAddCV, setShowAddCV] = useState(false);

  // Add new CV Profile section
  const handleAddCV = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProfile || !newTitle) return;
    setCvs([
      ...cvs,
      {
        id: Date.now(),
        title: newTitle,
        updatedAt: new Date().toISOString().slice(0, 10),
        description: newDescription,
        profile: newProfile,
      },
    ]);
    setNewProfile("");
    setNewTitle("");
    setNewDescription("");
    setShowAddCV(false);
  };

  const handlePreview = (cv: CV) => alert(`Previewing: ${cv.title}`);
  const handleEdit = (cv: CV) => alert(`Editing: ${cv.title}`);
  const handleDelete = (cvId: number) => {
    const confirmDelete = confirm("Are you sure you want to delete this CV?");
    if (confirmDelete) setCvs(cvs.filter((cv) => cv.id !== cvId));
  };

  const profiles = Array.from(new Set(cvs.map((cv) => cv.profile)));

  return (
    <div className="max-w-7xl mx-auto py-5 px-3 sm:px-5 bg-white">
      {/* Top Section: Add CV Profile */}
      <div className="mb-8">
        <div className="flex justify-between items-center border-b pb-4 border-gray-200">
          <h2 className="text-2xl font-semibold text-blue-700">Add CV Profile</h2>
          <Button
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => setShowAddCV((v) => !v)}
          >
            <Plus size={16} /> {showAddCV ? "Cancel" : "Add New CV"}
          </Button>
        </div>
        {showAddCV && (
          <form
            onSubmit={handleAddCV}
            className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profile Name
              </label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                placeholder="e.g. Tech Profile"
                value={newProfile}
                onChange={(e) => setNewProfile(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CV Title
              </label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                placeholder="e.g. Software Engineer CV"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                placeholder="Short description"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
            </div>
            <div className="md:col-span-3 flex justify-end mt-2">
              <Button
                type="submit"
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
              >
                <FilePlus2 size={16} /> Create CV Profile
              </Button>
            </div>
          </form>
        )}
      </div>

      {/* Bottom Section: Use CV Profile with Templates */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Your CV Profiles</h2>
          <span className="text-sm text-gray-500">
            Use a template to create a CV from your profiles
          </span>
        </div>
        {profiles.length === 0 ? (
          <div className="text-center text-gray-500 py-10">No CV profiles yet. Add one above!</div>
        ) : (
          profiles.map((profileName) => {
            const profileCVs = cvs.filter((cv) => cv.profile === profileName);

            return (
              <div key={profileName} className="space-y-4 mb-8">
                <h3 className="text-lg font-bold text-blue-700 border-b pb-2">
                  {profileName}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {profileCVs.map((cv) => (
                    <div
                      key={cv.id}
                      className="group border border-gray-200 rounded-lg p-4 shadow-md transition-all duration-200 hover:scale-[1.02] hover:shadow-lg cursor-pointer bg-white"
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
          })
        )}
      </div>

      {/* Sticky Footer Button */}
      <div className="sticky bottom-6 w-full flex justify-center">
        <Button variant="outline" className="flex items-center gap-2 shadow">
          <Eye size={16} /> Use Template with Profile
        </Button>
      </div>
    </div>
  );
}
