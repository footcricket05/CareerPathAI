import React from 'react';
import {
  Briefcase,
  FileText,
  Mail,
  Brain,
  ChevronRight,
  Github,
  Linkedin,
  Twitter,
} from 'lucide-react';
import CareerForm from './components/CareerForm';

function FeatureCard({ icon: Icon, title, description }: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
      <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-indigo-600" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function App() {
  const [showForm, setShowForm] = React.useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              CareerPath<span className="text-indigo-600">AI</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Navigate your career journey with AI-powered insights. Generate professional resumes,
              discover job opportunities, and receive personalized career recommendations.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowForm(true)}
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2"
              >
                Get Started
                <ChevronRight className="h-5 w-5" />
              </button>
              <button
                onClick={() => {
                  const featuresSection = document.getElementById('features');
                  featuresSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-gray-400 transition-colors"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Get Started</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <CareerForm />
          </div>
        </div>
      )}

      {/* Features Section */}
      <div id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Features</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Leverage advanced AI technology to enhance your career prospects and make informed decisions
            about your professional journey.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={FileText}
            title="Resume Generator"
            description="Create professional resumes tailored to your skills and experience in seconds."
          />
          <FeatureCard
            icon={Briefcase}
            title="Job Role Fetcher"
            description="Discover relevant job opportunities from leading job boards worldwide."
          />
          <FeatureCard
            icon={Mail}
            title="Email Integration"
            description="Receive personalized job recommendations directly in your inbox."
          />
          <FeatureCard
            icon={Brain}
            title="AI Assistant"
            description="Get real-time career guidance powered by advanced AI technology."
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Career?
            </h2>
            <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have already enhanced their career paths using our
              AI-powered platform.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
            >
              Start Your Journey
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <h3 className="text-2xl font-bold text-white mb-2">
                CareerPath<span className="text-indigo-400">AI</span>
              </h3>
              <p className="text-gray-400">Empowering careers with AI technology</p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} CareerPathAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;