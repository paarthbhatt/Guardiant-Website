'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { Users, Cpu, Building2, Shield, LineChart, Scale } from 'lucide-react'

const useCases = [
  {
    title: 'DevSecOps Teams',
    icon: Users,
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
    border: 'border-cyan-400/30',
    description: 'Integrate seamlessly into your CI/CD pipeline and empower your DevOps team.',
    benefits: ['Pipeline-native integration', 'Shift-left automation', 'Real-time feedback', 'Automated ticketing'],
  },
  {
    title: 'AI-Assisted Developers',
    icon: Cpu,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    border: 'border-blue-400/30',
    description: 'Protect your AI-generated codebase with specialized vulnerability detection.',
    benefits: ['AI code pattern recognition', 'GitHub Copilot layer', 'Code review augmentation', 'Training validation'],
  },
  {
    title: 'Enterprise Compliance',
    icon: Building2,
    color: 'text-green-400',
    bg: 'bg-green-400/10',
    border: 'border-green-400/30',
    description: 'Meet SOC2, ISO27001, and regulatory requirements with comprehensive audit trails.',
    benefits: ['Compliance-ready reports', 'Audit trail generation', 'Governance automation', 'Risk dashboards'],
  },
  {
    title: 'Security Analysts',
    icon: Shield,
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
    border: 'border-cyan-400/30',
    description: 'Reduce false positives by 93% and focus on real threats with AI-powered triage.',
    benefits: ['False positive elimination', 'Attack chain visualization', 'Threat intelligence', 'Prioritization engine'],
  },
  {
    title: 'Product Managers',
    icon: LineChart,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    border: 'border-blue-400/30',
    description: 'Make informed decisions with quantified business impact and risk scoring.',
    benefits: ['Business risk quantification', 'ROI calculations', 'Stakeholder reporting', 'Release decisions'],
  },
  {
    title: 'Compliance Auditors',
    icon: Scale,
    color: 'text-green-400',
    bg: 'bg-green-400/10',
    border: 'border-green-400/30',
    description: 'Streamline audits with automated evidence collection and security documentation.',
    benefits: ['Automated evidence', 'Control mapping', 'Continuous monitoring', 'Compliance scorecards'],
  },
]

export default function UseCasesPage() {
  return (
    <div className="min-h-screen bg-[#030712]">
      <Navigation />

      <div className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="badge mb-6">USE CASES</div>
            <h1 className="text-5xl lg:text-6xl font-display font-bold text-white mb-6">
              Built for{' '}
              <span className="text-cyan-400 neon-text">every security role</span>
            </h1>
            <p className="text-lg text-slate-400">
              Whether you&apos;re a developer, security analyst, or compliance officer,
              Guardiant is designed to fit your workflow.
            </p>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {useCases.map((useCase, index) => {
              const Icon = useCase.icon
              
              return (
                <motion.div
                  key={useCase.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="card p-8 hover:border-cyan-400/30 transition-all duration-300 group"
                >
                  <div className={`p-3 rounded ${useCase.bg} w-fit mb-4`}>
                    <Icon className={`w-6 h-6 ${useCase.color}`} />
                  </div>
                  
                  <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {useCase.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed">{useCase.description}</p>
                  
                  <div className="space-y-2">
                    {useCase.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-slate-500">
                        <div className={`w-1 h-1 rounded-full ${useCase.bg}`} />
                        {benefit}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <div className="card-glow p-12 max-w-4xl mx-auto relative">
              <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-cyan-400/50" />
              <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-cyan-400/50" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-cyan-400/50" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-cyan-400/50" />
              
              <h2 className="text-3xl font-display font-bold text-white mb-4">
                Ready to transform your security workflow?
              </h2>
              <p className="text-slate-400 mb-8">
                Join thousands of security professionals who trust Guardiant.
              </p>
              <button className="btn-primary">Initialize System</button>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
