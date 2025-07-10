import { useState } from "react";

const sampleCVs = [
  { id: 1, name: "Software Engineer CV", updated: "2025-07-09" },
  { id: 2, name: "Data Scientist CV", updated: "2025-06-20" },
];

export function MyCVs() {
  const [cvs, setCVs] = useState(sampleCVs);

  function handleCreate() {
    setCVs([...cvs, { id: cvs.length + 1, name: `New CV #${cvs.length + 1}`, updated: new Date().toISOString().slice(0, 10) }]);
  }

  function handleDelete(id: number) {
    setCVs(cvs.filter(cv => cv.id !== id));
  }

  function handleExport(cvName: string) {
    alert(`Exporting ${cvName}...`);
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My CVs</h2>
      <button className="mb-4 bg-blue-600 text-white px-4 py-2 rounded" onClick={handleCreate}>Create New CV</button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cvs.map(cv => (
          <div key={cv.id} className="p-4 border rounded shadow flex justify-between items-center">
            <div>
              <div className="font-semibold">{cv.name}</div>
              <div className="text-xs text-gray-500">Last updated: {cv.updated}</div>
            </div>
            <div className="flex gap-2">
              <button className="text-blue-600 font-bold">Edit</button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={() => handleExport(cv.name)}>Export</button>
              <button className="text-red-600" onClick={() => handleDelete(cv.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}