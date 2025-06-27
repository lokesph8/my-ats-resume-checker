import React from 'react';
import { ArrowRight, Search, FileText, Target, CheckCircle } from 'lucide-react';

interface HeroProps {
  onAnalyze: () => void;
  onBuild: () => void;
}

const Hero: React.FC<HeroProps> = ({ onAnalyze, onBuild }) => {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Beat the ATS,
            <span className="block text-blue-200">Land Your Dream Job</span>
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Optimize your resume for Applicant Tracking Systems with our AI-powered analyzer 
            and professional resume builder. Get instant feedback and improve your chances.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
            <button
              onClick={onAnalyze}
              className="group bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <div className="flex items-center justify-center space-x-3">
                <Search className="h-6 w-6 text-blue-600" />
                <span>Analyze Resume</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
            
            <button
              onClick={onBuild}
              className="group bg-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-400 transition-all duration-300 transform hover:scale-105 shadow-lg border-2 border-blue-400"
            >
              <div className="flex items-center justify-center space-x-3">
                <FileText className="h-6 w-6" />
                <span>Build Resume</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-blue-500 bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Target className="h-8 w-8 text-blue-200" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">ATS Optimization</h3>
              <p className="text-blue-200 text-sm">Get your resume past automated screening systems</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-500 bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-blue-200" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Instant Feedback</h3>
              <p className="text-blue-200 text-sm">Receive detailed scoring and improvement suggestions</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-500 bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <FileText className="h-8 w-8 text-blue-200" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Professional Templates</h3>
              <p className="text-blue-200 text-sm">Choose from industry-specific resume templates</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;