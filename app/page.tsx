'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Terminal, CheckCircle, AlertTriangle, Shield, Copy, Check, Zap, GitBranch, Eye, Lock } from 'lucide-react'
import { useState, useRef } from 'react'

const agents = [
  { name: 'recon', desc: 'Endpoints, tech stack, source maps, exposed configs' },
  { name: 'auth', desc: 'Authentication bypass, session fixation, JWT issues' },
  { name: 'injection', desc: 'SQL injection, XSS, command injection, SSTI' },
  { name: 'baas', desc: 'Supabase/Firebase misconfigs, missing RLS' },
  { name: 'secrets', desc: 'Hardcoded credentials, exposed API keys' },
  { name: 'supply_chain', desc: 'Dependency vulnerabilities, malicious packages' },
  { name: 'business_logic', desc: 'IDOR, price manipulation, auth/authz conflation' },
  { name: 'race_condition', desc: 'TOCTOU bugs, concurrent request abuse' },
]

const prompts = [
  {
    title: 'Scan this project',
    prompt: 'Clone https://github.com/paarthbhatt/Guardiant into a temporary directory, install dependencies with pnpm, build the project, then run a full security scan against the current working directory using: pnpm cli scan <current-directory> --type directory. Show me the complete scan results.',
  },
  {
    title: 'Scan a URL',
    prompt: 'Clone https://github.com/paarthbhatt/Guardiant, install with pnpm, build it, then scan https://example.com by running: pnpm cli scan https://example.com. Report all findings grouped by severity.',
  },
  {
    title: 'Targeted scan',
    prompt: 'Clone https://github.com/paarthbhatt/Guardiant, install with pnpm, build it, then run: pnpm cli scan <current-directory> --type directory --agents auth,injection,baas,race_condition. Show remediation steps for each finding.',
  },
]

const comparisonData = [
  ['Symmetric CRUD (IDOR)', false, true],
  ['Missing Row Level Security', false, true],
  ['Client-side authority checks', false, true],
  ['Auth/authz conflation chains', false, true],
  ['Over-permissive defaults', false, true],
  ['BaaS direct database bypass', false, true],
  ['Trust boundary inversions', false, true],
]

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 }
  }
}

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button onClick={handleCopy} className="text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer" title="Copy prompt">
      {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
    </button>
  )
}

