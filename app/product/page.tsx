'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Search, Brain, Code, GitBranch, Award } from 'lucide-react'

const phases = [
  {
    id: 'recon',
    title: 'RECON',
    subtitle: 'Intelligent Discovery',
    icon: Search,
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
    description: 'Autonomous reconnaissance agents map your entire attack surface in minutes. Our AI-powered discovery identifies assets that traditional scanners miss.',
    features: ['Endpoint mapping', 'API discovery', 'Auth flow analysis', 'Tech fingerprinting'],
    cmd: 'guardiant recon --auto',
  },
  {
    id: 'swarm',
    title: 'AGENT SWARM',
    subtitle: 'Orchestrated Analysis',
    icon: Brain,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    description: '8 specialized LLM-powered security agents work in concert, analyzing different aspects with unprecedented depth.',
    features: ['8 AI specialists', 'Parallel execution', 'Cross-agent comms', 'Consensus findings'],
    cmd: 'guardiant swarm --agents 8',
  },
  {
    id: 'vcvf',
    title: 'VCVF',
    subtitle: 'AI Code Flaw Detection',
    icon: Code,
    color: 'text-green-400',
    bg: 'bg-green-400/10',
    description: 'Detects vulnerabilities introduced by AI code generation tools, catching logical flaws traditional scanners miss.',
    features: ['LLM pattern recognition', 'Logical flaw detection', 'Supply chain AI scan', 'Context analysis'],
    cmd: 'guardiant vcvf --deep',
  },
  {
    id: 'cvc',
    title: 'CVC',
    subtitle: 'Vulnerability Chains',
    icon: GitBranch,
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
    description: 'Connects isolated vulnerabilities into attack chains, revealing critical exploit paths that compound risk.',
    features: ['Correlation engine', 'Attack path viz', 'Risk amplification', 'Priority chaining'],
    cmd: 'guardiant cvc --chain',
  },
  {
    id: 'tief',
    title: 'TIEF',
    subtitle: 'Impact Scoring',
    icon: Award,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    description: 'Quantifies real-world impact with business context, transforming vulnerabilities into strategic intelligence.',
    features: ['Business impact', 'Exploitability', 'Priority scoring', 'Executive reports'],
    cmd: 'guardiant tief --report',
  },
]

export default function ProductPage() {
  const [activePhase, setActivePhase] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('[data-phase]')
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect()
        if (rect.top < window.innerHeight / 2 && rect.bottom > 0) {
          setActivePhase(index)
        }
      })
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToPhase = (index: number) => {
    document.querySelector(`[data-phase="${index}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-[#030712]">
      <Navigation />

      <div className="pt-24 pb-20">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="badge mb-6">ENGINE</div>
            <h1 className="text-5xl lg:text-6xl font-display font-bold text-white mb-6">
              The 5-Phase{' '}
              <span className="text-cyan-400 neon-text">Engine</span>
            </h1>
            <p className="text-lg text-slate-400">
              8 specialized AI agents detect, correlate, and quantify vulnerabilities
              in ways impossible for traditional scanners.
            </p>
          </motion.div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Sticky Nav */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
              <div className="space-y-2">
                {phases.map((phase, index) => {
                  const Icon = phase.icon
                  const isActive = activePhase === index
                  
                  return (
                    <button
                      key={phase.id}
                      onClick={() => scrollToPhase(index)}
                      className={`w-full text-left p-4 rounded transition-all duration-200 flex items-start gap-4 ${
                        isActive 
                          ? 'bg-[#1a2235] border border-cyan-400/30' 
                          : 'hover:bg-[#111827]'
                      }`}
                    >
                      <div className={`p-2 rounded ${phase.bg}`}>
                        <Icon className={`w-5 h-5 ${phase.color}`} />
                      </div>
                      <div>
                        <div className={`text-xs font-mono ${phase.color}`}>{phase.title}</div>
                        <div className="text-sm text-slate-300">{phase.subtitle}</div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Phases */}
            <div className="lg:col-span-8 space-y-24">
              {phases.map((phase, index) => {
                const Icon = phase.icon
                
                return (
                  <motion.section
                    key={phase.id}
                    data-phase={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                  >
                    <div className="terminal">
                      <div className="terminal-header">
                        <div className="terminal-dot bg-red-500" />
                        <div className="terminal-dot bg-yellow-500" />
                        <div className="terminal-dot bg-green-500" />
                        <span className="ml-4 text-xs text-slate-500 font-mono">phase-{phase.id}</span>
                      </div>
                      
                      <div className="terminal-body">
                        <div className="flex items-center gap-4 mb-6">
                          <div className={`p-4 rounded ${phase.bg}`}>
                            <Icon className={`w-8 h-8 ${phase.color}`} />
                          </div>
                          <div>
                            <div className={`text-xs font-mono ${phase.color}`}>PHASE {index + 1}</div>
                            <h2 className="text-2xl font-display font-bold text-white">{phase.title}</h2>
                            <div className="text-sm text-slate-500">{phase.subtitle}</div>
                          </div>
                        </div>

                        <p className="text-slate-400 mb-6 leading-relaxed">
                          {phase.description}
                        </p>

                        <div className="grid sm:grid-cols-2 gap-3 mb-6">
                          {phase.features.map((feature, i) => (
                            <div key={i} className="flex items-center gap-2 p-3 bg-[#111827] rounded text-sm text-slate-400">
                              <span className="text-green-400">→</span>
                              {feature}
                            </div>
                          ))}
                        </div>

                        <div className="p-3 bg-[#111827] rounded font-mono text-sm">
                          <span className="text-green-400">$</span>{' '}
                          <span className="text-slate-400">{phase.cmd}</span>
                        </div>
                      </div>
                    </div>
                  </motion.section>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
