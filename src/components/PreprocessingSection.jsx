import React from 'react';
import {
  Workflow,
  FileInput,
  SearchCheck,
  CopyCheck,
  Trash2,
  CalendarClock,
  ArrowUpDown,
  Target,
  SlidersHorizontal,
} from 'lucide-react';
import SectionHeader from './SectionHeader';
import { PREPROCESSING_STEPS } from '../data/projectData';

const STEP_ICONS = [
  FileInput,
  SearchCheck,
  CopyCheck,
  Trash2,
  CalendarClock,
  ArrowUpDown,
  Target,
  SlidersHorizontal,
];

const STEP_TINTS = [
  'bg-[#EEF6FB] border-[#B9D7EA] text-[#4B7C9D]',
  'bg-[#FDF1F5] border-[#F2C6D5] text-[#9A4E6A]',
  'bg-[#EFF8F2] border-[#C9E4D4] text-[#3B7354]',
  'bg-[#F7F4FC] border-[#B8A5D6] text-[#5F4E87]',
];

export default function PreprocessingSection() {
  return (
    <section id="preprocessing" className="py-20 sm:py-24 relative bg-[#F7F4FC] border-t border-[#EAE4F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Section 04 · Engineering Pipeline"
          icon={Workflow}
          title="Data Preprocessing"
          subtitle="An 8-stage, leakage-free preparation workflow transforming raw PGCB logs into chronologically aligned hourly training and evaluation matrices."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PREPROCESSING_STEPS.map((item, idx) => {
            const Icon = STEP_ICONS[idx] || Workflow;
            const tint = STEP_TINTS[idx % STEP_TINTS.length];
            return (
              <div
                key={item.step}
                className="glass-card glass-card-hover rounded-2xl p-5 relative flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="h-8 w-8 rounded-lg bg-[#F7F4FC] border border-[#B8A5D6] flex items-center justify-center font-mono text-xs font-bold text-[#5E4E84]">
                        0{item.step}
                      </span>
                      <div className={`h-8 w-8 rounded-lg border flex items-center justify-center ${tint}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                    </div>
                    <span className="rounded-full bg-[#FFFCF8] border border-[#E5DDF2] px-2.5 py-0.5 text-[10px] font-mono text-[#5E4E84]">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#34354A] mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-[#4D4F68] leading-relaxed mb-2.5">
                    {item.summary}
                  </p>
                </div>

                <p className="text-xs text-[#6B6D85] leading-relaxed pt-3 border-t border-[#F0EAF7]">
                  {item.detail}
                </p>
              </div>
            );
          })}
        </div>

        {/* Leakage Prevention Note */}
        <div className="mt-8 rounded-2xl border border-[#C9E4D4] bg-[#EFF8F2] px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
          <div className="text-sm text-[#34354A] leading-relaxed">
            <span className="font-bold text-[#346A4C]">Temporal Integrity Guarantee: </span>
            All models use{' '}
            <code className="font-mono text-xs text-[#5E4E84] bg-white border border-[#DCEEE4] px-1.5 py-0.5 rounded">
              scikit-learn Pipeline
            </code>{' '}
            wrappers so median imputation (for{' '}
            <code className="font-mono text-xs text-[#5E4E84] bg-white border border-[#DCEEE4] px-1.5 py-0.5 rounded">
              solar
            </code>
            ) and feature scaling are fitted exclusively on the first 80% chronological training split
            (65,568 rows) before predicting the future 20% test horizon (16,392 rows).
          </div>
        </div>
      </div>
    </section>
  );
}
