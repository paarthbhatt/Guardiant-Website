'use client'

import { motion } from 'framer-motion'
import { Shield, ArrowRight, Terminal, CheckCircle, AlertTriangle } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen pt-24 pb-16 overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-overlay" />
      
      {/* Ambient glow */}
      <div className="absolute top-1/4 -right-48 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 -left-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="badge"
            >
              <div className="status-online" />
              <span>AI-Native Security Platform</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl lg:text-6xl font-display font-bold leading-tight"
            >
              Stop chasing{' '}
              <span className="text-cyan-400 neon-text">false positives</span>.
              <br />
              Deploy the{' '}
              <span className="text-blue-400 neon-text-blue">Swarm</span>.
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-slate-400 max-w-xl leading-relaxed"
            >
              Guardiant orchestrates 8 LLM-powered security agents to analyze your 
              application business logic, detect AI-generated code flaws, and 
              chain vulnerabilities together.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <button className="btn-primary">
                Deploy Guardiant
                <ArrowRight className="w-4 h-4 ml-2 inline" />
              </button>
              <button className="btn-secondary">
                View Documentation
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-3 gap-8 pt-8 border-t border-[rgba(59,130,246,0.15)]"
            >
              <div>
                <div className="text-3xl font-display font-bold text-cyan-400 neon-text">8</div>
                <div className="text-sm text-slate-500 mt-1">AI Agents</div>
              </div>
              <div>
                <div className="text-3xl font-display font-bold text-blue-400">93%</div>
                <div className="text-sm text-slate-500 mt-1">FP Reduction</div>
              </div>
              <div>
                <div className="text-3xl font-display font-bold text-green-400">5</div>
                <div className="text-sm text-slate-500 mt-1">Phase Engine</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="terminal relative">
              {/* Terminal Header */}
              <div className="terminal-header">
                <div className="terminal-dot bg-red-500" />
                <div className="terminal-dot bg-yellow-500" />
                <div className="terminal-dot bg-green-500" />
                <span className="ml-4 text-xs text-slate-500 font-mono">guardiant-agent-swarm</span>
              </div>

              {/* Terminal Body */}
              <div className="terminal-body space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-green-400">$</span>
                  <span className="text-slate-300">guardiant scan --target ./src</span>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-slate-500"
                >
                  [00:00:01] Initializing 8 security agents...
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="space-y-2"
                >
                  <div className="flex items-center gap-2 text-cyan-400">
                    <CheckCircle className="w-4 h-4" />
                    <span>RECON: 47 endpoints mapped</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-400">
                    <CheckCircle className="w-4 h-4" />
                    <span>SWARM: 8 agents active</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle className="w-4 h-4" />
                    <span>VCVF: 2 AI code flaws detected</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle className="w-4 h-4" />
                    <span>CVC: 1 vulnerability chain found</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.8 }}
                  className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
                >
                  <div className="flex items-center gap-2 text-red-400 font-semibold">
                    <AlertTriangle className="w-5 h-5" />
                    <span>CRITICAL: Exploit chain detected</span>
                  </div>
                  <div className="mt-2 text-sm text-slate-400">
                    TIEF Score: 9.2/10 | Priority: P0 | CVSS: 9.8
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.2 }}
                  className="flex items-center gap-2 pt-4"
                >
                  <span className="text-green-400">$</span>
                  <span className="cursor text-cyan-400">█</span>
                </motion.div>
              </div>

              {/* HUD corners */}
              <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-cyan-400/50" />
              <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-cyan-400/50" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-cyan-400/50" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-cyan-400/50" />
            </div>

            {/* Floating Status */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.5 }}
              className="absolute -bottom-4 -left-4 card-glow px-4 py-3 flex items-center gap-3"
            >
              <div className="status-online" />
              <span className="text-sm text-slate-300">Live scan active</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
