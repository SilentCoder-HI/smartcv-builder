"use client";

import { useState } from "react";
import { Bot, Sparkles, FilePlus, Clipboard, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button"; // Make sure you have this or update as needed

export default function AIResumeAssistant() {
  const [jobTitle, setJobTitle] = useState("");
  const [tone, setTone] = useState("professional");
  const [jobDesc, setJobDesc] = useState("");
  const [keywords, setKeywords] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [loading, setLoading] = useState(false);

  const generateResumeContent = () => {
    let baseContent = [
      `• Designed and developed scalable front-end components using React and Next.js.`,
      `• Implemented UI features with Tailwind CSS for clean, responsive design.`,
      `• Collaborated with back-end developers to integrate APIs and optimize performance.`,
      `• Ensured cross-browser compatibility and optimized page load times.`,
      `• Participated in code reviews and agile development processes.`,
    ];

    if (keywords) {
      keywords.split(",").map(k => k.trim()).forEach(kw => {
        baseContent.unshift(`• Highlighted expertise in ${kw} to meet job requirements.`);
      });
    }

    let toneIntro = "";
    switch (tone) {
      case "friendly":
        toneIntro = "😊 Here's a friendly and approachable summary of your experience:\n\n";
        break;
      case "concise":
        toneIntro = "✂️ Concise bullet points highlighting your skills:\n\n";
        baseContent = baseContent.slice(0, 3);
        break;
      case "detailed":
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
      "🤝 Committed to teamwork and continuous learning.",
    ];

    const closingLine = closingLines[Math.floor(Math.random() * closingLines.length)];
    return toneIntro + baseContent.join("\n") + "\n\n" + closingLine;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle || !jobDesc) return alert("Fill in Job Title and Description");
    setLoading(true);
    setGeneratedContent("");
    await new Promise(res => setTimeout(res, 1000));
    setGeneratedContent(generateResumeContent());
    setLoading(false);
  };

  const handleCopy = () => navigator.clipboard.writeText(generatedContent);
  const handleDownload = () => {
    const blob = new Blob([generatedContent], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "generated-resume.txt";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl space-y-10 border border-blue-100 dark:border-gray-700">
      <header className="flex items-center gap-4 mb-4">
        <Bot className="w-10 h-10 text-blue-600" />
        <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white">AI Resume Assistant</h2>
      </header>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700 dark:text-gray-300">Job Title *</label>
          <input
            type="text"
            placeholder="e.g. Front-End Developer"
            className="input"
            value={jobTitle}
            onChange={e => setJobTitle(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700 dark:text-gray-300">Tone</label>
          <select
            value={tone}
            onChange={e => setTone(e.target.value)}
            className="input"
          >
            <option value="professional">Professional</option>
            <option value="friendly">Friendly</option>
            <option value="concise">Concise</option>
            <option value="detailed">Detailed</option>
          </select>
        </div>

        <div className="md:col-span-2 flex flex-col gap-2">
          <label className="font-semibold text-gray-700 dark:text-gray-300">Experience or Job Description *</label>
          <textarea
            rows={5}
            placeholder="Describe your past work or paste a job ad..."
            className="input"
            value={jobDesc}
            onChange={e => setJobDesc(e.target.value)}
          />
        </div>

        <div className="md:col-span-2 flex flex-col gap-2">
          <label className="font-semibold text-gray-700 dark:text-gray-300">Keywords (comma-separated)</label>
          <input
            type="text"
            placeholder="e.g. React, APIs, Tailwind"
            className="input"
            value={keywords}
            onChange={e => setKeywords(e.target.value)}
          />
        </div>

        <div className="md:col-span-2 flex justify-end">
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2"
          >
            {loading && <Loader2 className="animate-spin" size={18} />}
            {loading ? "Generating..." : "Generate Resume"}
          </Button>
        </div>
      </form>

      {generatedContent && (
        <div className="mt-8 space-y-5">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">AI Suggested Resume Content</h3>
            <div className="flex gap-3">
              <Button
                onClick={handleCopy}
                className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-semibold flex items-center gap-1"
              >
                <Clipboard size={16} /> Copy
              </Button>
              <Button
                onClick={handleDownload}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-1"
              >
                <Download size={16} /> Download
              </Button>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 whitespace-pre-wrap font-mono text-sm max-h-[400px] overflow-y-auto text-gray-800 dark:text-gray-100">
            {generatedContent}
          </div>

          <div className="flex gap-4 justify-end">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2">
              <FilePlus size={16} /> Use in Resume
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2">
              <Sparkles size={16} /> Ask AI
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// Tailwind helper class
// Add this globally or convert to reusable component
const inputClass = "rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-4 py-2 w-full";
