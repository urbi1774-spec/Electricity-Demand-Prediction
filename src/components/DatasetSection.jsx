import React from 'react';
import {
  Database,
  FileSpreadsheet,
  Layers,
  Filter,
  CalendarRange,
  Split,
  Info,
  AlertTriangle,
} from 'lucide-react';
import SectionHeader from './SectionHeader';
import { DATASET_INFO } from '../data/projectData';

const STAT_CARDS = [
  {
    icon: FileSpreadsheet,
    label: 'Dataset Name',
    value: DATASET_INFO.name,
    sub: `Original file: ${DATASET_INFO.filename}`,
    accent: 'text-[#6A5894] bg-[#F7F4FC] border-[#B8A5D6]',
    wide: true,
  },
  {
    icon: Layers,
    label: 'Initial Dataset Size',
    value: `${DATASET_INFO.initialRows.toLocaleString()} × ${DATASET_INFO.initialCols}`,
    sub: '94,934 raw records · 15 columns',
    accent: 'text-[#4B7C9D] bg-[#EEF6FB] border-[#B9D7EA]',
  },
  {
    icon: Filter,
    label: 'Cleaned Dataset Size',
    value: `${DATASET_INFO.cleanedRows.toLocaleString()} × ${DATASET_INFO.modelingFeatureCount}`,
    sub: '81,960 consecutive 1-hr rows · 12 ML features',
    accent: 'text-[#3F7B5A] bg-[#EFF8F2] border-[#C9E4D4]',
  },
  {
    icon: CalendarRange,
    label: 'Time Coverage',
    value: '2015 – 2026',
    sub: DATASET_INFO.dateRange,
    accent: 'text-[#9F5570] bg-[#FDF1F5] border-[#F2C6D5]',
  },
  {
    icon: Split,
    label: 'Chronological Split (80/20)',
    value: '65,568 / 16,392',
    sub: 'Train / Test rows · zero random shuffle',
    accent: 'text-[#6A5894] bg-[#F7F4FC] border-[#B8A5D6]',
  },
];

export default function DatasetSection() {
  return (
    <section id="dataset" className="py-20 sm:py-24 relative bg-[#F7F4FC] border-t border-[#EAE4F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Section 02 · Data Foundation"
          icon={Database}
          title="Dataset Information"
          subtitle="Real-world operational electricity demand and generation records from Bangladesh's national power grid, audited and cleaned strictly following the project notebook."
        />

        {/* Primary Dataset Statistic Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {STAT_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className={`glass-card glass-card-hover rounded-2xl p-6 ${
                  card.wide ? 'sm:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#6B6D85]">
                      {card.label}
                    </p>
                    <p className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#34354A] tracking-tight">
                      {card.value}
                    </p>
                    <p className="mt-1.5 text-xs sm:text-sm text-[#5E607A] font-mono">
                      {card.sub}
                    </p>
                  </div>
                  <div
                    className={`h-11 w-11 shrink-0 rounded-xl border flex items-center justify-center ${card.accent}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Source & Audit Details Row */}
        <div className="mt-6 grid lg:grid-cols-12 gap-6">
          {/* Missing Value & Dropped Columns Card */}
          <div className="lg:col-span-7 glass-card rounded-2xl p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-[#FDF1F5] border border-[#F2C6D5] flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4 text-[#A25672]" />
                </div>
                <h3 className="text-base font-bold text-[#34354A]">
                  Missing Value Audit (Raw Dataset)
                </h3>
              </div>
              <span className="text-xs font-mono text-[#6B6D85]">
                0 duplicates · 0 negative · 0 infinite values
              </span>
            </div>

            <div className="space-y-3.5">
              {DATASET_INFO.droppedColumns.map((col) => {
                const isDropped = col.action === 'Dropped';
                return (
                  <div key={col.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <div className="flex items-center gap-2">
                        <code className="font-mono font-semibold text-[#5E4E84] bg-[#F7F4FC] px-2 py-0.5 rounded">
                          {col.name}
                        </code>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium border ${
                            isDropped
                              ? 'bg-[#FDF1F5] text-[#9A4E6A] border-[#F2C6D5]'
                              : 'bg-[#EFF8F2] text-[#3B7354] border-[#C9E4D4]'
                          }`}
                        >
                          {col.action}
                        </span>
                      </div>
                      <span className="font-mono text-[#4B4D66]">
                        {col.missingCount.toLocaleString()} ({col.missingPct}%)
                      </span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-[#F2EEF9] overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          isDropped ? 'bg-[#E3A0B8]' : 'bg-[#8AC2A4]'
                        }`}
                        style={{ width: `${col.missingPct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Provenance + Raw-to-Cleaned Reduction Card */}
          <div className="lg:col-span-5 glass-card rounded-2xl p-6 flex flex-col justify-between gap-5">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="h-8 w-8 rounded-lg bg-[#EEF6FB] border border-[#B9D7EA] flex items-center justify-center">
                  <Info className="h-4 w-4 text-[#4B7C9D]" />
                </div>
                <h3 className="text-base font-bold text-[#34354A]">
                  Data Source &amp; Filtering Summary
                </h3>
              </div>
              <p className="text-sm text-[#585A73] leading-relaxed">
                <strong className="text-[#34354A]">Source:</strong> {DATASET_INFO.sourceLabel}. No external
                fabricated URL is claimed; all figures are derived directly from the local project file{' '}
                <code className="font-mono text-[#625288] bg-[#F7F4FC] px-1.5 py-0.5 rounded text-xs">
                  {DATASET_INFO.filename}
                </code>{' '}
                and notebook{' '}
                <code className="font-mono text-[#625288] bg-[#F7F4FC] px-1.5 py-0.5 rounded text-xs">
                  ds42222_(3).ipynb
                </code>
                .
              </p>
            </div>

            <div className="rounded-xl bg-[#FFFCF8] border border-[#EAE4F3] p-4 space-y-2.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#6B6D85]">
                Row Filtering Breakdown (1-Hour Alignment)
              </p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#585A73]">Raw CSV Rows</span>
                <span className="font-mono font-semibold text-[#34354A]">94,934</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#585A73]">Non-1hr Intervals Removed (30m, 2h, 3h+)</span>
                <span className="font-mono font-medium text-[#A25672]">−12,974</span>
              </div>
              <div className="border-t border-[#EAE4F3] pt-2.5 flex items-center justify-between text-sm">
                <span className="font-semibold text-[#3B7354]">Final Cleaned Hourly Dataset</span>
                <span className="font-mono font-bold text-[#3B7354]">81,960</span>
              </div>
            </div>

            {/* Chronological Split visual bar */}
            <div>
              <div className="flex justify-between text-xs font-mono text-[#585A73] mb-1.5">
                <span>Train: 65,568 (80%)</span>
                <span>Test: 16,392 (20%)</span>
              </div>
              <div className="h-3 w-full rounded-full overflow-hidden flex bg-[#F2EEF9] border border-[#E5DDF2]">
                <div className="w-[80%] bg-[#B8A5D6]" title="Training set (80%)" />
                <div className="w-[20%] bg-[#9AD0B3]" title="Testing set (20%)" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