export default function Home() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80])

  return (
    <main className="min-h-screen bg-[#030712]">
      <Navigation />

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-overlay" />

        {/* Ambient orbs — subtle depth */}
        <div className="absolute top-1/3 -right-64 w-[500px] h-[500px] bg-blue-500/[0.04] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -left-64 w-[500px] h-[500px] bg-cyan-500/[0.04] rounded-full blur-[120px]" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">

            {/* Left Content */}
            <motion.div style={{ opacity: heroOpacity, y: heroY }} className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="badge"
              >
                <div className="status-online" />
                <span>Open Source — MIT Licensed</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-5xl lg:text-[3.5rem] font-display font-bold leading-[1.1] tracking-tight"
              >
                The first security scanner{' '}
                <span className="text-cyan-400 neon-text">built for AI-generated code</span>.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-lg text-slate-400 max-w-xl leading-relaxed"
              >
                Guardiant detects vulnerabilities unique to Cursor, Copilot, Claude Code, and v0.dev.
                The ones traditional scanners were never designed to find.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap gap-4"
              >
                <a href="https://github.com/paarthbhatt/Guardiant" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center">
                  View on GitHub
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
                <a href="#agent-prompts" className="btn-secondary inline-flex items-center">
                  Copy a Prompt
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="grid grid-cols-3 gap-8 pt-8 border-t border-[rgba(59,130,246,0.1)]"
              >
                <div>
                  <div className="text-3xl font-display font-bold text-cyan-400 neon-text">8</div>
                  <div className="text-sm text-slate-500 mt-1">AI Agents</div>
                </div>
                <div>
                  <div className="text-3xl font-display font-bold text-blue-400">3</div>
                  <div className="text-sm text-slate-500 mt-1">Research Frameworks</div>
                </div>
                <div>
                  <div className="text-3xl font-display font-bold text-green-400">5</div>
                  <div className="text-sm text-slate-500 mt-1">Phase Engine</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right — Terminal with parallax */}
            <motion.div
              initial={{ opacity: 0, x: 30, rotateY: -5 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative perspective-container"
            >
              <div className="terminal relative transform-gpu">
                <div className="terminal-header">
                  <div className="terminal-dot bg-red-500" />
                  <div className="terminal-dot bg-yellow-500" />
                  <div className="terminal-dot bg-green-500" />
                  <span className="ml-4 text-xs text-slate-500 font-mono">guardiant scan</span>
                </div>
                <div className="terminal-body space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">$</span>
                    <span className="text-slate-300">guardiant scan https://myapp.com</span>
                  </div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-slate-500">
                    [00:00:01] Initializing 8 security agents...
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="space-y-2">
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
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} className="mt-6 p-4 bg-red-500/[0.08] border border-red-500/20 rounded-lg">
                    <div className="flex items-center gap-2 text-red-400 font-semibold">
                      <AlertTriangle className="w-5 h-5" />
                      <span>CRITICAL: Exploit chain detected</span>
                    </div>
                    <div className="mt-2 text-sm text-slate-400">
                      TIEF Score: 9.2/10 | Priority: P0 | CVSS: 9.8
                    </div>
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }} className="flex items-center gap-2 pt-4">
                    <span className="text-green-400">$</span>
                    <span className="cursor text-cyan-400">█</span>
                  </motion.div>
                </div>
                <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-cyan-400/40" />
                <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-cyan-400/40" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-cyan-400/40" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-cyan-400/40" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Guardiant */}
      <section className="py-32 border-t border-[rgba(59,130,246,0.08)]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.div variants={fadeInUp} className="badge mb-6">WHY GUARDIANT</motion.div>
            <motion.h2 variants={fadeInUp} className="text-4xl lg:text-5xl font-display font-bold text-white mb-5 tracking-tight">
              Traditional scanners find CVEs.{' '}
              <span className="text-cyan-400 neon-text">We find structural flaws.</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-400 max-w-2xl mx-auto text-lg">
              AI coding assistants introduce predictable vulnerability patterns.
              Guardiant was built to detect them.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="card p-8 lg:p-10 max-w-4xl mx-auto overflow-x-auto"
          >
            <table className="w-full">
              <thead>
                <tr className="border-b border-[rgba(59,130,246,0.12)]">
                  <th className="text-left py-4 text-slate-500 font-mono text-xs uppercase tracking-wider">Vulnerability Pattern</th>
                  <th className="text-center py-4 text-slate-500 font-mono text-xs uppercase tracking-wider">Legacy Scanners</th>
                  <th className="text-center py-4 text-cyan-400 font-mono text-xs uppercase tracking-wider">Guardiant</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map(([pattern, legacy, guardiant]) => (
                  <tr key={pattern as string} className="border-b border-[rgba(59,130,246,0.06)] last:border-0">
                    <td className="py-4 text-slate-300 font-mono text-sm">{pattern}</td>
                    <td className="text-center py-4 text-red-400/80 font-mono text-sm">{legacy ? 'Yes' : 'No'}</td>
                    <td className="text-center py-4 text-green-400 font-mono text-sm">{guardiant ? 'Yes' : 'No'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 border-t border-[rgba(59,130,246,0.08)]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.div variants={fadeInUp} className="badge mb-6">HOW IT WORKS</motion.div>
            <motion.h2 variants={fadeInUp} className="text-4xl lg:text-5xl font-display font-bold text-white mb-5 tracking-tight">
              5-phase engine.{' '}
              <span className="text-cyan-400 neon-text">8 specialized agents.</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-400 max-w-2xl mx-auto text-lg">
              Recon maps the attack surface. The agent swarm analyzes in parallel.
              Three research frameworks find what others miss.
            </motion.p>
          </motion.div>

          {/* Phases */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-20"
          >
            {[
              { phase: '01', title: 'Recon', icon: Eye, desc: 'Discover endpoints, tech stack, auth mechanisms, exposed configs.' },
              { phase: '02', title: 'Agent Swarm', icon: Zap, desc: '8 specialized agents analyze different vulnerability classes in parallel.' },
              { phase: '03', title: 'CVC Analysis', icon: GitBranch, desc: 'Chain related findings into compound vulnerability attack paths.' },
              { phase: '04', title: 'TIEF Detection', icon: Shield, desc: 'Find trust inversions where code trusts the wrong boundary.' },
            ].map((item) => (
              <motion.div key={item.phase} variants={fadeInUp} className="card p-7 group hover:border-cyan-400/20 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-cyan-400/[0.08] group-hover:bg-cyan-400/[0.12] transition-colors">
                    <item.icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div className="text-xs font-mono text-cyan-400">PHASE {item.phase}</div>
                </div>
                <h3 className="text-lg font-display font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Agents */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h3 className="text-xl font-display font-bold text-white mb-8 text-center">The 8 Agents</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {agents.map((agent) => (
                <div key={agent.name} className="flex items-start gap-3 p-4 bg-[#111827]/60 rounded-lg border border-[rgba(59,130,246,0.08)] hover:border-cyan-400/20 transition-colors">
                  <Terminal className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-mono text-sm text-cyan-400">{agent.name}</span>
                    <span className="text-sm text-slate-500 ml-2">{agent.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Agent Prompt Library */}
      <section id="agent-prompts" className="py-32 border-t border-[rgba(59,130,246,0.08)]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.div variants={fadeInUp} className="badge mb-6">AGENT PROMPT LIBRARY</motion.div>
            <motion.h2 variants={fadeInUp} className="text-4xl lg:text-5xl font-display font-bold text-white mb-5 tracking-tight">
              Copy a prompt.{' '}
              <span className="text-cyan-400 neon-text">Paste into your coding agent.</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-400 max-w-2xl mx-auto text-lg">
              Works with Cursor, GitHub Copilot, Claude Code, Windsurf, and any coding agent
              that accepts natural language instructions.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {prompts.map((item) => (
              <motion.div key={item.title} variants={fadeInUp} className="terminal">
                <div className="terminal-header">
                  <div className="terminal-dot bg-red-500" />
                  <div className="terminal-dot bg-yellow-500" />
                  <div className="terminal-dot bg-green-500" />
                  <span className="ml-4 text-xs text-slate-500 font-mono">{item.title.toLowerCase().replace(/\s/g, '-')}</span>
                  <div className="ml-auto">
                    <CopyButton text={item.prompt} />
                  </div>
                </div>
                <div className="terminal-body">
                  <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-line">{item.prompt}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-32 border-t border-[rgba(59,130,246,0.08)]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp} className="badge mb-6">QUICK START</motion.div>
            <motion.h2 variants={fadeInUp} className="text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
              Running in{' '}
              <span className="text-cyan-400 neon-text">3 commands</span>.
            </motion.h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="terminal max-w-3xl mx-auto"
          >
            <div className="terminal-header">
              <div className="terminal-dot bg-red-500" />
              <div className="terminal-dot bg-yellow-500" />
              <div className="terminal-dot bg-green-500" />
              <span className="ml-4 text-xs text-slate-500 font-mono">terminal</span>
            </div>
            <div className="terminal-body space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-green-400">$</span>
                <span className="text-slate-300">git clone https://github.com/paarthbhatt/Guardiant.git</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">$</span>
                <span className="text-slate-300">cd Guardiant &amp;&amp; pnpm install &amp;&amp; pnpm build</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">$</span>
                <span className="text-slate-300">export ANTHROPIC_API_KEY=&quot;sk-ant-...&quot;</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">$</span>
                <span className="text-slate-300">guardiant scan https://example.com</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 text-center"
          >
            <a href="https://github.com/paarthbhatt/Guardiant#installation" target="_blank" rel="noopener noreferrer" className="text-cyan-400/80 hover:text-cyan-400 font-mono text-sm transition-colors">
              View full installation instructions for Windows, macOS, Linux, and Docker →
            </a>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 border-t border-[rgba(59,130,246,0.08)]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card-glow p-14 text-center max-w-4xl mx-auto relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-cyan-400/30" />
            <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-cyan-400/30" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-cyan-400/30" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-cyan-400/30" />

            <Shield className="w-12 h-12 text-cyan-400 mx-auto mb-6 opacity-80" />
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-white mb-5 tracking-tight">
              Open source.{' '}
              <span className="text-cyan-400 neon-text">MIT licensed.</span>
            </h2>
            <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
              Guardiant is free to use, modify, and distribute.
              Star the repo if you find it useful.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://github.com/paarthbhatt/Guardiant" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center">
                Star on GitHub
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
              <a href="https://github.com/paarthbhatt/Guardiant/issues" target="_blank" rel="noopener noreferrer" className="btn-secondary inline-flex items-center">
                Report an Issue
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
