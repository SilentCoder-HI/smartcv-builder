"use client";

import { useState, useRef } from "react";
import {
  Bot,
  Sparkles,
  FilePlus,
  Clipboard,
  Download,
  Loader2,
  Target,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Star,
  ArrowRight,
  Briefcase,
  Search,
  BarChart3,
  Lightbulb,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Job } from "@/types/jobs-types";
import { CV } from "../data/data";
import TemplateRenderer from "@/components/TemplateRenderer";

interface CVAnalysis {
  jobMatch: {
    overallScore: number;
    atsScore: number;
    skillsMatch: any;
    keywordMatch: string;
    missingKeywords: string[];
  };
  templateAnalysis: {
    score: number;
    feedback: string;
    recommendations: string[];
  };
  suggestions: string[];
  summary: {
    strengths: string[];
    weaknesses: string[];
    recommendations: string[];
  };
}
type AIResumeAssistantProps = {
  job: Job | null,
  cvs: CV[],
}

export default function AIResumeAssistant({ job, cvs }: AIResumeAssistantProps) {

  const [selectedJob] = useState<Job | null>(job);
  const [selectedCV, setSelectedCV] = useState<CV | null>(null);
  const [analysis, setAnalysis] = useState<CVAnalysis | null>(null);
  const [loading, setLoading] = useState(false);

  // Ref to hold the rendered CV DOM node
  const renderedCVRef = useRef<HTMLDivElement>(null);

  // Find the template for the selected CV
  // (Assuming you have a list of templates somewhere, e.g. import { templates } from ... )
  // For this rewrite, we assume TemplateRenderer can render based on templateId and cvData

  const handleAnalyze = async () => {
    if (!selectedJob || !selectedCV) {
      toast.error("Please select both a job and a CV to analyze");
      return;
    }

    setLoading(true);
    try {
      // Render the CV in a hidden div and get its HTML
      let renderedCVHtml = "";
      if (renderedCVRef.current) {
        renderedCVHtml = renderedCVRef.current.innerHTML;
      }

      const response = await fetch('/dashboard/api/ai-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobDescription: selectedJob?.jobDescription || "",
          cvData: selectedCV.content,
          templateData: {
            layout: selectedCV.templateId,
            renderedHtml: renderedCVHtml // send the complete rendered HTML of the CV
          }
        }),
      });

      if (response.ok) {
        const analysisData = await response.json();
        setAnalysis(analysisData);
        toast.success("Analysis completed successfully!");
      } else {
        throw new Error('Analysis failed');
      }
    } catch (error) {
      toast.error("Failed to analyze CV. Please try again.");
      console.error('Analysis error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  if (!selectedJob) {
    return (
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-full">
              <Search className="w-12 h-12 text-blue-600 dark:text-blue-300" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            No Job Selected
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            To analyze your CV with AI, you need to select a job first.
            Go to the job search and click "Analyze with AI" on any job posting.
          </p>
          <Button
            onClick={() => window.history.back()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
          >
            <ArrowRight className="w-5 h-5" />
            Go to Job Search
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl">
          <Bot className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            AI Resume Assistant
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Analyze your CV against job requirements with AI
          </p>
        </div>
      </div>

      {/* Job Information */}
      <Card className="border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-600" />
            Selected Job
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {selectedJob.jobTitle}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {selectedJob.companyName} • {selectedJob.location}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedJob.jobType && (
                <Badge variant="secondary">{selectedJob.jobType}</Badge>
              )}
              {selectedJob.salary && (
                <Badge variant="outline">{selectedJob.salary}</Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CV Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FilePlus className="w-5 h-5 text-green-600" />
            Select CV to Analyze
          </CardTitle>
        </CardHeader>
        <CardContent>
          {cvs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                No CVs found. Create a CV first to analyze.
              </p>
              <Button variant="outline">Create New CV</Button>
            </div>
          ) : (
            <div className="grid gap-3">
              {cvs.map((cv) => (
                <div
                  key={cv.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedCV?.id === cv.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  onClick={() => setSelectedCV(cv)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {cv.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Template: {cv.templateId} • Status: {cv.status}
                      </p>
                    </div>
                    {selectedCV?.id === cv.id && (
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analyze Button */}
      {selectedCV && (
        <div className="flex justify-center">
          <Button
            onClick={async () => {
              // Before analyzing, ensure the CV is rendered and HTML is available
              // Wait for the next tick to ensure the ref is updated
              setTimeout(handleAnalyze, 0);
            }}
            disabled={loading}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center gap-3"
          >
            {loading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <Sparkles className="w-6 h-6" />
            )}
            {loading ? "Analyzing..." : "Analyze CV with AI"}
          </Button>
        </div>
      )}

      {/* Hidden Preview */}
      <div style={{ display: "none" }}>
        {/* Only render the selected CV with its template for analysis */}
        {selectedCV && (
          <div ref={renderedCVRef}>
            <TemplateRenderer cvData={selectedCV.content} template={selectedCV.templateId} />
          </div>
        )}
      </div>

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Target className="w-6 h-6 text-blue-600" />
            Analysis Results
          </h2>

          {/* Overall Score */}
          <Card className="border-green-200 dark:border-green-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Overall Match Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className={`text-6xl font-bold ${getScoreColor(analysis.jobMatch.overallScore)}`}>
                  {analysis.jobMatch.overallScore}%
                </div>
                <Progress value={analysis.jobMatch.overallScore} className="h-3" />
                <p className="text-gray-600 dark:text-gray-400">
                  Your CV matches {analysis.jobMatch.keywordMatch} with this job
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Scores */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* ATS Score */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  ATS Compatibility
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-3">
                  <div className={`text-3xl font-bold ${getScoreColor(analysis.jobMatch.atsScore)}`}>
                    {analysis.jobMatch.atsScore}%
                  </div>
                  <Progress value={analysis.jobMatch.atsScore} className="h-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    How well your CV passes through ATS systems
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Template Score */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-600" />
                  Template Effectiveness
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-3">
                  <div className={`text-3xl font-bold ${getScoreColor(analysis.templateAnalysis.score)}`}>
                    {analysis.templateAnalysis.score}%
                  </div>
                  <Progress value={analysis.templateAnalysis.score} className="h-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {analysis.templateAnalysis.feedback}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Strengths & Weaknesses */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Strengths */}
            <Card className="border-green-200 dark:border-green-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
                  <CheckCircle className="w-5 h-5" />
                  Your Strengths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysis.summary.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Areas for Improvement */}
            <Card className="border-yellow-200 dark:border-yellow-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-700 dark:text-yellow-300">
                  <AlertCircle className="w-5 h-5" />
                  Areas for Improvement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysis.summary.weaknesses.map((weakness, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{weakness}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations */}
          <Card className="border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                <Lightbulb className="w-5 h-5" />
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analysis.suggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <Zap className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">{suggestion}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => {
                const analysisText = `
CV Analysis Report for ${selectedJob.jobTitle} at ${selectedJob.companyName}

Overall Match Score: ${analysis.jobMatch.overallScore}%
ATS Score: ${analysis.jobMatch.atsScore}%
Template Score: ${analysis.templateAnalysis.score}%

Strengths:
${analysis.summary.strengths.map(s => `• ${s}`).join('\n')}

Areas for Improvement:
${analysis.summary.weaknesses.map(w => `• ${w}`).join('\n')}

Recommendations:
${analysis.suggestions.map(r => `• ${r}`).join('\n')}
                `.trim();
                navigator.clipboard.writeText(analysisText);
                toast.success("Analysis copied to clipboard!");
              }}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Clipboard className="w-4 h-4" />
              Copy Analysis
            </Button>
            <Button
              onClick={() => {
                const analysisText = `
CV Analysis Report for ${selectedJob.jobTitle} at ${selectedJob.companyName}

Overall Match Score: ${analysis.jobMatch.overallScore}%
ATS Score: ${analysis.jobMatch.atsScore}%
Template Score: ${analysis.templateAnalysis.score}%

Strengths:
${analysis.summary.strengths.map(s => `• ${s}`).join('\n')}

Areas for Improvement:
${analysis.summary.weaknesses.map(w => `• ${w}`).join('\n')}

Recommendations:
${analysis.suggestions.map(r => `• ${r}`).join('\n')}
                `.trim();
                const blob = new Blob([analysisText], { type: "text/plain" });
                const a = document.createElement("a");
                a.href = URL.createObjectURL(blob);
                a.download = `cv-analysis-${selectedJob.jobTitle.replace(/\s+/g, '-')}.txt`;
                a.click();
                URL.revokeObjectURL(a.href);
                toast.success("Analysis downloaded!");
              }}
              className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Report
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
