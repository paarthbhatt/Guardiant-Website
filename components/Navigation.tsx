'use client'

import Link from 'next/link'
import { Shield, Github, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: 'Product', href: '/product' },
    { name: 'Research', href: '/research' },
    { name: 'Use Cases', href: '/use-cases' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f1c]/90 backdrop-blur-md border-b border-[rgba(59,130,246,0.15)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative">
              <Shield className="w-7 h-7 text-cyan-400" />
              <div className="absolute inset-0 blur-md bg-cyan-400/30" />
            </div>
            <span className="text-lg font-display font-bold tracking-wide text-white">
              GUARDIANT
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://github.com/paarthbhatt/Guardiant"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>

          {/* Mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-400"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-[rgba(59,130,246,0.15)]">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <a
                href="https://github.com/paarthbhatt/Guardiant"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
