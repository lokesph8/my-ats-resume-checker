import React from 'react';
import { Search, FileText, Target, BarChart3, Zap, Shield } from 'lucide-react';

interface FeaturesProps {
  onAnalyze: () => void;
  onBuild: () => void;
}

const Features: React.FC<FeaturesProps> = ({ onAnalyze, onBuild }) => {
  const features = [
    {
      icon: <Search className="h-8 w-8 text-blue-600" />,
      title: "Smart Resume Analysis",
      description: "Get detailed feedback on ATS compatibility, keyword optimization, and formatting to improve your resume's performance.",
      action: onAnalyze,
      actionText: "Try Analyzer"
    },
    {
      icon: <FileText className="h-8 w-8 text-green-600" />,
      title: "Professional Resume Builder",
      description: "Build stunning resumes with our intuitive editor. Choose from professional templates and customize to your needs.",
      action: onBuild,
      actionText: "Start Building"
    },
    {
      icon: <Target className="h-8 w-8 text-purple-600" />,
      title: "ATS Optimization",
      description: "Ensure your resume passes through Applicant Tracking Systems with our specialized optimization recommendations.",
      action: onAnalyze,
      actionText: "Optimize Now"
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-orange-600" />,
      title: "Detailed Scoring",
      description: "Receive comprehensive scores across multiple categories including content quality, formatting, and keyword density.",
      action: onAnalyze,
      actionText: "Get Score"
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-600" />,
      title: "Instant Feedback",
      description: "Get real-time suggestions and improvements as you build or analyze your resume for immediate optimization.",
      action: onBuild,
      actionText: "Try Now"
    },
    {
      icon: <Shield className="h-8 w-8 text-indigo-600" />,
      title: "Industry Standards",
      description: "Built following the latest industry standards and best practices to ensure maximum compatibility and effectiveness.",
      action: onBuild,
      actionText: "Learn More"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Everything You Need to Land Your Dream Job
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive suite of tools helps you create, optimize, and perfect your resume 
            to beat ATS systems and impress hiring managers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group bg-gray-50 rounded-xl p-8 hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-gray-200">
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {feature.description}
              </p>
              <button
                onClick={feature.action}
                className="text-blue-600 font-medium hover:text-blue-700 transition-colors group-hover:translate-x-1 transform duration-200"
              >
                {feature.actionText} →
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Transform Your Career?
          </h3>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have successfully optimized their resumes 
            and landed their dream jobs using our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onAnalyze}
              className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Analyze Your Resume
            </button>
            <button
              onClick={onBuild}
              className="px-8 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-400 transition-colors border-2 border-blue-400"
            >
              Build New Resume
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;