import { useState } from "react";
const samplePrompts = [
  "Rewrite my CV summary with a confident tone.",
  "Fix grammar in my experience section.",
  "Write a cover letter for a Frontend Engineer role at Acme Corp.",
];

export function AIAssistant() {
  const [history, setHistory] = useState<string[]>([]);
  const [prompt, setPrompt] = useState("");

  function handleSend() {
    if (!prompt) return;
    setHistory([...history, `You: ${prompt}`, "AI: (Sample) Here is your improved text!"]);
    setPrompt("");
  }
  function handleSample(p: string) {
    setPrompt(p);
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">AI Assistant</h2>
      <div className="bg-white rounded p-6 shadow">
        <div className="mb-4 flex gap-3">
          {samplePrompts.map((p, i) => (
            <button key={i} className="text-blue-700 underline" onClick={() => handleSample(p)}>{p}</button>
          ))}
        </div>
        <textarea
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          className="w-full border rounded p-2 mb-2"
          placeholder="Ask AI to rewrite, improve, or generate a section..."
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handleSend}>Send to AI</button>
        <div className="mt-4 bg-gray-100 p-3 rounded">
          {history.length === 0 && <span className="text-gray-400">No messages yet. Try a sample prompt!</span>}
          {history.map((msg, i) => (
            <div key={i} className={msg.startsWith("AI:") ? "text-green-700" : "text-blue-900"}>{msg}</div>
          ))}
        </div>
      </div>
    </div>
  );
}