'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { ChevronRight, AlertTriangle, GitBranch, Shield, Code, Search, Layers, ArrowRight } from 'lucide-react'

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
}

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }
}

const vcvfPatterns = [
  {
    id: 'sym-crud',
    name: 'Symmetric CRUD Vulnerabilities',
    severity: 'high',
    description: 'AI tools generate UPDATE/DELETE endpoints with identical authorization logic as GET endpoints. No ownership verification.',
    example: `// AI-generated: same auth check for all operations
router.delete('/api/users/:id', async (req, res) => {
  if (!req.session.userId) return res.status(401).send();
  // BUG: Any authenticated user can delete ANY user
  await db.users.delete({ id: req.params.id });
  res.send({ success: true });
});`,
    detection: 'Pattern match: delete/update handlers with identical auth middleware as read handlers, no resource ownership check.',
  },
  {
    id: 'missing-rls',
    name: 'Missing Row Level Security',
    severity: 'critical',
    description: 'Supabase/Firebase tables created without RLS policies. Client-side SDK queries bypass all server-side access control.',
    example: `-- AI-generated: table created but no RLS
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  email TEXT,
  role TEXT DEFAULT 'user'
);
-- RLS never enabled. Any client can read/write all rows.
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
-- No policies created. RLS is enabled but permissive.`
,
    detection: 'Scan for Supabase tables without restrictive RLS policies. Detect direct .from() calls in client code.',
  },
  {
    id: 'client-authority',
    name: 'Client-Side Authority',
    severity: 'high',
    description: 'Authorization decisions made in frontend JavaScript. Trivially bypassed by calling APIs directly.',
    example: `// AI-generated: role check only in frontend
function AdminPanel() {
  const { user } = useAuth();
  if (user.role !== 'admin') {
    return <div>Access Denied</div>; // Visual only
  }
  return <AdminDashboard />; // API calls have no server-side check
}`,
    detection: 'Detect role/permission checks in JSX/render logic without corresponding server-side middleware.',
  },
  {
    id: 'auth-authz',
    name: 'Auth/Authz Conflation',
    severity: 'high',
    description: 'Authentication (is logged in?) confused with authorization (is allowed?). Every authenticated user gets the same access.',
    example: `// AI-generated: checks auth, not authz
async function deleteProject(req, res) {
  if (!req.user) return res.status(401).send();
  // BUG: Any logged-in user can delete any project
  const project = await db.projects.delete(req.params.id);
  res.send({ success: true });
}`,
    detection: 'Find handlers where auth check exists but no resource-level ownership/permission check follows.',
  },
]

const cvcExamples = [
  {
    chain: ['Missing RLS', '→', 'Direct DB Access', '→', 'Data Exfiltration'],
    severity: 'critical',
    description: 'A table without RLS allows any client to query all rows. Combined with a client-side SDK, an attacker can exfiltrate the entire database.',
    cvss: '9.8',
  },
  {
    chain: ['Client-Side Auth', '→', 'API Endpoint', '→', 'Privilege Escalation'],
    severity: 'critical',
    description: 'Role checks only in the frontend. An attacker calls the API directly with a modified request, gaining admin access.',
    cvss: '9.1',
  },
  {
    chain: ['Symmetric CRUD', '→', 'IDOR', '→', 'Account Takeover'],
    severity: 'high',
    description: 'Update endpoint uses same auth as read. Attacker modifies user_id in the request body to take over any account.',
    cvss: '8.8',
  },
]

const tiefInversions = [
  {
    type: 'Frontend Auth Logic',
    misplaced: 'Client-side role checks',
    actual: 'Server-side middleware',
    description: 'The code assumes the frontend is the security boundary. An attacker bypasses it by calling the API directly.',
    icon: Code,
  },
  {
    type: 'BaaS SDK Trust',
    misplaced: 'Supabase/Firebase client SDK',
    actual: 'Row Level Security policies',
    description: 'The code trusts the client SDK to enforce access control. Without RLS, the SDK is an open door.',
    icon: Layers,
  },
  {
    type: 'Optimistic Validation',
    misplaced: 'Client-side form validation only',
    actual: 'Server-side input sanitization',
    description: 'Validation runs only in the browser. An attacker sends raw requests with malicious payloads.',
    icon: Search,
  },
]

