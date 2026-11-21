import React from 'react';
import { BrainCircuit, GitBranch, Trees, CheckCircle2, AlertCircle, Award } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { ML_MODELS } from '../data/projectData';

const MODEL_STYLES = {
  sky: {
    icon: BrainCircuit,
    badge: 'bg-[#EEF6FB] text-[#3F6F90] border-[#B9D7EA]',
    border: 'border-[#EAE4F3] hover:border-[#B9D7EA]',
    topBar: 'bg-[#B9D7EA]',
  },
  amber: {
    icon: GitBranch,
    badge: 'bg-[#FDF1F5] text-[#9A4E6A] border-[#F2C6D5]',
    border: 'border-[#EAE4F3] hover:border-[#F2C6D5]',
    topBar: 'bg-[#F2C6D5]',
  },
  emerald: {
    icon: Trees,
    badge: 'bg-[#EFF8F2] text-[#376F50] border-[#C9E4D4]',
    border: 'border-[#B9DBC7] shadow-md shadow-[#C9E4D4]/40',
    topBar: 'bg-[#9ED0B4]',
  },
};

export default function ModelsSection() {
  return (
    <section id="models" className="py-20 sm:py-24 relative bg-[#F7F4FC] border-t border-[#EAE4F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Section 06 · Classification Algorithms"
          icon={BrainCircuit}
          title="Machine Learning Models"
          subtitle="Three progressively expressive scikit-learn classifiers trained on identical chronologically split features using balanced class weights."
        />

        <div className="grid lg:grid-cols-3 gap-6">
          {ML_MODELS.map((model) => {
            const style = MODEL_STYLES[model.accent];
            const Icon = style.icon;
            return (
              <div
                key={model.id}
                className={`glass-card glass-card-hover rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden border ${style.border}`}
              >
                <div className={`absolute top-0 inset-x-0 h-1.5 ${style.topBar}`} />

                <div>
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3 mb-4 pt-1">
                    <div className={`h-12 w-12 rounded-xl border flex items-center justify-center ${style.badge}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[11px] font-semibold ${style.badge}`}
                    >
                      {model.isBest && <Award className="h-3.5 w-3.5" />}
                      {model.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#34354A] mb-2">{model.name}</h3>
                  <p className="text-sm text-[#54566E] leading-relaxed mb-4">
                    {model.howItWorks}
                  </p>

                  {/* Pipeline Steps */}
                  <div className="rounded-xl bg-[#F7F4FC] border border-[#E5DDF2] p-3.5 mb-4">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-[#6B6D85] mb-2">
                      Scikit-Learn Pipeline
                    </p>
                    <div className="space-y-1.5">
                      {model.pipeline.map((step, i) => (
                        <div key={step} className="flex items-center gap-2 text-xs font-mono">
                          <span className="text-[#8B8DA3]">{i + 1}.</span>
                          <code className="text-[#5B4A83] break-all">{step}</code>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Role in this project */}
                  <p className="text-xs sm:text-sm text-[#54566E] leading-relaxed mb-4">
                    {model.projectRole}
                  </p>
                </div>

                {/* Strengths & Trade-off */}
                <div className="pt-4 border-t border-[#F0EAF7] space-y-2">
                  {model.strengths.map((str) => (
                    <div key={str} className="flex items-start gap-2 text-xs text-[#34354A]">
                      <CheckCircle2 className="h-4 w-4 text-[#4A8A67] shrink-0 mt-0.5" />
                      <span>{str}</span>
                    </div>
                  ))}
                  <div className="flex items-start gap-2 text-xs text-[#6B6D85] pt-1">
                    <AlertCircle className="h-4 w-4 text-[#B46482] shrink-0 mt-0.5" />
                    <span>{model.tradeoff}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
