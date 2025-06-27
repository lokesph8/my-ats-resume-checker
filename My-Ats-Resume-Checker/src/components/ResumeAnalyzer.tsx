import React, { useState, useCallback } from 'react';
import { Upload, FileText, ArrowLeft, CheckCircle, AlertCircle, XCircle, Download } from 'lucide-react';

interface AnalysisResult {
  overall_score: number;
  sections: {
    ats_compatibility: { score: number; issues: string[]; suggestions: string[] };
    keywords: { score: number; missing: string[]; suggestions: string[] };
    formatting: { score: number; issues: string[]; suggestions: string[] };
    content: { score: number; issues: string[]; suggestions: string[] };
  };
}

interface ResumeAnalyzerProps {
  onBack: () => void;
}

const ResumeAnalyzer: React.FC<ResumeAnalyzerProps> = ({ onBack }) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFile = (selectedFile: File) => {
    if (selectedFile.type === 'application/pdf' || selectedFile.name.endsWith('.pdf')) {
      setFile(selectedFile);
    } else {
      alert('Please upload a PDF file');
    }
  };

  const analyzeResume = async () => {
    if (!file) return;
    
    setAnalyzing(true);
    
    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock analysis results
    const mockAnalysis: AnalysisResult = {
      overall_score: 78,
      sections: {
        ats_compatibility: {
          score: 85,
          issues: ['Complex formatting may cause parsing issues'],
          suggestions: ['Use standard fonts', 'Avoid graphics and tables', 'Use simple bullet points']
        },
        keywords: {
          score: 65,
          missing: ['project management', 'data analysis', 'leadership'],
          suggestions: ['Include industry-specific keywords', 'Match job description terms', 'Add technical skills']
        },
        formatting: {
          score: 90,
          issues: [],
          suggestions: ['Consider adding more white space', 'Use consistent heading styles']
        },
        content: {
          score: 72,
          issues: ['Missing quantified achievements', 'Weak action verbs'],
          suggestions: ['Add metrics and numbers', 'Use strong action verbs', 'Include specific accomplishments']
        }
      }
    };
    
    setAnalysis(mockAnalysis);
    setAnalyzing(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="h-5 w-5 text-green-600" />;
    if (score >= 60) return <AlertCircle className="h-5 w-5 text-yellow-600" />;
    return <XCircle className="h-5 w-5 text-red-600" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Resume ATS Analyzer
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload your resume to get instant feedback on ATS compatibility, keyword optimization, and areas for improvement.
          </p>
        </div>

        {!analysis ? (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
                dragActive
                  ? 'border-blue-400 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Upload Your Resume
              </h3>
              <p className="text-gray-600 mb-6">
                Drag and drop your PDF resume here, or click to browse
              </p>
              
              <label className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                <Upload className="h-5 w-5 mr-2" />
                Choose File
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => e.target.files && handleFile(e.target.files[0])}
                  className="hidden"
                />
              </label>
            </div>

            {file && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">{file.name}</p>
                      <p className="text-sm text-gray-600">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <button
                    onClick={analyzeResume}
                    disabled={analyzing}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {analyzing ? 'Analyzing...' : 'Analyze Resume'}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            {/* Overall Score */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-center">
                <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${getScoreBg(analysis.overall_score)} mb-4`}>
                  <span className={`text-3xl font-bold ${getScoreColor(analysis.overall_score)}`}>
                    {analysis.overall_score}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Overall ATS Score</h2>
                <p className="text-gray-600">
                  Your resume scored {analysis.overall_score}/100 for ATS compatibility
                </p>
              </div>
            </div>

            {/* Detailed Analysis */}
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(analysis.sections).map(([key, section]) => (
                <div key={key} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 capitalize">
                      {key.replace('_', ' ')}
                    </h3>
                    <div className="flex items-center space-x-2">
                      {getScoreIcon(section.score)}
                      <span className={`font-bold ${getScoreColor(section.score)}`}>
                        {section.score}/100
                      </span>
                    </div>
                  </div>

                  {section.issues && section.issues.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Issues Found:</h4>
                      <ul className="space-y-1">
                        {section.issues.map((issue, index) => (
                          <li key={index} className="text-sm text-red-600 flex items-start space-x-2">
                            <XCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            <span>{issue}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {section.missing && section.missing.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Missing Keywords:</h4>
                      <div className="flex flex-wrap gap-2">
                        {section.missing.map((keyword, index) => (
                          <span key={index} className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Suggestions:</h4>
                    <ul className="space-y-1">
                      {section.suggestions.map((suggestion, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0 text-green-600" />
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setFile(null);
                  setAnalysis(null);
                }}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Analyze Another Resume
              </button>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <Download className="h-5 w-5" />
                <span>Download Report</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeAnalyzer;