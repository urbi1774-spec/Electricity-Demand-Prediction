import React, { useState } from 'react';
import { Trophy, Sparkles, Maximize2, CheckCircle2, Layers } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts';
import SectionHeader from './SectionHeader';
import { MODEL_COMPARISON, RF_FEATURE_IMPORTANCE } from '../data/projectData';

const RF_DATA = MODEL_COMPARISON.find((m) => m.id === 'rf');

const KPI_ITEMS = [
  {
    label: 'Accuracy',
    value: '95.47%',
    exact: '0.954717',
    bg: 'bg-[#EFF8F2] border-[#C9E4D4]',
    valueColor: 'text-[#316849]',
  },
  {
    label: 'Precision',
    value: '98.55%',
    exact: '0.985450',
    bg: 'bg-[#EEF6FB] border-[#B9D7EA]',
    valueColor: 'text-[#3C6C8D]',
  },
  {
    label: 'Recall',
    value: '95.47%',
    exact: '0.954699',
    bg: 'bg-[#F7F4FC] border-[#D8CEEA]',
    valueColor: 'text-[#5A4982]',
  },
  {
    label: 'F1-Score',
    value: '96.98%',
    exact: '0.969831',
    bg: 'bg-[#EFF8F2] border-[#C9E4D4]',
    valueColor: 'text-[#316849]',
  },
  {
    label: 'ROC-AUC',
    value: '0.990',
    exact: '0.990149',
    bg: 'bg-[#FDF1F5] border-[#F2C6D5]',
    valueColor: 'text-[#964A66]',
  },
];