export default function ResearchPage() {
  const [activePattern, setActivePattern] = useState(0)

  return (
    <div className="min-h-screen bg-[#030712]">
      <Navigation />

      <div className="pt-24">
        {/* Header */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 grid-overlay" />
          <div className="absolute top-1/2 -right-48 w-[500px] h-[500px] bg-cyan-500/[0.03] rounded-full blur-[120px]" />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              <div className="badge mb-6">ORIGINAL RESEARCH</div>
              <h1 className="text-5xl lg:text-6xl font-display font-bold text-white mb-6 tracking-tight leading-[1.1]">
                Three frameworks for detecting{' '}
                <span className="text-cyan-400 neon-text">AI-generated code vulnerabilities</span>
              </h1>
              <p className="text-lg text-slate-400 max-w-3xl leading-relaxed">
                Guardiant is built on three research frameworks that formalize how AI coding assistants
                introduce structural security flaws. These frameworks are reproducible, applicable
                beyond Guardiant, and represent a new class of vulnerability detection.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Overview Cards */}
        <section className="py-16 border-t border-[rgba(59,130,246,0.08)]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
            >
              {[
                { abbr: 'VCVF', name: 'Vibe Code Vulnerability Fingerprinting', icon: Code, color: 'cyan', desc: 'Catalogs the specific vulnerability patterns AI tools introduce systematically.' },
                { abbr: 'CVC', name: 'Compound Vulnerability Chaining', icon: GitBranch, color: 'blue', desc: 'Connects isolated medium-severity findings into critical attack paths.' },
                { abbr: 'TIEF', name: 'Trust Inversion Edge Finding', icon: Shield, color: 'green', desc: 'Identifies where code trusts the wrong boundary — client, SDK, or frontend.' },
              ].map((fw) => (
                <motion.a
                  key={fw.abbr}
                  href={`#${fw.abbr.toLowerCase()}`}
                  variants={fadeInUp}
                  className="card p-7 group hover:border-cyan-400/20 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg bg-${fw.color}-400/[0.08] group-hover:bg-${fw.color}-400/[0.12] transition-colors`}>
                      <fw.icon className={`w-5 h-5 text-${fw.color}-400`} />
                    </div>
                    <span className={`font-mono text-sm font-bold text-${fw.color}-400`}>{fw.abbr}</span>
                  </div>
                  <h3 className="text-lg font-display font-bold text-white mb-2">{fw.name}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{fw.desc}</p>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </section>

        {/* VCVF */}
        <section id="vcvf" className="py-24 border-t border-[rgba(59,130,246,0.08)]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-12 gap-12">
              {/* Left nav */}
              <div className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="badge mb-4">FRAMEWORK 01</div>
                  <h2 className="text-3xl font-display font-bold text-white mb-4">VCVF</h2>
                  <p className="text-sm text-slate-400 mb-8 leading-relaxed">
                    Vibe Code Vulnerability Fingerprinting catalogs the structural patterns
                    that AI coding assistants introduce. Each pattern is reproducible across
                    different AI tools and codebases.
                  </p>
                  <div className="space-y-2">
                    {vcvfPatterns.map((pattern, i) => (
                      <button
                        key={pattern.id}
                        onClick={() => setActivePattern(i)}
                        className={`w-full text-left p-3 rounded-lg transition-all duration-200 text-sm font-mono ${
                          activePattern === i
                            ? 'bg-cyan-400/[0.08] border border-cyan-400/20 text-cyan-400'
                            : 'text-slate-500 hover:text-slate-300 hover:bg-[#111827]'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <ChevronRight className="w-3 h-3" />
                          {pattern.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Right content */}
              <div className="lg:col-span-8">
                <motion.div
                  key={activePattern}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="terminal">
                    <div className="terminal-header">
                      <div className="terminal-dot bg-red-500" />
                      <div className="terminal-dot bg-yellow-500" />
                      <div className="terminal-dot bg-green-500" />
                      <span className="ml-4 text-xs text-slate-500 font-mono">vcvf/{vcvfPatterns[activePattern].id}</span>
                    </div>
                    <div className="terminal-body space-y-6">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <span className={`px-2 py-0.5 rounded text-xs font-mono ${
                            vcvfPatterns[activePattern].severity === 'critical'
                              ? 'bg-red-500/20 text-red-400'
                              : 'bg-orange-500/20 text-orange-400'
                          }`}>
                            {vcvfPatterns[activePattern].severity.toUpperCase()}
                          </span>
                          <h3 className="text-xl font-display font-bold text-white">
                            {vcvfPatterns[activePattern].name}
                          </h3>
                        </div>
                        <p className="text-slate-400 leading-relaxed">
                          {vcvfPatterns[activePattern].description}
                        </p>
                      </div>

                      <div>
                        <div className="text-xs font-mono text-cyan-400 mb-3 uppercase tracking-wider">Vulnerable Pattern</div>
                        <pre className="bg-[#0a0f1c] rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
                          <code className="text-slate-400">{vcvfPatterns[activePattern].example}</code>
                        </pre>
                      </div>

                      <div>
                        <div className="text-xs font-mono text-cyan-400 mb-3 uppercase tracking-wider">Detection Method</div>
                        <p className="text-sm text-slate-400 leading-relaxed">
                          {vcvfPatterns[activePattern].detection}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* CVC */}
        <section id="cvc" className="py-24 border-t border-[rgba(59,130,246,0.08)]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="max-w-4xl mx-auto"
            >
              <motion.div variants={fadeInUp} className="text-center mb-16">
                <div className="badge mb-6">FRAMEWORK 02</div>
                <h2 className="text-4xl lg:text-5xl font-display font-bold text-white mb-5 tracking-tight">
                  Compound Vulnerability{' '}
                  <span className="text-blue-400 neon-text-blue">Chaining</span>
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                  Individual medium-severity findings become critical when chained together.
                  CVC identifies these attack paths automatically.
                </p>
              </motion.div>

              <div className="space-y-6">
                {cvcExamples.map((ex, i) => (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    className="card p-8 hover:border-blue-400/20 transition-colors"
                  >
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      {ex.chain.map((link, j) => (
                        <span key={j} className={link === '→' ? 'text-slate-600 text-sm' : 'px-3 py-1 bg-[#111827] rounded font-mono text-sm text-blue-400 border border-[rgba(59,130,246,0.15)]'}>
                          {link}
                        </span>
                      ))}
                      <span className="ml-auto px-2 py-0.5 rounded text-xs font-mono bg-red-500/20 text-red-400">
                        CVSS {ex.cvss}
                      </span>
                    </div>
                    <p className="text-slate-400 leading-relaxed">{ex.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* TIEF */}
        <section id="tief" className="py-24 border-t border-[rgba(59,130,246,0.08)]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="max-w-4xl mx-auto"
            >
              <motion.div variants={fadeInUp} className="text-center mb-16">
                <div className="badge mb-6">FRAMEWORK 03</div>
                <h2 className="text-4xl lg:text-5xl font-display font-bold text-white mb-5 tracking-tight">
                  Trust Inversion{' '}
                  <span className="text-green-400 neon-text-green">Edge Finding</span>
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                  Every application has trust boundaries. TIEF identifies where the code trusts
                  the wrong boundary — and shows you the exploit path.
                </p>
              </motion.div>

              <div className="space-y-6">
                {tiefInversions.map((inv, i) => (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    className="card p-8 hover:border-green-400/20 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-green-400/[0.08] shrink-0">
                        <inv.icon className="w-6 h-6 text-green-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-display font-bold text-white mb-3">{inv.type}</h3>
                        <div className="grid sm:grid-cols-2 gap-4 mb-4">
                          <div className="p-4 bg-red-500/[0.06] rounded-lg border border-red-500/10">
                            <div className="text-xs font-mono text-red-400 mb-1 uppercase tracking-wider">Misplaced Trust</div>
                            <div className="text-sm text-slate-300">{inv.misplaced}</div>
                          </div>
                          <div className="p-4 bg-green-500/[0.06] rounded-lg border border-green-500/10">
                            <div className="text-xs font-mono text-green-400 mb-1 uppercase tracking-wider">Actual Boundary</div>
                            <div className="text-sm text-slate-300">{inv.actual}</div>
                          </div>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed">{inv.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 border-t border-[rgba(59,130,246,0.08)]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card-glow p-14 text-center max-w-4xl mx-auto relative"
            >
              <h2 className="text-3xl font-display font-bold text-white mb-4">
                These frameworks are open source
              </h2>
              <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
                The implementations, detection logic, and test cases are all available
                in the Guardiant repository. Use them, extend them, or build your own tools on top.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="https://github.com/paarthbhatt/Guardiant/tree/main/packages/core/src/analyzers" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center">
                  View Framework Source
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
                <a href="https://github.com/paarthbhatt/Guardiant#readme" target="_blank" rel="noopener noreferrer" className="btn-secondary inline-flex items-center">
                  Read the Paper
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
