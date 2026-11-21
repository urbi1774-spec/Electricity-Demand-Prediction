import React, { useEffect, useState } from 'react';
import { Zap, Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../data/projectData';

export default function Navbar() {
  const [activeId, setActiveId] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0);
      setScrolled(scrollTop > 20);

      const sections = ['hero', ...NAV_LINKS.map((l) => l.id)];
      let current = 'hero';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) {
            current = id;
          }
        }
      }
      setActiveId(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FFFCF8]/92 backdrop-blur-xl border-b border-[#E8E1F3] shadow-sm shadow-[#B8A5D6]/15'
          : 'bg-[#FFFCF8]/75 backdrop-blur-md border-b border-transparent'
      }`}
    >
      {/* Subtle pastel reading progress line */}
      <div className="h-[3px] w-full bg-[#F7F4FC]">
        <div
          className="h-full bg-[#B8A5D6] transition-all duration-150"
          style={{ width: `${scrollPct}%` }}
        />
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#hero"
          className="flex items-center gap-2.5 group focus:outline-none"
          onClick={() => setMobileOpen(false)}
        >
          <div className="h-9 w-9 rounded-xl bg-[#B8A5D6] border border-[#A691C9] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
            <Zap className="h-5 w-5 text-[#34354A] fill-[#FFFFFF]/40" />
          </div>
          <div className="leading-tight">
            <span className="block text-sm font-bold text-[#34354A] tracking-tight">
              Electricity Demand
            </span>
            <span className="block text-[11px] font-mono text-[#6B5B92]">
              DS422 · ML-I Lab
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = activeId === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#F7F4FC] text-[#34354A] border border-[#B8A5D6]'
                    : 'text-[#5C5E76] hover:text-[#34354A] hover:bg-[#F7F4FC]/80 border border-transparent'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg text-[#34354A] hover:bg-[#F7F4FC] border border-[#E5DDF2] bg-white"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[#E8E1F3] bg-[#FFFCF8]/98 backdrop-blur-xl px-4 py-4 shadow-lg shadow-[#34354A]/5">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = activeId === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setMobileOpen(false)}
                  className={`px-3 py-2.5 rounded-xl text-sm font-medium text-center transition-colors ${
                    isActive
                      ? 'bg-[#F7F4FC] text-[#34354A] border border-[#B8A5D6] font-semibold'
                      : 'bg-white text-[#5C5E76] hover:text-[#34354A] border border-[#EAE4F3]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
