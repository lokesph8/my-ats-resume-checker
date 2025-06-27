import React, { useState } from 'react';
import { ArrowLeft, Download, Eye, Save, Plus, Trash2 } from 'lucide-react';

interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  summary: string;
}

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Education {
  id: string;
  degree: string;
  school: string;
  location: string;
  graduationDate: string;
  gpa?: string;
}

interface ResumeBuilderProps {
  onBack: () => void;
}

const ResumeBuilder: React.FC<ResumeBuilderProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'personal' | 'experience' | 'education' | 'skills' | 'preview'>('personal');
  const [showPreview, setShowPreview] = useState(false);

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    summary: ''
  });

  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: '1',
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    }
  ]);

  const [educations, setEducations] = useState<Education[]>([
    {
      id: '1',
      degree: '',
      school: '',
      location: '',
      graduationDate: '',
      gpa: ''
    }
  ]);

  const [skills, setSkills] = useState<string[]>(['']);

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    setExperiences([...experiences, newExp]);
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    setExperiences(experiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      degree: '',
      school: '',
      location: '',
      graduationDate: '',
      gpa: ''
    };
    setEducations([...educations, newEdu]);
  };

  const removeEducation = (id: string) => {
    setEducations(educations.filter(edu => edu.id !== id));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setEducations(educations.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const addSkill = () => {
    setSkills([...skills, '']);
  };

  const updateSkill = (index: number, value: string) => {
    const newSkills = [...skills];
    newSkills[index] = value;
    setSkills(newSkills);
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const tabs = [
    { key: 'personal', label: 'Personal Info' },
    { key: 'experience', label: 'Experience' },
    { key: 'education', label: 'Education' },
    { key: 'skills', label: 'Skills' },
    { key: 'preview', label: 'Preview' }
  ];

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            value={personalInfo.name}
            onChange={(e) => setPersonalInfo({...personalInfo, name: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={personalInfo.email}
            onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <input
            type="tel"
            value={personalInfo.phone}
            onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="(555) 123-4567"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <input
            type="text"
            value={personalInfo.location}
            onChange={(e) => setPersonalInfo({...personalInfo, location: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="New York, NY"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
          <input
            type="url"
            value={personalInfo.linkedin}
            onChange={(e) => setPersonalInfo({...personalInfo, linkedin: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://linkedin.com/in/johndoe"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Professional Summary</label>
          <textarea
            value={personalInfo.summary}
            onChange={(e) => setPersonalInfo({...personalInfo, summary: e.target.value})}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Brief overview of your professional background and career objectives..."
          />
        </div>
      </div>
    </div>
  );

  const renderExperience = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Work Experience</h2>
        <button
          onClick={addExperience}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Experience</span>
        </button>
      </div>
      
      {experiences.map((exp, index) => (
        <div key={exp.id} className="bg-gray-50 rounded-lg p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Experience {index + 1}</h3>
            {experiences.length > 1 && (
              <button
                onClick={() => removeExperience(exp.id)}
                className="text-red-600 hover:text-red-800 transition-colors"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            )}
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
              <input
                type="text"
                value={exp.title}
                onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Software Engineer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Tech Corp"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={exp.location}
                onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="San Francisco, CA"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
              <input
                type="month"
                value={exp.startDate}
                onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <input
                type="month"
                value={exp.endDate}
                onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                disabled={exp.current}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={exp.current}
                onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm text-gray-700">Currently working here</label>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Job Description</label>
            <textarea
              value={exp.description}
              onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="• Developed web applications using React and Node.js
• Collaborated with cross-functional teams to deliver high-quality software
• Implemented automated testing and CI/CD pipelines"
            />
          </div>
        </div>
      ))}
    </div>
  );

  const renderEducation = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Education</h2>
        <button
          onClick={addEducation}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Education</span>
        </button>
      </div>
      
      {educations.map((edu, index) => (
        <div key={edu.id} className="bg-gray-50 rounded-lg p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Education {index + 1}</h3>
            {educations.length > 1 && (
              <button
                onClick={() => removeEducation(edu.id)}
                className="text-red-600 hover:text-red-800 transition-colors"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            )}
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Degree</label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Bachelor of Science in Computer Science"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">School</label>
              <input
                type="text"
                value={edu.school}
                onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="University of Technology"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={edu.location}
                onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Boston, MA"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Date</label>
              <input
                type="month"
                value={edu.graduationDate}
                onChange={(e) => updateEducation(edu.id, 'graduationDate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">GPA (Optional)</label>
              <input
                type="text"
                value={edu.gpa}
                onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="3.8/4.0"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSkills = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Skills</h2>
        <button
          onClick={addSkill}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Skill</span>
        </button>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        {skills.map((skill, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="text"
              value={skill}
              onChange={(e) => updateSkill(index, e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="JavaScript, React, Node.js"
            />
            {skills.length > 1 && (
              <button
                onClick={() => removeSkill(index)}
                className="text-red-600 hover:text-red-800 transition-colors"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderPreview = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Resume Preview</h2>
      <div className="bg-white border border-gray-300 rounded-lg p-8 shadow-lg max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{personalInfo.name || 'Your Name'}</h1>
          <div className="text-gray-600 space-y-1">
            <p>{personalInfo.email} | {personalInfo.phone}</p>
            <p>{personalInfo.location}</p>
            {personalInfo.linkedin && <p>{personalInfo.linkedin}</p>}
          </div>
        </div>

        {/* Summary */}
        {personalInfo.summary && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-gray-200 pb-1">PROFESSIONAL SUMMARY</h2>
            <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experiences.some(exp => exp.title) && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-gray-200 pb-1">EXPERIENCE</h2>
            {experiences.filter(exp => exp.title).map((exp) => (
              <div key={exp.id} className="mb-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{exp.title}</h3>
                    <p className="text-gray-700">{exp.company} • {exp.location}</p>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </p>
                </div>
                {exp.description && (
                  <div className="text-gray-700 whitespace-pre-line">{exp.description}</div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {educations.some(edu => edu.degree) && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-gray-200 pb-1">EDUCATION</h2>
            {educations.filter(edu => edu.degree).map((edu) => (
              <div key={edu.id} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-700">{edu.school} • {edu.location}</p>
                    {edu.gpa && <p className="text-gray-600">GPA: {edu.gpa}</p>}
                  </div>
                  <p className="text-gray-600 text-sm">{edu.graduationDate}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {skills.some(skill => skill.trim()) && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-gray-200 pb-1">SKILLS</h2>
            <div className="flex flex-wrap gap-2">
              {skills.filter(skill => skill.trim()).map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Resume Builder
          </h1>
          <p className="text-lg text-gray-600">
            Create a professional resume with our easy-to-use builder
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.key
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'personal' && renderPersonalInfo()}
            {activeTab === 'experience' && renderExperience()}
            {activeTab === 'education' && renderEducation()}
            {activeTab === 'skills' && renderSkills()}
            {activeTab === 'preview' && renderPreview()}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2">
            <Save className="h-5 w-5" />
            <span>Save Progress</span>
          </button>
          <button 
            onClick={() => setActiveTab('preview')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Eye className="h-5 w-5" />
            <span>Preview Resume</span>
          </button>
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
            <Download className="h-5 w-5" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;