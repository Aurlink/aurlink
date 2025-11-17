// app/build/request-grant/page.tsx
"use client";
import { useState } from "react";
import { Upload, FileText, Send, CheckCircle } from "lucide-react";

export default function RequestGrantPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectName: "",
    description: "",
    documents: null as FileList | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, documents: e.target.files }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A0F2C] via-[#1a1f3c] to-[#2d1b4e] pt-20 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#00F5FF]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-6 py-12">
          <div className="text-center">
            <CheckCircle className="w-24 h-24 text-[#00F5FF] mx-auto mb-8 animate-bounce" />
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-[#00F5FF] to-cyan-400 bg-clip-text text-transparent">
              Application Submitted!
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Thank you for your grant application. Our team will review your submission and get back to you within 5-7 business days.
            </p>
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 max-w-md mx-auto">
              <p className="text-gray-300 mb-4">Next Steps:</p>
              <ul className="text-gray-400 text-left space-y-2">
                <li>• Initial review (2-3 days)</li>
                <li>• Technical assessment</li>
                <li>• Team interview</li>
                <li>• Final decision</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F2C] via-[#1a1f3c] to-[#2d1b4e] pt-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#00F5FF]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-[#00F5FF] to-cyan-400 bg-clip-text text-transparent">
            Request Grant
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Apply for funding and support to bring your innovative blockchain project to life
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Application Form */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <FileText className="w-6 h-6 text-[#00F5FF]" />
              Project Details
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#00F5FF] transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#00F5FF] transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">Project Name</label>
                <input
                  type="text"
                  required
                  value={formData.projectName}
                  onChange={(e) => setFormData(prev => ({ ...prev, projectName: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#00F5FF] transition-colors"
                  placeholder="Your project name"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">Project Description</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#00F5FF] transition-colors resize-none"
                  placeholder="Describe your project, its innovation, and impact..."
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">Project Documents</label>
                <div className="border-2 border-dashed border-white/20 rounded-xl p-6 text-center hover:border-[#00F5FF] transition-colors cursor-pointer">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    id="documents"
                  />
                  <label htmlFor="documents" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-[#00F5FF] mx-auto mb-3" />
                    <p className="text-white font-medium">Upload Project Files</p>
                    <p className="text-gray-400 text-sm mt-1">PDF, DOC, or ZIP files (Max 25MB)</p>
                    {formData.documents && (
                      <p className="text-[#00F5FF] text-sm mt-2">
                        {formData.documents.length} file(s) selected
                      </p>
                    )}
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#00F5FF] to-cyan-400 text-[#0A0F2C] font-semibold py-4 rounded-xl hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-[#0A0F2C] border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Application
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Grant Information */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#00F5FF]/10 to-cyan-400/10 backdrop-blur-lg rounded-2xl p-6 border border-[#00F5FF]/20">
              <h3 className="text-xl font-bold text-white mb-4">Grant Tiers</h3>
              <div className="space-y-4">
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <h4 className="text-[#00F5FF] font-semibold">Seed Grant</h4>
                  <p className="text-white text-2xl font-bold">$5,000 - $25,000</p>
                  <p className="text-gray-300 text-sm mt-1">For early-stage projects and MVPs</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <h4 className="text-cyan-400 font-semibold">Growth Grant</h4>
                  <p className="text-white text-2xl font-bold">$25,000 - $100,000</p>
                  <p className="text-gray-300 text-sm mt-1">For projects with proven traction</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <h4 className="text-purple-400 font-semibold">Scale Grant</h4>
                  <p className="text-white text-2xl font-bold">$100,000+</p>
                  <p className="text-gray-300 text-sm mt-1">For established projects ready to scale</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Evaluation Criteria</h3>
              <ul className="text-gray-300 space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#00F5FF] rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Innovation:</strong> Unique value proposition and technical novelty</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Feasibility:</strong> Realistic timeline and technical capability</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Impact:</strong> Potential to advance the Aurlink ecosystem</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Team:</strong> Experience and capability to execute</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}