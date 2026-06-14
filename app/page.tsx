'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { Shield, ArrowRight, Terminal, CheckCircle, AlertTriangle, Copy, Check } from 'lucide-react'
import { useState } from 'react'

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

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button onClick={handleCopy} className="text-slate-500 hover:text-cyan-400 transition-colors" title="Copy prompt">
      {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
    </button>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#030712]">
      <Navigation />

      {/* Hero */}
      <section className="relative min-h-screen pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-overlay" />
        <div className="absolute top-1/4 -right-48 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -left-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="space-y-8">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="badge">
                <div className="status-online" />
                <span>Open Source Security Scanner</span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-5xl lg:text-6xl font-display font-bold leading-tight">
                The first security scanner{' '}
                <span className="text-cyan-400 neon-text">built for AI-generated code</span>.
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-lg text-slate-400 max-w-xl leading-relaxed">
                Guardiant detects vulnerabilities unique to Cursor, Copilot, Claude Code, and v0.dev.
                The ones traditional scanners were never designed to find.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-wrap gap-4">
                <a href="https://github.com/paarthbhatt/Guardiant" target="_blank" rel="noopener noreferrer" className="btn-primary">
                  View on GitHub
                  <ArrowRight className="w-4 h-4 ml-2 inline" />
                </a>
                <a href="#agent-prompts" className="btn-secondary">
                  Copy a Prompt
                </a>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="grid grid-cols-3 gap-8 pt-8 border-t border-[rgba(59,130,246,0.15)]">
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

            {/* Terminal */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="relative">
              <div className="terminal relative">
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
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
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
                <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-cyan-400/50" />
                <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-cyan-400/50" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-cyan-400/50" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-cyan-400/50" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Guardiant */}
      <section className="py-24 border-t border-[rgba(59,130,246,0.15)]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <div className="badge mb-6">WHY GUARDIANT</div>
            <h2 className="text-4xl font-display font-bold text-white mb-4">
              Traditional scanners find CVEs. <span className="text-cyan-400 neon-text">We find structural flaws.</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              AI coding assistants introduce predictable vulnerability patterns. Guardiant was built to detect them.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card p-8 max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[rgba(59,130,246,0.15)]">
                  <th className="text-left py-4 text-slate-500 font-mono text-sm">VULNERABILITY PATTERN</th>
                  <th className="text-center py-4 text-slate-500 font-mono text-sm">SNYK / SONARQUBE</th>
                  <th className="text-center py-4 text-cyan-400 font-mono text-sm">GUARDIANT</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Symmetric CRUD (IDOR)', false, true],
                  ['Missing Row Level Security', false, true],
                  ['Client-side authority checks', false, true],
                  ['Auth/authz conflation chains', false, true],
                  ['Over-permissive defaults', false, true],
                  ['BaaS direct database bypass', false, true],
                  ['Trust boundary inversions', false, true],
                ].map(([pattern, legacy, guardiant]) => (
                  <tr key={pattern as string} className="border-b border-[rgba(59,130,246,0.08)]">
                    <td className="py-4 text-slate-300 font-mono text-sm">{pattern}</td>
                    <td className="text-center py-4 text-red-400 font-mono text-sm">{legacy ? 'Yes' : 'No'}</td>
                    <td className="text-center py-4 text-green-400 font-mono text-sm">{guardiant ? 'Yes' : 'No'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 border-t border-[rgba(59,130,246,0.15)]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <div className="badge mb-6">HOW IT WORKS</div>
            <h2 className="text-4xl font-display font-bold text-white mb-4">
              5-phase engine. <span className="text-cyan-400 neon-text">8 specialized agents.</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Recon maps the attack surface. The agent swarm analyzes in parallel. Three research frameworks find what others miss.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { phase: '01', title: 'Recon', desc: 'Discover endpoints, tech stack, auth mechanisms, exposed configs.' },
              { phase: '02', title: 'Agent Swarm', desc: '8 specialized agents analyze different vulnerability classes in parallel.' },
              { phase: '03', title: 'CVC Analysis', desc: 'Chain related findings into compound vulnerability attack paths.' },
              { phase: '04', title: 'TIEF Detection', desc: 'Find trust inversions where code trusts the wrong boundary.' },
            ].map((item, i) => (
              <motion.div key={item.phase} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="card p-6">
                <div className="text-xs font-mono text-cyan-400 mb-2">PHASE {item.phase}</div>
                <h3 className="text-lg font-display font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Agent List */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16 max-w-4xl mx-auto">
            <h3 className="text-xl font-display font-bold text-white mb-6 text-center">The 8 Agents</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {agents.map((agent) => (
                <div key={agent.name} className="flex items-start gap-3 p-4 bg-[#111827] rounded border border-[rgba(59,130,246,0.1)]">
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
      <section id="agent-prompts" className="py-24 border-t border-[rgba(59,130,246,0.15)]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <div className="badge mb-6">AGENT PROMPT LIBRARY</div>
            <h2 className="text-4xl font-display font-bold text-white mb-4">
              Copy a prompt. <span className="text-cyan-400 neon-text">Paste into your coding agent.</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Works with Cursor, GitHub Copilot, Claude Code, Windsurf, and any coding agent that accepts natural language instructions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {prompts.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="terminal">
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
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-24 border-t border-[rgba(59,130,246,0.15)]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <div className="badge mb-6">QUICK START</div>
            <h2 className="text-4xl font-display font-bold text-white mb-4">
              Running in <span className="text-cyan-400 neon-text">3 commands</span>.
            </h2>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="terminal max-w-3xl mx-auto">
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
                <span className="text-slate-300">cd Guardiant && pnpm install && pnpm build</span>
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

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12 text-center">
            <a href="https://github.com/paarthbhatt/Guardiant#installation" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 font-mono text-sm transition-colors">
              View full installation instructions for Windows, macOS, Linux, and Docker →
            </a>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-[rgba(59,130,246,0.15)]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card-glow p-12 text-center max-w-4xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-cyan-400/50" />
            <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-cyan-400/50" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-cyan-400/50" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-cyan-400/50" />

            <Shield className="w-12 h-12 text-cyan-400 mx-auto mb-6" />
            <h2 className="text-4xl font-display font-bold text-white mb-4">
              Open source. <span className="text-cyan-400 neon-text">MIT licensed.</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
              Guardiant is free to use, modify, and distribute. Star the repo if you find it useful.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://github.com/paarthbhatt/Guardiant" target="_blank" rel="noopener noreferrer" className="btn-primary">
                Star on GitHub
                <ArrowRight className="w-4 h-4 ml-2 inline" />
              </a>
              <a href="https://github.com/paarthbhatt/Guardiant/issues" target="_blank" rel="noopener noreferrer" className="btn-secondary">
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
