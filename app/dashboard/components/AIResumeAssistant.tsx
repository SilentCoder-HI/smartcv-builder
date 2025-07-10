import { useState } from 'react';

export default function AIResumeAssistant() {
  const [jobTitle, setJobTitle] = useState('');
  const [tone, setTone] = useState('professional');
  const [jobDesc, setJobDesc] = useState('');
  const [keywords, setKeywords] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const generateResumeContent = () => {
    let baseContent = [
      `• Designed and developed scalable front-end components using React and Next.js.`,
      `• Implemented UI features with Tailwind CSS for clean, responsive design.`,
      `• Collaborated with back-end developers to integrate APIs and optimize performance.`,
      `• Ensured cross-browser compatibility and optimized page load times.`,
      `• Participated in code reviews and agile development processes.`,
    ];

    if (keywords) {
      keywords.split(',').map(k => k.trim()).forEach(kw => {
        baseContent.unshift(`• Highlighted expertise in ${kw} to meet job requirements.`);
      });
    }

    let toneIntro = '';
    switch (tone) {
      case 'friendly':
        toneIntro = "😊 Here's a friendly and approachable summary of your experience:\n\n";
        break;
      case 'concise':
        toneIntro = "✂️ Concise bullet points highlighting your skills:\n\n";
        baseContent = baseContent.slice(0, 3);
        break;
      case 'detailed':
        toneIntro = "📋 A detailed and comprehensive description of your experience:\n\n";
        baseContent.push(
          `• Demonstrated leadership in project management and team collaboration.`,
          `• Continuously improved code quality through testing and refactoring.`
        );
        break;
      default:
        toneIntro = "💼 Professional summary of your experience:\n\n";
    }

    const closingLines = [
      "🚀 Ready to contribute and grow in your next role.",
      "🌟 Passionate about delivering high-quality software solutions.",
      "🤝 Committed to teamwork and continuous learning."
    ];

    const closingLine = closingLines[Math.floor(Math.random() * closingLines.length)];

    return toneIntro + baseContent.join('\n') + '\n\n' + closingLine + '\n';
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!jobTitle.trim() || !jobDesc.trim()) {
      alert("Please fill in both Job Title and Job Description fields.");
      return;
    }
    setLoading(true);
    setShowResult(false);
    await new Promise((r) => setTimeout(r, 2000));
    const content = generateResumeContent();
    setGeneratedContent(content);
    setLoading(false);
    setShowResult(true);
  };

  const handleCopy = () => {
    if (!generatedContent) return;
    navigator.clipboard.writeText(generatedContent);
  };

  const handleDownload = () => {
    if (!generatedContent) return;
    const blob = new Blob([generatedContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${jobTitle.trim().toLowerCase().replace(/\s+/g, '-') || 'resume'}-content.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full p-5">
      <div className="w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-10 space-y-10 border border-blue-200 dark:border-blue-700">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-4xl font-extrabold flex items-center gap-4 text-blue-700 dark:text-blue-400 select-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M7.05 16.95l-1.414 1.414m12.728 0l-1.414-1.414M7.05 7.05L5.636 5.636" /></svg>
            AI Resume Assistant
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md sm:max-w-xs">
            Generate tailored, professional resume content instantly with AI.
          </p>
        </header>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={handleSubmit} autoComplete="off">
          <div className="flex flex-col">
            <label htmlFor="jobTitle" className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Job Title *</label>
            <input type="text" id="jobTitle" name="jobTitle" placeholder="e.g., Front-End Developer" className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-5 py-3" value={jobTitle} onChange={e => setJobTitle(e.target.value)} required />
          </div>

          <div className="flex flex-col">
            <label htmlFor="tone" className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Tone</label>
            <select id="tone" name="tone" className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-5 py-3" value={tone} onChange={e => setTone(e.target.value)}>
              <option value="professional">Professional</option>
              <option value="friendly">Friendly</option>
              <option value="concise">Concise</option>
              <option value="detailed">Detailed</option>
            </select>
          </div>

          <div className="md:col-span-2 flex flex-col">
            <label htmlFor="jobDesc" className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Job Description / Experience *</label>
            <textarea id="jobDesc" name="jobDesc" rows={6} placeholder="Describe your experience or paste a job description..." className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-5 py-4" value={jobDesc} onChange={e => setJobDesc(e.target.value)} required></textarea>
          </div>

          <div className="md:col-span-2 flex flex-col">
            <label htmlFor="keywords" className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Keywords to Highlight</label>
            <input type="text" id="keywords" name="keywords" placeholder="e.g., React, Tailwind, API Integration" className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-5 py-3" value={keywords} onChange={e => setKeywords(e.target.value)} />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Separate keywords with commas.</p>
          </div>

          <div className="md:col-span-2">
            <button type="submit" className="w-full flex justify-center items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-extrabold rounded-xl px-6 py-4 shadow-lg transition-transform active:scale-95">
              {loading ? <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path></svg> : null}
              {loading ? 'Generating...' : 'Generate Resume Content'}
            </button>
          </div>
        </form>

        {showResult && (
          <section className="mt-12 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">Suggested Resume Content</h2>
              <div className="flex gap-4">
                <button onClick={handleCopy} className="flex items-center gap-2 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl px-5 py-3 font-semibold">Copy</button>
                <button onClick={handleDownload} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-xl px-5 py-3 font-semibold">Download</button>
              </div>
            </div>
            <div className="max-h-96 overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-8 text-gray-800 dark:text-gray-200 text-base leading-relaxed whitespace-pre-wrap font-mono shadow-inner border border-gray-200 dark:border-gray-700">
              {generatedContent}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}