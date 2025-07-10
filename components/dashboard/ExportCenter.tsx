export function ExportCenter() {
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">Export Center</h2>
        <div className="bg-white rounded p-6 shadow">
          <p>Download your CV as PDF or Word.</p>
          <div className="mt-4 flex gap-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded">Export PDF</button>
            <button className="px-4 py-2 bg-gray-600 text-white rounded">Export Word</button>
          </div>
        </div>
      </div>
    );
  }