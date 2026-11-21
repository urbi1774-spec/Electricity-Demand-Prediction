import React from 'react';
import { Zap, ArrowUp, GraduationCap, BookOpen } from 'lucide-react';
import { NAV_LINKS } from '../data/projectData';

export default function Footer() {
  return (
    <footer className="border-t border-[#E5DDF2] bg-[#F7F4FC] pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-12 gap-8 pb-10 border-b border-[#E5DDF2]">
          {/* Project Identity */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-[#B8A5D6] border border-[#A48FC7] flex items-center justify-center shadow-xs">
                <Zap className="h-5 w-5 text-[#34354A] fill-white/40" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#34354A]">
                  Electricity Demand Prediction
                </h3>
                <p className="text-xs font-mono text-[#625288]">
                  Machine Learning Lab Project
                </p>
              </div>
            </div>
            <p className="text-sm text-[#585A73] leading-relaxed max-w-md">
              Predicting High Electricity Demand Using Machine Learning on Bangladesh&apos;s
              national power grid hourly generation and load dataset (
              <code className="font-mono text-[#5E4E84] bg-white border border-[#E5DDF2] px-1.5 py-0.5 rounded text-xs">
                pgcb_V1_raw.csv
              </code>
              ).
            </p>
          </div>

          {/* Academic Metadata Badges */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#6B6D85]">
              Course Information
            </h4>
            <div className="space-y-2 text-sm text-[#54566E]">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-[#4B7C9D] shrink-0" />
                <span>
                  Course: <strong className="text-[#34354A]">DS422 (ML-I)</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-[#498765] shrink-0" />
                <span>
                  Category: <strong className="text-[#34354A]">Academic Project</strong>
                </span>
              </div>
              <p className="text-xs text-[#6B6D85] pt-1">
                Machine Learning Lab Project · Verified against{' '}
                <code className="font-mono text-[#5E4E84]">ds42222_(3).ipynb</code>
              </p>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#6B6D85]">
              Quick Sections
            </h4>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className="text-[#585A73] hover:text-[#34354A] hover:underline underline-offset-4 transition-colors py-0.5"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B6D85]">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1">
            <span className="text-[#34354A] font-semibold">Electricity Demand Prediction</span>
            <span>·</span>
            <span>Machine Learning Lab Project</span>
            <span>·</span>
            <span className="font-mono text-[#625288] font-medium">DS422 (ML-I)</span>
            <span>·</span>
            <span>Academic Project</span>
          </div>

          <a
            href="#hero"
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#DDD4EC] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#34354A] hover:bg-[#FFFCF8] hover:border-[#B8A5D6] transition-colors shadow-2xs"
          >
            <ArrowUp className="h-3.5 w-3.5 text-[#6B5A93]" />
            <span>Back to Top</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
