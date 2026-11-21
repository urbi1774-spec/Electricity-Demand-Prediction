import React, { useState } from 'react';
import { Table2, LayoutGrid, Columns3 } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { DATASET_FEATURES } from '../data/projectData';

const CATEGORIES = ['All', 'Core Grid', 'Fuel & Imports', 'Temporal'];

const CATEGORY_BADGES = {
  'Core Grid': 'bg-[#EEF6FB] text-[#3F6F90] border-[#B9D7EA]',
  'Fuel & Imports': 'bg-[#FDF1F5] text-[#9A4E6A] border-[#F2C6D5]',
  Temporal: 'bg-[#EFF8F2] text-[#3B7354] border-[#C9E4D4]',
};

export default function FeaturesSection() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('table');

  const filtered =
    selectedCategory === 'All'
      ? DATASET_FEATURES
      : DATASET_FEATURES.filter((f) => f.category === selectedCategory);

  return (
    <section id="features" className="py-20 sm:py-24 relative bg-[#FFFCF8] border-t border-[#EAE4F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <SectionHeader
              eyebrow="Section 03 · Feature Dictionary"
              icon={Columns3}
              title="Dataset Features"
              subtitle="Plain-English guide to the timestamp index and all 12 engineered & grid telemetry features fed into the classification models."
            />
          </div>

          {/* Filter & View Switch Controls */}
          <div className="flex flex-wrap items-center gap-3 md:mb-10">
            <div className="inline-flex rounded-xl bg-[#F7F4FC] border border-[#E5DDF2] p-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? 'bg-white text-[#34354A] border border-[#B8A5D6] shadow-2xs'
                      : 'text-[#62647C] hover:text-[#34354A] border border-transparent'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="inline-flex rounded-xl bg-[#F7F4FC] border border-[#E5DDF2] p-1">
              <button
                type="button"
                onClick={() => setViewMode('table')}
                aria-label="Table view"
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'table'
                    ? 'bg-white text-[#5F4E87] shadow-2xs'
                    : 'text-[#6B6D85] hover:text-[#34354A]'
                }`}
              >
                <Table2 className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('cards')}
                aria-label="Card view"
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'cards'
                    ? 'bg-white text-[#5F4E87] shadow-2xs'
                    : 'text-[#6B6D85] hover:text-[#34354A]'
                }`}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {viewMode === 'table' ? (
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#EAE4F3] bg-[#F7F4FC] text-[11px] font-mono uppercase tracking-wider text-[#62647C]">
                    <th className="py-3.5 px-5">Feature</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Unit / Scale</th>
                    <th className="py-3.5 px-4">ML Input</th>
                    <th className="py-3.5 px-5">Plain-English Explanation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0EAF7] text-sm">
                  {filtered.map((feat) => (
                    <tr
                      key={feat.name}
                      className="hover:bg-[#F7F4FC]/60 transition-colors"
                    >
                      <td className="py-4 px-5 align-top whitespace-nowrap">
                        <code className="font-mono font-semibold text-[#5B4A83] bg-[#F7F4FC] border border-[#DDD3EE] px-2.5 py-1 rounded-md text-xs">
                          {feat.name}
                        </code>
                        <span className="block mt-1 text-[11px] text-[#6B6D85]">
                          {feat.role}
                        </span>
                      </td>
                      <td className="py-4 px-4 align-top whitespace-nowrap">
                        <span
                          className={`inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${
                            CATEGORY_BADGES[feat.category]
                          }`}
                        >
                          {feat.category}
                        </span>
                      </td>
                      <td className="py-4 px-4 align-top whitespace-nowrap font-mono text-xs text-[#54566E]">
                        {feat.unit}
                      </td>
                      <td className="py-4 px-4 align-top whitespace-nowrap">
                        {feat.usedInX ? (
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#3B7354]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#6EA988]" />
                            Feature (X)
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6B6D85]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#B8A5D6]" />
                            Index / Shift
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-5 align-top text-[#50526B] leading-relaxed min-w-[280px]">
                        {feat.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((feat) => (
              <div
                key={feat.name}
                className="glass-card glass-card-hover rounded-2xl p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <code className="font-mono font-semibold text-[#5B4A83] bg-[#F7F4FC] border border-[#DDD3EE] px-2.5 py-1 rounded-md text-xs">
                      {feat.name}
                    </code>
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${
                        CATEGORY_BADGES[feat.category]
                      }`}
                    >
                      {feat.category}
                    </span>
                  </div>
                  <p className="text-sm text-[#54566E] leading-relaxed">{feat.description}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#F0EAF7] flex items-center justify-between text-[11px] font-mono text-[#6B6D85]">
                  <span>{feat.unit}</span>
                  <span className={feat.usedInX ? 'text-[#3B7354] font-semibold' : 'text-[#6B6D85]'}>
                    {feat.usedInX ? 'Model Feature (X)' : 'Index Only'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
