'use client'

import { Shield, Github, Twitter, Linkedin } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(59,130,246,0.15)] bg-[#0a0f1c]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-cyan-400" />
              <span className="text-lg font-display font-bold text-white">GUARDIANT</span>
            </Link>
            <p className="text-sm text-slate-400 mb-6">
              The first security scanner built for AI-generated code.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com/paarthbhatt/Guardiant" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-cyan-400 transition-colors" aria-label="GitHub">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://twitter.com/paarthbhatt" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-cyan-400 transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/in/paarthbhatt" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-cyan-400 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">
              Product
            </h4>
            <ul className="space-y-3">
              <li><Link href="/product" className="text-sm text-slate-400 hover:text-white transition-colors">Features</Link></li>
              <li><Link href="/use-cases" className="text-sm text-slate-400 hover:text-white transition-colors">Use Cases</Link></li>
              <li><a href="https://github.com/paarthbhatt/Guardiant" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 hover:text-white transition-colors">GitHub</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-3">
              <li><a href="https://github.com/paarthbhatt/Guardiant#readme" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="https://github.com/paarthbhatt/Guardiant/issues" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 hover:text-white transition-colors">Report a Bug</a></li>
              <li><a href="https://github.com/paarthbhatt/Guardiant/discussions" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 hover:text-white transition-colors">Discussions</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              <li><a href="https://github.com/paarthbhatt/Guardiant/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 hover:text-white transition-colors">MIT License</a></li>
              <li><a href="https://github.com/paarthbhatt/Guardiant/blob/main/SECURITY.md" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 hover:text-white transition-colors">Security Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-[rgba(59,130,246,0.15)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 font-mono">
            {`// ${new Date().getFullYear()} Guardiant. MIT License.`}
          </p>
          <p className="text-sm text-slate-500 font-mono">
            STATUS: <span className="text-green-400">OPERATIONAL</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
