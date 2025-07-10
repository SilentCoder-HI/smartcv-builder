const sampleJobs = [
  { title: "Frontend Engineer", company: "Acme Corp", location: "Remote", match: 87 },
  { title: "Data Scientist", company: "Techify", location: "Bangalore", match: 79 },
];

export function JobBoard() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Job Board</h2>
      <div className="bg-white rounded p-6 shadow">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Title</th>
              <th className="text-left">Company</th>
              <th className="text-left">Location</th>
              <th className="text-left">Match</th>
              <th className="text-left"></th>
            </tr>
          </thead>
          <tbody>
            {sampleJobs.map((job, i) => (
              <tr key={i}>
                <td>{job.title}</td>
                <td>{job.company}</td>
                <td>{job.location}</td>
                <td className="text-blue-800 font-bold">{job.match}%</td>
                <td><button className="px-3 py-1 bg-blue-500 text-white rounded">Save</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}