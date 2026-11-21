import React from 'react';
import { Lightbulb, ShieldAlert, Cpu, Target, CheckCircle2 } from 'lucide-react';
import SectionHeader from './SectionHeader';

const PILLARS = [
  {
    icon: Lightbulb,
    accent: 'text-[#4C7D9E] bg-[#EEF6FB] border-[#B9D7EA]',
    title: 'What Is Electricity Demand Prediction?',
    body: 'Electricity demand prediction estimates future power consumption across a regional or national grid using historical load measurements, generation mix, and temporal patterns. Because electricity cannot be economically stored at national grid scale, supply must continuously match demand in real time.',
  },
  {
    icon: ShieldAlert,
    accent: 'text-[#A25672] bg-[#FDF1F5] border-[#F2C6D5]',
    title: 'Why Is It Critical for Power Grids?',
    body: 'Sudden spikes in power consumption can overload transmission lines, force costly emergency fuel dispatch, or cause blackouts and load shedding. Accurate short-term demand alerts give grid operators lead time to ramp peaking generators, adjust cross-border imports, and protect grid frequency.',
  },
  {
    icon: Cpu,
    accent: 'text-[#3F7B5A] bg-[#EFF8F2] border-[#C9E4D4]',
    title: 'How Machine Learning Helps',
    body: 'Grid demand exhibits strong non-linear relationships across time of day, seasonal temperatures, domestic fuel dispatch (gas, coal, liquid fuel, solar), and cross-border imports. Supervised ML algorithms learn these multivariate patterns from years of hourly logs to flag high-demand periods automatically.',
  },
];

export default function IntroductionSection() {
  return (
    <section id="intro" className="py-20 sm:py-24 relative bg-[#FFFCF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Section 01 · Problem Formulation"
          icon={Lightbulb}
          title="Project Introduction"
          subtitle="Understanding short-term national electricity load forecasting and why identifying peak-demand hours in advance strengthens energy reliability."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {PILLARS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div
                    className={`h-12 w-12 rounded-xl border flex items-center justify-center mb-5 ${item.accent}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#34354A] mb-3">{item.title}</h3>
                  <p className="text-sm text-[#585A73] leading-relaxed">{item.body}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlighted Project Objective Banner */}
        <div className="mt-8 rounded-2xl border border-[#B8A5D6]/70 bg-[#F7F4FC] p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4 max-w-3xl">
              <div className="h-12 w-12 shrink-0 rounded-xl bg-white border border-[#B8A5D6] flex items-center justify-center shadow-xs">
                <Target className="h-6 w-6 text-[#6D5B97]" />
              </div>
              <div>
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#6D5B97]">
                  Core Project Objective
                </span>
                <h3 className="mt-1 text-xl sm:text-2xl font-bold text-[#34354A]">
                  Classify whether electricity demand will be{' '}
                  <span className="text-[#9E526E]">High</span> in the next hour
                </h3>
                <p className="mt-2 text-sm sm:text-base text-[#565872] leading-relaxed">
                  Using the current hour&apos;s grid telemetry and calendar features, each model predicts a binary
                  target <code className="font-mono text-[#625288] bg-white border border-[#E5DDF2] px-1.5 py-0.5 rounded text-xs sm:text-sm">High_Demand_Next_Hour</code>:
                  labeled <strong className="text-[#9E526E]">1 (High Demand)</strong> if the next hour&apos;s demand
                  reaches or exceeds the leak-free training 75th percentile threshold (<strong className="text-[#34354A]">9,742 MW</strong>),
                  and <strong className="text-[#4B7C9D]">0 (Normal Demand)</strong> otherwise.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 shrink-0 min-w-[245px]">
              <div className="flex items-center gap-2.5 rounded-xl bg-white border border-[#E5DDF2] px-4 py-2.5 text-xs font-medium text-[#34354A] shadow-2xs">
                <CheckCircle2 className="h-4 w-4 text-[#4A8A67] shrink-0" />
                <span>Binary Time-Series Classification</span>
              </div>
              <div className="flex items-center gap-2.5 rounded-xl bg-white border border-[#E5DDF2] px-4 py-2.5 text-xs font-medium text-[#34354A] shadow-2xs">
                <CheckCircle2 className="h-4 w-4 text-[#4A8A67] shrink-0" />
                <span>Strict Chronological 80/20 Validation</span>
              </div>
              <div className="flex items-center gap-2.5 rounded-xl bg-white border border-[#E5DDF2] px-4 py-2.5 text-xs font-medium text-[#34354A] shadow-2xs">
                <CheckCircle2 className="h-4 w-4 text-[#4A8A67] shrink-0" />
                <span>3 Scikit-Learn Classifiers Compared</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
