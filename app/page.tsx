'use client'

import { useState, useEffect } from 'react';
import { BookOpen, MessageSquare, History, Sparkles, Users, Zap, ChevronRight, Menu, X } from 'lucide-react';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Interactive Dialogue",
      description: "Engage in branching conversations that adapt to your choices, creating unique story experiences every time."
    },
    {
      icon: <History className="w-6 h-6" />,
      title: "Rich History",
      description: "Revisit past conversations and explore alternate paths. Your story timeline is always accessible."
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Visual Novel Style",
      description: "Beautiful character sprites, backgrounds, and UI elements that bring your stories to life."
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Dynamic Characters",
      description: "Characters that remember your choices and develop relationships based on your interactions."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Multiple Stories",
      description: "Access a growing library of narratives across genres from romance to mystery and adventure."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Real-time Choices",
      description: "Make decisions that matter with instant feedback and consequences that shape your narrative."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-black/50 backdrop-blur-lg' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                StoryWeave
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="hover:text-purple-400 transition">Features</a>
              <a href="#how-it-works" className="hover:text-purple-400 transition">How It Works</a>
              <a href="#stories" className="hover:text-purple-400 transition">Stories</a>
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition">
                Get Started
              </button>
            </div>

            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-black/90 backdrop-blur-lg">
            <div className="px-4 py-4 space-y-4">
              <a href="#features" className="block hover:text-purple-400">Features</a>
              <a href="#how-it-works" className="block hover:text-purple-400">How It Works</a>
              <a href="#stories" className="block hover:text-purple-400">Stories</a>
              <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 rounded-full">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-purple-500/30 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-blue-500/30 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Your Story,
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Your Choices
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Experience interactive narratives like never before. Chat with characters, make meaningful choices, and explore branching storylines in a beautiful visual novel interface.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition transform hover:scale-105 flex items-center justify-center">
                Start Your Journey
                <ChevronRight className="ml-2" />
              </button>
              <button className="bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition border border-white/20">
                Watch Demo
              </button>
            </div>
          </div>

          {/* Hero Image Placeholder */}
          <div className="mt-16 relative">
            <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl p-8 backdrop-blur-sm border border-white/10 shadow-2xl">
              <div className="aspect-video bg-black/30 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <BookOpen className="w-16 h-16 mx-auto mb-4 text-purple-400" />
                  <p className="text-gray-400">App Preview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need for an immersive interactive storytelling experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div 
                key={idx}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20"
              >
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Three simple steps to begin your interactive story adventure
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Choose Your Story", description: "Browse our curated collection of interactive narratives across multiple genres" },
              { step: "02", title: "Make Your Choices", description: "Engage with characters through meaningful dialogue and branching decisions" },
              { step: "03", title: "Shape the Outcome", description: "Watch your choices create unique storylines and multiple endings" }
            ].map((item, idx) => (
              <div key={idx} className="text-center relative">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
                {idx < 2 && (
                  <ChevronRight className="hidden md:block absolute top-8 -right-4 text-purple-400" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-900/50 to-pink-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Write Your Story?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of readers experiencing interactive narratives like never before
          </p>
          <button className="bg-white text-purple-900 px-10 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-white/50 transition transform hover:scale-105">
            Get Started Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-black/40 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="w-6 h-6 text-purple-400" />
                <span className="text-xl font-bold">StoryWeave</span>
              </div>
              <p className="text-gray-400 text-sm">
                Interactive storytelling reimagined
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-purple-400">Features</a></li>
                <li><a href="#" className="hover:text-purple-400">Stories</a></li>
                <li><a href="#" className="hover:text-purple-400">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-purple-400">About</a></li>
                <li><a href="#" className="hover:text-purple-400">Blog</a></li>
                <li><a href="#" className="hover:text-purple-400">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-purple-400">Help Center</a></li>
                <li><a href="#" className="hover:text-purple-400">Contact</a></li>
                <li><a href="#" className="hover:text-purple-400">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-gray-400 text-sm">
            <p>© 2024 StoryWeave. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}