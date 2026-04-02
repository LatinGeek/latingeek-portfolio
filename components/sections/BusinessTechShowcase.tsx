'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Cpu, Zap, Shield, Database, Cloud, BarChart, TrendingUp, Users } from 'lucide-react';

// Dynamically import the Three.js scene with no SSR (WebGL requires client-side)
const BusinessTechScene = dynamic(
  () => import('@/components/three/BusinessTechScene'),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-[600px] bg-gradient-to-br from-gray-900 to-black rounded-xl flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-300">Loading interactive 3D tech visualization...</p>
        </div>
      </div>
    )
  }
);

// Business benefits data
const BUSINESS_BENEFITS = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Performance Optimization",
    description: "Enterprise-grade applications with 90+ Lighthouse scores and sub-50ms API latency",
    metrics: "98% performance score",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Security & Compliance",
    description: "SOC2-ready architectures with automated security scanning and vulnerability management",
    metrics: "95% security score",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "Scalable Architecture",
    description: "Systems designed for 10k+ concurrent users with 99.99% uptime SLA guarantees",
    metrics: "10k concurrent users",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: <Cloud className="w-6 h-6" />,
    title: "Cloud Infrastructure",
    description: "AWS, Azure, GCP expertise with infrastructure-as-code and automated deployments",
    metrics: "15+ cloud services",
    color: "from-orange-500 to-yellow-500",
  },
];

// Client testimonials
const TESTIMONIALS = [
  {
    quote: "The technical architecture delivered exceeded our scalability requirements by 300%. The system handles peak traffic without performance degradation.",
    author: "CTO, FinTech Startup",
    company: "Series B, $50M ARR",
  },
  {
    quote: "Implementation of microservices and container orchestration reduced our deployment time from days to minutes while improving system reliability.",
    author: "VP Engineering, SaaS Platform",
    company: "Enterprise, 500+ employees",
  },
  {
    quote: "The performance optimizations resulted in 40% reduction in infrastructure costs while improving user experience metrics across all KPIs.",
    author: "Director of Technology, E-commerce",
    company: "$200M+ annual revenue",
  },
];

export default function BusinessTechShowcase() {
  const [activeBenefit, setActiveBenefit] = useState(0);
  const [webGLAvailable, setWebGLAvailable] = useState(true);

  // Check WebGL availability
  useEffect(() => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    setWebGLAvailable(!!gl);
  }, []);

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-gray-900 to-black">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 mb-6">
            <Cpu className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">Enterprise Technology Showcase</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="block">Architecting </span>
            <span className="block mt-2 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Business-First Technology
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Transforming complex business requirements into scalable, high-performance technical solutions.
            Enterprise architecture, cloud infrastructure, and full-stack development with measurable ROI.
          </p>
        </div>

        {/* Main 3D Showcase */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Interactive Tech Stack Visualization</h2>
              <p className="text-gray-400">
                Explore the technologies and architectures that power enterprise-grade applications
              </p>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span className="text-gray-300">Click nodes for details</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-gray-300">Drag to navigate</span>
              </div>
            </div>
          </div>

          {webGLAvailable ? (
            <BusinessTechScene />
          ) : (
            <div className="w-full h-[600px] bg-gradient-to-br from-gray-900 to-black rounded-xl border border-gray-800 flex items-center justify-center p-8">
              <div className="text-center max-w-md">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 mb-6">
                  <Cpu className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">WebGL Not Available</h3>
                <p className="text-gray-400 mb-6">
                  Your browser or corporate environment doesn't support WebGL. This interactive 3D visualization requires WebGL to demonstrate our technical architecture capabilities.
                </p>
                <div className="flex gap-3 justify-center">
                  <a 
                    href="#contact" 
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Schedule Technical Demo
                  </a>
                  <a 
                    href="/portfolio.pdf" 
                    className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg border border-gray-700 transition-colors"
                  >
                    Download Technical PDF
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Business Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {BUSINESS_BENEFITS.map((benefit, index) => (
            <div
              key={index}
              className={`relative p-6 rounded-xl border transition-all duration-300 cursor-pointer ${
                activeBenefit === index
                  ? 'border-blue-500/50 bg-gradient-to-br from-gray-800 to-gray-900 transform scale-[1.02] shadow-2xl'
                  : 'border-gray-800 bg-gray-900/50 hover:border-gray-700 hover:bg-gray-900'
              }`}
              onClick={() => setActiveBenefit(index)}
              onMouseEnter={() => setActiveBenefit(index)}
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-10 rounded-xl" />
              
              <div className="relative z-10">
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${benefit.color} mb-4`}>
                  {benefit.icon}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-gray-300 mb-4">{benefit.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-white px-3 py-1 rounded-full bg-gray-800">
                    {benefit.metrics}
                  </span>
                  <TrendingUp className="w-5 h-5 text-green-400" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Client Impact */}
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 p-8 md:p-12 mb-20">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-10">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">Measurable Business Impact</h2>
              <p className="text-gray-300 max-w-2xl">
                Our technical solutions deliver tangible ROI through performance optimization, cost reduction, and scalability improvements.
              </p>
            </div>
            
            <div className="flex items-center gap-4 bg-gray-800/50 rounded-xl p-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">15-40%</div>
                <div className="text-sm text-gray-400">Cost Reduction</div>
              </div>
              <div className="h-12 w-px bg-gray-700" />
              <div className="text-center">
                <div className="text-3xl font-bold text-white">300%</div>
                <div className="text-sm text-gray-400">Scalability Increase</div>
              </div>
              <div className="h-12 w-px bg-gray-700" />
              <div className="text-center">
                <div className="text-3xl font-bold text-white">99.99%</div>
                <div className="text-sm text-gray-400">Uptime SLA</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-800/30 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.author}</div>
                    <div className="text-sm text-gray-400">{testimonial.company}</div>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center justify-center bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 p-8 md:p-12">
            <div className="text-left">
              <h3 className="text-2xl font-bold text-white mb-2">Ready to Transform Your Technology?</h3>
              <p className="text-gray-300 max-w-xl">
                Let's discuss how our enterprise architecture expertise can solve your business challenges.
                Schedule a technical discovery session to explore solutions.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#contact"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105"
              >
                Schedule Technical Consultation
              </a>
              <a
                href="#projects"
                className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl border border-gray-700 transition-colors"
              >
                View Case Studies
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute bottom-10 left-10 animate-bounce">
        <div className="w-2 h-2 bg-blue-500 rounded-full" />
      </div>
      <div className="absolute top-10 right-10 animate-pulse">
        <div className="w-3 h-3 bg-cyan-500 rounded-full" />
      </div>
    </section>
  );
}