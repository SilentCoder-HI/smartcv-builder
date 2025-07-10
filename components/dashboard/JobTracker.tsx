const sampleTracked = [
  { job: "Frontend Engineer @ Acme", status: "Interview" },
  { job: "Data Scientist @ Techify", status: "Offer" },
];
export function JobTracker() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Job Tracker</h2>
      <div className="bg-white rounded p-6 shadow">
        <ul className="space-y-2">
          {sampleTracked.map((jt, i) => (
            <li key={i}>
              <span className="font-medium">{jt.job}</span> — <span className={jt.status === "Offer" ? "text-green-600" : "text-blue-600"}>{jt.status}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}