export default function BestModelSection({ onOpenImage }) {
  const [cmView, setCmView] = useState('interactive');
  const [fiView, setFiView] = useState('interactive');

  const { tn, fp, fn, tp } = RF_DATA.confusionMatrix;
  const totalTest = tn + fp + fn + tp;

  return (
    <section id="best-model" className="py-20 sm:py-24 relative bg-[#F7F4FC] border-t border-[#EAE4F3]">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Section 08 · Selected Production Model"
          icon={Trophy}
          title="Best Model – Random Forest"
          subtitle="Selected automatically in the notebook by highest F1-Score (96.98%) and exported via joblib as best_electricity_demand_model.pkl."
        />

        {/* Elegant White Winner Spotlight Card */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 mb-6 relative overflow-hidden border border-[#C9E4D4]">
          <div className="absolute inset-x-0 top-0 h-1.5 bg-[#9ED0B4]" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#EFEAF7]">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-[#C9E4D4] border border-[#A5CFB7] flex items-center justify-center shadow-xs shrink-0">
                <Trophy className="h-7 w-7 text-[#2C5C42]" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#3B7354]">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>200 Decision Trees · class_weight=&apos;balanced&apos; · Median Imputation</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#34354A] mt-0.5">
                  Random Forest Classifier
                </h3>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 rounded-xl bg-[#EFF8F2] border border-[#C9E4D4] px-4 py-2.5 text-xs font-mono text-[#32694A] self-start">
              <CheckCircle2 className="h-4 w-4 text-[#4A8A67]" />
              <span>14,126 / 14,796 test hours predicted accurately</span>
            </div>
          </div>

          {/* 5 KPI Cards */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {KPI_ITEMS.map((kpi) => (
              <div
                key={kpi.label}
                className={`rounded-xl border p-4 text-center transition-transform hover:-translate-y-0.5 ${kpi.bg}`}
              >
                <span className="block text-xs font-semibold uppercase tracking-wider text-[#5C5E76]">
                  {kpi.label}
                </span>
                <span className={`mt-1.5 block text-2xl sm:text-3xl font-extrabold font-mono ${kpi.valueColor}`}>
                  {kpi.value}
                </span>
                <span className="mt-1 block text-[11px] font-mono text-[#6B6D85]">
                  raw: {kpi.exact}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Confusion Matrix + Feature Importance */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Confusion Matrix Card */}
          <div className="lg:col-span-5 glass-card rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-3 mb-5">
                <div>
                  <h3 className="text-lg font-bold text-[#34354A]">Confusion Matrix</h3>
                  <p className="text-xs text-[#6B6D85]">
                    Random Forest test-set classification matrix (n = 14,796)
                  </p>
                </div>
                <div className="inline-flex rounded-lg bg-[#F7F4FC] border border-[#E5DDF2] p-0.5 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setCmView('interactive')}
                    className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                      cmView === 'interactive'
                        ? 'bg-white text-[#34354A] shadow-2xs'
                        : 'text-[#6B6D85] hover:text-[#34354A]'
                    }`}
                  >
                    Matrix
                  </button>
                  <button
                    type="button"
                    onClick={() => setCmView('notebook')}
                    className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                      cmView === 'notebook'
                        ? 'bg-white text-[#34354A] shadow-2xs'
                        : 'text-[#6B6D85] hover:text-[#34354A]'
                    }`}
                  >
                    Plot
                  </button>
                </div>
              </div>

              {cmView === 'notebook' ? (
                <div className="rounded-xl bg-[#FFFCF8] p-2 border border-[#EAE4F3]">
                  <img
                    src="/notebook-plots/rf-confusion-matrix.png"
                    alt="Random Forest Confusion Matrix"
                    onClick={() =>
                      onOpenImage({
                        src: '/notebook-plots/rf-confusion-matrix.png',
                        title: 'Random Forest – Confusion Matrix',
                      })
                    }
                    className="w-full h-72 object-contain cursor-zoom-in mx-auto"
                  />
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="text-center text-[11px] font-mono uppercase tracking-wider text-[#6B6D85]">
                    Predicted Label
                  </div>
                  <div className="grid grid-cols-12 gap-2 items-center">
                    <div className="col-span-2 flex items-center justify-center">
                      <span className="-rotate-90 whitespace-nowrap text-[11px] font-mono uppercase tracking-wider text-[#6B6D85]">
                        Actual Label
                      </span>
                    </div>
                    <div className="col-span-10 grid grid-cols-2 gap-3">
                      <div className="text-center text-xs font-semibold text-[#3F6F90] pb-1">
                        Normal (0)
                      </div>
                      <div className="text-center text-xs font-semibold text-[#9A4E6A] pb-1">
                        High (1)
                      </div>

                      {/* TN */}
                      <div className="rounded-xl bg-[#EEF6FB] border border-[#B9D7EA] p-4 text-center">
                        <span className="block text-[10px] font-mono text-[#4B7C9D] uppercase font-semibold">
                          True Negative
                        </span>
                        <span className="mt-1 block text-2xl sm:text-3xl font-extrabold font-mono text-[#34354A]">
                          {tn.toLocaleString()}
                        </span>
                        <span className="mt-1 block text-[11px] font-mono text-[#4B7C9D]">
                          {((tn / totalTest) * 100).toFixed(2)}% of test
                        </span>
                      </div>

                      {/* FP */}
                      <div className="rounded-xl bg-[#FDF1F5] border border-[#F2C6D5] p-4 text-center">
                        <span className="block text-[10px] font-mono text-[#9A4E6A] uppercase font-semibold">
                          False Positive
                        </span>
                        <span className="mt-1 block text-2xl sm:text-3xl font-extrabold font-mono text-[#8A415C]">
                          {fp.toLocaleString()}
                        </span>
                        <span className="mt-1 block text-[11px] font-mono text-[#9A4E6A]">
                          {((fp / totalTest) * 100).toFixed(2)}% of test
                        </span>
                      </div>

                      {/* FN */}
                      <div className="rounded-xl bg-[#F7F4FC] border border-[#D8CEEA] p-4 text-center">
                        <span className="block text-[10px] font-mono text-[#625288] uppercase font-semibold">
                          False Negative
                        </span>
                        <span className="mt-1 block text-2xl sm:text-3xl font-extrabold font-mono text-[#534475]">
                          {fn.toLocaleString()}
                        </span>
                        <span className="mt-1 block text-[11px] font-mono text-[#625288]">
                          {((fn / totalTest) * 100).toFixed(2)}% of test
                        </span>
                      </div>

                      {/* TP */}
                      <div className="rounded-xl bg-[#EFF8F2] border border-[#B8DBC7] p-4 text-center">
                        <span className="block text-[10px] font-mono text-[#376F50] uppercase font-semibold">
                          True Positive
                        </span>
                        <span className="mt-1 block text-2xl sm:text-3xl font-extrabold font-mono text-[#2C5C42]">
                          {tp.toLocaleString()}
                        </span>
                        <span className="mt-1 block text-[11px] font-mono text-[#376F50]">
                          {((tp / totalTest) * 100).toFixed(2)}% of test
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-5 pt-4 border-t border-[#F0EAF7] flex items-center justify-between gap-2 text-xs text-[#54566E]">
              <span>Only 159 false alarms across 3,516 normal-demand test hours (95.48% specificity).</span>
              <button
                type="button"
                onClick={() =>
                  onOpenImage({
                    src: '/notebook-plots/rf-confusion-matrix.png',
                    title: 'Random Forest – Confusion Matrix',
                  })
                }
                className="shrink-0 text-[#6B5A93] hover:text-[#34354A]"
                title="Open full-size notebook plot"
              >
                <Maximize2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Feature Importance Chart Card */}
          <div className="lg:col-span-7 glass-card rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
                <div>
                  <h3 className="text-lg font-bold text-[#34354A] flex items-center gap-2">
                    <Layers className="h-5 w-5 text-[#498765]" />
                    <span>Feature Importance Chart</span>
                  </h3>
                  <p className="text-xs text-[#6B6D85] mt-0.5">
                    Mean decrease in impurity across 200 Random Forest trees
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="inline-flex rounded-lg bg-[#F7F4FC] border border-[#E5DDF2] p-0.5 text-[11px]">
                    <button
                      type="button"
                      onClick={() => setFiView('interactive')}
                      className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                        fiView === 'interactive'
                          ? 'bg-white text-[#34354A] shadow-2xs'
                          : 'text-[#6B6D85] hover:text-[#34354A]'
                      }`}
                    >
                      Interactive
                    </button>
                    <button
                      type="button"
                      onClick={() => setFiView('notebook')}
                      className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                        fiView === 'notebook'
                          ? 'bg-white text-[#34354A] shadow-2xs'
                          : 'text-[#6B6D85] hover:text-[#34354A]'
                      }`}
                    >
                      Plot
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      onOpenImage({
                        src: '/notebook-plots/rf-feature-importance.png',
                        title: 'Random Forest – Feature Importance',
                      })
                    }
                    className="p-1.5 rounded-lg border border-[#E5DDF2] bg-[#F7F4FC] text-[#5E4E84] hover:border-[#B8A5D6]"
                    title="Zoom notebook plot"
                  >
                    <Maximize2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {fiView === 'notebook' ? (
                <div className="rounded-xl bg-[#FFFCF8] p-2 border border-[#EAE4F3]">
                  <img
                    src="/notebook-plots/rf-feature-importance.png"
                    alt="Random Forest Feature Importance"
                    onClick={() =>
                      onOpenImage({
                        src: '/notebook-plots/rf-feature-importance.png',
                        title: 'Random Forest – Feature Importance',
                      })
                    }
                    className="w-full h-80 object-contain cursor-zoom-in mx-auto"
                  />
                </div>
              ) : (
                <div className="h-80 sm:h-[340px] w-full rounded-xl bg-[#FFFCF8] border border-[#F2EDF9] p-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={RF_FEATURE_IMPORTANCE}
                      layout="vertical"
                      margin={{ top: 4, right: 24, left: 10, bottom: 4 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#ECE6F5" horizontal={false} />
                      <XAxis
                        type="number"
                        domain={[0, 40]}
                        tick={{ fill: '#62647C', fontSize: 11 }}
                        tickFormatter={(v) => `${v}%`}
                      />
                      <YAxis
                        type="category"
                        dataKey="feature"
                        width={136}
                        tick={{ fill: '#34354A', fontSize: 11, fontFamily: 'JetBrains Mono' }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #C9E4D4',
                          borderRadius: '12px',
                          fontSize: '12px',
                          color: '#34354A',
                          boxShadow: '0 8px 24px -8px rgba(52,53,74,0.14)',
                        }}
                        formatter={(val, _name, item) => [
                          `${val.toFixed(2)}% (score: ${item.payload.importance.toFixed(4)})`,
                          item.payload.category,
                        ]}
                      />
                      <Bar dataKey="pct" radius={[0, 6, 6, 0]} barSize={18}>
                        {RF_FEATURE_IMPORTANCE.map((entry, idx) => (
                          <Cell
                            key={entry.feature}
                            fill={
                              idx === 0
                                ? '#82BC9C'
                                : idx === 1
                                ? '#9FD0B5'
                                : idx < 4
                                ? '#95C0DC'
                                : idx < 7
                                ? '#B8A5D6'
                                : '#E3A4BC'
                            }
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            <p className="mt-4 pt-3.5 border-t border-[#F0EAF7] text-xs text-[#54566E] leading-relaxed">
              Current <code className="font-mono text-[#32694A] bg-[#EFF8F2] px-1.5 py-0.5 rounded">demand_mw</code> (33.29%) and{' '}
              <code className="font-mono text-[#32694A] bg-[#EFF8F2] px-1.5 py-0.5 rounded">generation_mw</code> (28.41%) together drive{' '}
              <strong className="text-[#34354A]">61.69%</strong> of predictive power, followed by{' '}
              <code className="font-mono text-[#3F6F90] bg-[#EEF6FB] px-1.5 py-0.5 rounded">india_bheramara_hvdc</code> (11.38%),{' '}
              <code className="font-mono text-[#3F6F90] bg-[#EEF6FB] px-1.5 py-0.5 rounded">india_tripura</code> (4.92%), and{' '}
              <code className="font-mono text-[#625288] bg-[#F7F4FC] px-1.5 py-0.5 rounded">gas</code> (4.55%).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
