  import React, { useEffect, useState } from 'react';
  import { BookOpen, Brain, TrendingUp, Users, BarChart3, Zap, ArrowRight, CheckCircle } from 'lucide-react';

  const LandingPage = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [activeFeature, setActiveFeature] = useState(0);

    useEffect(() => {
      setIsVisible(true);
    }, []);

    const handlelogin = () => {
      window.location.href = '/login';
    };
    const handlesignup = () => {
      window.location.href = '/signup';
    };

    const features = [
      {
        title: "AI-Powered Sentiment Analysis",
        description: "Automatically analyze learner feedback using advanced NLP to understand satisfaction levels and identify pain points in real-time.",
        icon: Brain,
        gradient: "from-blue-500 to-cyan-500"
      },
      {
        title: "Intelligent Recommendations",
        description: "Match learners with courses aligned to their skills, experience, and career goals using ML-driven resume-to-course mapping.",
        icon: Zap,
        gradient: "from-purple-500 to-pink-500"
      },
      {
        title: "Predictive Analytics",
        description: "Identify at-risk learners and predict satisfaction scores, enabling early interventions to reduce dropout rates.",
        icon: TrendingUp,
        gradient: "from-orange-500 to-red-500"
      },
      {
        title: "Data-Driven Insights",
        description: "Visual dashboard for educators showing sentiment trends, engagement patterns, and actionable improvement areas.",
        icon: BarChart3,
        gradient: "from-green-500 to-emerald-500"
      }
    ];

    const benefits = [
      { title: "87% Accuracy", subtitle: "In predicting learner satisfaction" },
      { title: "15% Improvement", subtitle: "In sentiment classification accuracy" },
      { title: "25% Reduction", subtitle: "In learner dropout rates" },
      { title: "90% Relevancy", subtitle: "In course recommendations" }
    ];

    const stats = [
      { number: "5M+", label: "Potential Learners" },
      { number: "850+", label: "Courses Supported" },
      { number: "15K+", label: "Expert Instructors" }
    ];

    return (
      <div className="w-full overflow-hidden bg-slate-950">
        {/* Hero Section */}
        <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center">
          {/* Navigation */}
          <nav className="absolute top-0 left-0 w-full py-6 px-8 z-30 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Brain className="w-8 h-8 text-blue-400" />
              <span className="text-white font-bold text-2xl">MOOC Academy</span>
            </div>
            <button 
              onClick={handlesignup}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105"
            >
              Sign In
            </button>
          </nav>

          {/* Animated background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-40 right-20 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          </div>

          {/* Grid background */}
          <div className="absolute inset-0 opacity-5">
            <div className="grid grid-cols-12 h-full w-full">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="border-r border-blue-500/30"></div>
              ))}
            </div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 container mx-auto px-4 py-20">
            <div className="max-w-4xl mx-auto text-center">
              <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                <div className="inline-block mb-6 px-4 py-2 bg-blue-500/20 border border-blue-500/50 rounded-full">
                  <span className="text-blue-300 text-sm font-semibold">🧠 AI-Powered Learning Analytics</span>
                </div>
                
                <h1 className="text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                  <span className="block text-white">Transform MOOC</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">Learning with Intelligence</span>
                </h1>
                
                <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                  Harness NLP and Machine Learning to understand learner satisfaction, predict dropouts, and deliver personalized course recommendations that boost engagement and outcomes.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={handlelogin}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    Explore Platform <ArrowRight className="w-5 h-5" />
                  </button>
                  <button className="px-8 py-4 border-2 border-blue-400 text-blue-300 text-lg font-semibold rounded-lg hover:bg-blue-400/10 transition-all duration-300">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Wave separator */}
          <div className="absolute bottom-0 left-0 w-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
              <path fill="#0f172a" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,133.3C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-slate-900 py-16 px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Problem & Solution Section */}
        <div className="bg-slate-950 py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Why MOOCs Need Intelligence</h2>
              <p className="text-xl text-gray-400">Traditional platforms leave insights on the table</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-red-400 mb-4">The Problem</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex gap-3">
                    <span className="text-red-400">•</span>
                    <span>80-90% dropout rates due to lack of personalization</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-red-400">•</span>
                    <span>Unanalyzed feedback sitting idle in reviews and comments</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-red-400">•</span>
                    <span>Generic recommendations ignoring learner backgrounds</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-red-400">•</span>
                    <span>No predictive insights for early dropout intervention</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-green-400 mb-4">Our Solution</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                    <span>NLP-powered sentiment analysis of all learner feedback</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                    <span>ML models predicting satisfaction and engagement</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                    <span>Intelligent course matching based on skills & goals</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                    <span>Data-driven dashboard for continuous improvement</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-slate-900 py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Powered by AI & Data Science</h2>
              <p className="text-xl text-gray-400">Four intelligent components working together</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div 
                    key={index}
                    className={`bg-gradient-to-br ${feature.gradient} p-1 rounded-xl cursor-pointer group transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
                    onMouseEnter={() => setActiveFeature(index)}
                  >
                    <div className="bg-slate-900 rounded-lg p-6 h-full flex flex-col group-hover:bg-slate-800/50 transition-all duration-300">
                      <IconComponent className="w-10 h-10 text-blue-400 mb-4" />
                      <h3 className="text-white text-lg font-bold mb-3">{feature.title}</h3>
                      <p className="text-gray-400 text-sm flex-grow">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-slate-950 py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Proven Results</h2>
              <p className="text-xl text-gray-400">Real-world impact from our AI algorithms</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="bg-slate-900 border border-blue-500/30 rounded-xl p-6 text-center hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
                >
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">
                    {benefit.title}
                  </div>
                  <p className="text-gray-400 text-sm">{benefit.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="bg-slate-900 py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">How It Works</h2>
              <p className="text-xl text-gray-400">A seamless pipeline of intelligence</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { num: "1", title: "Collect", desc: "Gather learner feedback" },
                { num: "2", title: "Analyze", desc: "NLP sentiment extraction" },
                { num: "3", title: "Predict", desc: "ML satisfaction models" },
                { num: "4", title: "Recommend", desc: "Personalized suggestions" },
                { num: "5", title: "Improve", desc: "Dashboard insights" }
              ].map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/50 rounded-xl p-6 text-center h-full">
                    <div className="text-3xl font-bold text-blue-400 mb-2">{step.num}</div>
                    <h3 className="text-white font-bold mb-1">{step.title}</h3>
                    <p className="text-gray-400 text-sm">{step.desc}</p>
                  </div>
                  {index < 4 && (
                    <div className="hidden lg:block absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
                      <ArrowRight className="w-6 h-6 text-blue-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-950 to-slate-900 py-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-20 w-40 h-40 bg-blue-400/20 rounded-full blur-2xl"></div>
            <div className="absolute bottom-10 right-20 w-40 h-40 bg-cyan-400/20 rounded-full blur-2xl"></div>
          </div>

          <div className="max-w-3xl mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Enhance Your MOOC Experience?</h2>
            <p className="text-xl text-gray-300 mb-10">Join the next generation of intelligent online learning platforms</p>
            <button 
              onClick={handlelogin}
              className="px-10 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105"
            >
              Get Started Free
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-slate-900 border-t border-slate-800 text-gray-400 py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="w-6 h-6 text-blue-400" />
                  <span className="text-white font-bold text-xl">MOOC Academy</span>
                </div>
                <p className="text-sm">Intelligent learning analytics for the modern educational landscape.</p>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">Product</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white transition">Features</a></li>
                  <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                  <li><a href="#" className="hover:text-white transition">Security</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">Company</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white transition">About</a></li>
                  <li><a href="#" className="hover:text-white transition">Blog</a></li>
                  <li><a href="#" className="hover:text-white transition">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">Legal</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                  <li><a href="#" className="hover:text-white transition">Terms</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-800 pt-8">
              <p className="text-center text-sm">© {new Date().getFullYear()} MOOC Academy. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    );
  };

  export default LandingPage;