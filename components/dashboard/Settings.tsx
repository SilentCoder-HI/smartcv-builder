export function Settings() {
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">Settings</h2>
        <div className="bg-white rounded p-6 shadow space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Theme</label>
            <select className="w-full border rounded py-2 px-3">
              <option>Light</option>
              <option>Dark</option>
              <option>System</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Language</label>
            <select className="w-full border rounded py-2 px-3">
              <option>English</option>
              <option>Hindi</option>
              <option>Spanish</option>
            </select>
          </div>
          <div className="bg-blue-50 p-4 rounded flex items-center justify-between">
            <span>
              <span className="font-semibold">Current Plan:</span> <span className="text-green-700">Pro</span>
            </span>
            <button className="bg-yellow-600 text-white px-4 py-2 rounded">Upgrade</button>
          </div>
          <div className="flex gap-4">
            <button className="bg-blue-700 text-white px-4 py-2 rounded">Sync LinkedIn</button>
            <button className="bg-gray-800 text-white px-4 py-2 rounded" onClick={() => alert("Contact: support@smartcv.com")}>
              Support
            </button>
          </div>
        </div>
      </div>
    );
  }