import React, { useState } from 'react';
import { Scale, Trophy, Maximize2, CheckCircle2, Activity } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import SectionHeader from './SectionHeader';
import { MODEL_COMPARISON } from '../data/projectData';

const METRICS_BAR_DATA = [
  {
    metric: 'Accuracy',
    'Logistic Regression': 93.11,
    'Decision Tree': 90.63,
    'Random Forest': 95.67,
  },
  {
    metric: 'Precision',
    'Logistic Regression': 93.25,
    'Decision Tree': 97.97,
    'Random Forest': 98.47,
  },
  {
    metric: 'Recall',
    'Logistic Regression': 98.08,
    'Decision Tree': 89.60,
    'Random Forest': 95.82,
  },
  {
    metric: 'F1-Score',
    'Logistic Regression': 95.61,
    'Decision Tree': 93.59,
    'Random Forest': 97.13,
  },
  {
    metric: 'ROC-AUC',
    'Logistic Regression': 98.28,
    'Decision Tree': 91.79,
    'Random Forest': 99.09,
  },
];

const TRAIN_TEST_DATA = MODEL_COMPARISON.map((m) => ({
  model: m.shortName,
  'Training Accuracy': m.trainAccuracy,
  'Testing Accuracy': m.accuracy,
}));

export default function ModelComparisonSection({ onOpenImage }) {
  const [selectedCmModelId, setSelectedCmModelId] = useState('rf');
  const [ttView, setTtView] = useState('interactive');
  const selectedModel =
    MODEL_COMPARISON.find((m) => m.id === selectedCmModelId) || MODEL_COMPARISON[2];

  return (
    <section id="comparison" className="py-20 sm:py-24 relative bg-[#FFFCF8] border-t border-[#EAE4F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Section 07 · Evaluation Benchmark"
          icon={Scale}
          title="Model Comparison"
          subtitle="Head-to-head evaluation on the held-out chronological 20% test set (16,392 consecutive hourly predictions) using exact outputs from ds42222_(3).ipynb."
        />

        {/* Interactive Comparison Bar Chart + ROC Curve Comparison */}
        <div className="grid lg:grid-cols-12 gap-6 mb-6">
          <div className="lg:col-span-7 glass-card rounded-2xl p-6">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
              <div>
                <h3 className="text-lg font-bold text-[#34354A]">
                  Performance Metrics Comparison (%)
                </h3>
                <p className="text-xs text-[#6B6D85]">
                  Accuracy, Precision, Recall, F1-Score, and ROC-AUC (scaled ×100 for visual parity)
                </p>
              </div>
              <span className="rounded-full bg-[#EFF8F2] border border-[#C9E4D4] px-3 py-1 text-[11px] font-mono text-[#3B7354]">
                Test Set: 16,392 hrs
              </span>
            </div>

            <div className="h-80 w-full rounded-xl bg-[#FFFCF8] border border-[#F2EDF9] p-2 sm:p-3">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={METRICS_BAR_DATA}
                  margin={{ top: 10, right: 12, left: -12, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#ECE6F5" vertical={false} />
                  <XAxis dataKey="metric" tick={{ fill: '#4B4D66', fontSize: 11 }} />
                  <YAxis
                    domain={[80, 100]}
                    tick={{ fill: '#62647C', fontSize: 11 }}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #DFD6EE',
                      borderRadius: '12px',
                      fontSize: '12px',
                      color: '#34354A',
                      boxShadow: '0 8px 24px -8px rgba(52,53,74,0.14)',
                    }}
                    formatter={(val, name) => [`${val.toFixed(2)}%`, name]}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px', color: '#34354A' }} />
                  <Bar dataKey="Logistic Regression" fill="#93BEDB" radius={[5, 5, 0, 0]} />
                  <Bar dataKey="Decision Tree" fill="#E6A5BD" radius={[5, 5, 0, 0]} />
                  <Bar dataKey="Random Forest" fill="#82BC9C" radius={[5, 5, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Notebook ROC Curve Comparison Card */}
          <div className="lg:col-span-5 glass-card rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-lg font-bold text-[#34354A]">ROC Curve Comparison</h3>
                  <p className="text-xs text-[#6B6D85]">
                    Direct output from notebook Cell 59
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    onOpenImage({
                      src: '/notebook-plots/roc-comparison.png',
                      title: 'ROC Curve Comparison of Three Models',
                    })
                  }
                  className="inline-flex items-center gap-1 rounded-lg border border-[#E5DDF2] bg-[#F7F4FC] px-2.5 py-1.5 text-[11px] font-medium text-[#5E4E84] hover:bg-[#EFE9FA] hover:border-[#B8A5D6] transition-colors"
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                  <span>Zoom</span>
                </button>
              </div>

              <div className="rounded-xl bg-[#FFFCF8] p-2 border border-[#EAE4F3] overflow-hidden">
                <img
                  src="/notebook-plots/roc-comparison.png"
                  alt="ROC Curve Comparison of Three Models"
                  loading="lazy"
                  onClick={() =>
                    onOpenImage({
                      src: '/notebook-plots/roc-comparison.png',
                      title: 'ROC Curve Comparison of Three Models',
                    })
                  }
                  className="w-full h-56 object-contain cursor-zoom-in mx-auto"
                />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl bg-[#EFF8F2] border border-[#C9E4D4] p-2.5">
                <span className="block text-[10px] text-[#4A6B59]">Random Forest</span>
                <span className="font-mono text-sm font-bold text-[#356D4E]">0.991</span>
              </div>
              <div className="rounded-xl bg-[#EEF6FB] border border-[#B9D7EA] p-2.5">
                <span className="block text-[10px] text-[#4B6B82]">Logistic Reg.</span>
                <span className="font-mono text-sm font-bold text-[#3F6F90]">0.983</span>
              </div>
              <div className="rounded-xl bg-[#FDF1F5] border border-[#F2C6D5] p-2.5">
                <span className="block text-[10px] text-[#7D4B5E]">Decision Tree</span>
                <span className="font-mono text-sm font-bold text-[#9A4E6A]">0.918</span>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Table + Interactive Per-Model Error Breakdown & Classification Report */}
        <div className="grid lg:grid-cols-12 gap-6 mb-6">
          <div className="lg:col-span-8 glass-card rounded-2xl overflow-hidden flex flex-col justify-between">
            <div>
              <div className="px-6 py-4 border-b border-[#EAE4F3] bg-[#F7F4FC]/60 flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-base font-bold text-[#34354A]">
                  Evaluation Metrics Summary Table
                </h3>
                <span className="text-xs font-mono text-[#6B6D85]">
                  Ranked by F1-Score (Notebook Cell 54–57)
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#EAE4F3] bg-[#F7F4FC] text-[11px] font-mono uppercase tracking-wider text-[#62647C]">
                      <th className="py-3.5 px-5">Model</th>
                      <th className="py-3.5 px-3 text-right">Train Acc.</th>
                      <th className="py-3.5 px-3 text-right">Test Acc.</th>
                      <th className="py-3.5 px-3 text-right">Precision</th>
                      <th className="py-3.5 px-3 text-right">Recall</th>
                      <th className="py-3.5 px-3 text-right">F1-Score</th>
                      <th className="py-3.5 px-5 text-right">ROC-AUC</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F0EAF7] text-sm">
                    {MODEL_COMPARISON.map((row) => (
                      <tr
                        key={row.id}
                        onClick={() => setSelectedCmModelId(row.id)}
                        className={`cursor-pointer transition-colors ${
                          row.isBest
                            ? 'bg-[#EFF8F2]/85 hover:bg-[#E4F4EA]'
                            : 'hover:bg-[#F7F4FC]/70'
                        }`}
                      >
                        <td className="py-4 px-5 font-semibold text-[#34354A] whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span>{row.model}</span>
                            {row.isBest && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-[#C9E4D4] border border-[#A5CFB7] px-2 py-0.5 text-[10px] font-mono text-[#2C5C42] font-semibold">
                                <Trophy className="h-3 w-3" />
                                Best
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-3 text-right font-mono text-[#6B6D85]">
                          {row.trainAccuracy.toFixed(2)}%
                        </td>
                        <td
                          className={`py-4 px-3 text-right font-mono ${
                            row.isBest ? 'font-bold text-[#32694A]' : 'text-[#4B4D66]'
                          }`}
                        >
                          {row.accuracy.toFixed(2)}%
                        </td>
                        <td
                          className={`py-4 px-3 text-right font-mono ${
                            row.isBest ? 'font-bold text-[#32694A]' : 'text-[#4B4D66]'
                          }`}
                        >
                          {row.precision.toFixed(2)}%
                        </td>
                        <td
                          className={`py-4 px-3 text-right font-mono ${
                            row.id === 'lr' ? 'font-bold text-[#3F6F90]' : 'text-[#4B4D66]'
                          }`}
                        >
                          {row.recall.toFixed(2)}%
                        </td>
                        <td
                          className={`py-4 px-3 text-right font-mono ${
                            row.isBest ? 'font-bold text-[#32694A]' : 'text-[#4B4D66]'
                          }`}
                        >
                          {row.f1Score.toFixed(2)}%
                        </td>
                        <td
                          className={`py-4 px-5 text-right font-mono ${
                            row.isBest ? 'font-bold text-[#32694A]' : 'text-[#4B4D66]'
                          }`}
                        >
                          {row.rocAuc.toFixed(3)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Per-Class Classification Report Strip for Selected Model (Cell 53) */}
            <div className="px-6 py-4 bg-[#FFFCF8] border-t border-[#F0EAF7] space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 text-[#34354A] font-semibold">
                  <CheckCircle2 className="h-4 w-4 text-[#4A8A67] shrink-0" />
                  <span>
                    Per-Class Classification Report —{' '}
                    <span className="text-[#5E4E84]">{selectedModel.model}</span> (Notebook Cell 53)
                  </span>
                </div>
                <span className="font-mono text-[11px] text-[#6B6D85]">
                  Macro F1: {selectedModel.classReport.macroF1.toFixed(2)} · Weighted F1:{' '}
                  {selectedModel.classReport.weightedF1.toFixed(2)}
                </span>
              </div>
              <div className="grid sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="rounded-xl bg-[#EEF6FB]/75 border border-[#B9D7EA] px-3.5 py-2.5 flex flex-col gap-1">
                  <span className="text-[#3F6F90] font-semibold">Normal Demand (n=3,867)</span>
                  <span className="text-[#34354A]">
                    P: {selectedModel.classReport.normal.precision.toFixed(2)} · R:{' '}
                    {selectedModel.classReport.normal.recall.toFixed(2)} · F1:{' '}
                    <strong>{selectedModel.classReport.normal.f1.toFixed(2)}</strong>
                  </span>
                </div>
                <div className="rounded-xl bg-[#EFF8F2]/85 border border-[#C9E4D4] px-3.5 py-2.5 flex flex-col gap-1">
                  <span className="text-[#32694A] font-semibold">High Demand (n=12,525)</span>
                  <span className="text-[#34354A]">
                    P: {selectedModel.classReport.high.precision.toFixed(2)} · R:{' '}
                    {selectedModel.classReport.high.recall.toFixed(2)} · F1:{' '}
                    <strong>{selectedModel.classReport.high.f1.toFixed(2)}</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Interactive Confusion Matrix Preview for Selected Row */}
          <div className="lg:col-span-4 glass-card rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <h3 className="text-sm font-bold text-[#34354A]">Test Prediction Breakdown</h3>
                <span className="text-[11px] font-mono text-[#5E4E84] bg-[#F7F4FC] px-2 py-0.5 rounded">
                  {selectedModel.shortName}
                </span>
              </div>
              <div className="flex gap-1.5 mb-4">
                {MODEL_COMPARISON.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSelectedCmModelId(m.id)}
                    className={`flex-1 rounded-lg py-1.5 text-[11px] font-semibold transition-colors ${
                      selectedCmModelId === m.id
                        ? 'bg-[#B8A5D6] text-[#34354A] border border-[#A28CC6]'
                        : 'bg-[#F7F4FC] text-[#62647C] border border-[#E5DDF2] hover:text-[#34354A]'
                    }`}
                  >
                    {m.id.toUpperCase()}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2.5 text-center">
                <div className="rounded-xl bg-[#EEF6FB] border border-[#B9D7EA] p-3">
                  <span className="block text-[10px] font-mono text-[#4B7C9D]">True Negative (TN)</span>
                  <span className="mt-1 block text-xl font-extrabold font-mono text-[#34354A]">
                    {selectedModel.confusionMatrix.tn.toLocaleString()}
                  </span>
                </div>
                <div className="rounded-xl bg-[#FDF1F5] border border-[#F2C6D5] p-3">
                  <span className="block text-[10px] font-mono text-[#9A4E6A]">False Positive (FP)</span>
                  <span className="mt-1 block text-xl font-extrabold font-mono text-[#8A415C]">
                    {selectedModel.confusionMatrix.fp.toLocaleString()}
                  </span>
                </div>
                <div className="rounded-xl bg-[#F7F4FC] border border-[#D8CEEA] p-3">
                  <span className="block text-[10px] font-mono text-[#625288]">False Negative (FN)</span>
                  <span className="mt-1 block text-xl font-extrabold font-mono text-[#534475]">
                    {selectedModel.confusionMatrix.fn.toLocaleString()}
                  </span>
                </div>
                <div className="rounded-xl bg-[#EFF8F2] border border-[#C9E4D4] p-3">
                  <span className="block text-[10px] font-mono text-[#3B7354]">True Positive (TP)</span>
                  <span className="mt-1 block text-xl font-extrabold font-mono text-[#2F6346]">
                    {selectedModel.confusionMatrix.tp.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <p className="mt-4 text-[11px] text-[#62647C] font-mono text-center">
              Total Correct:{' '}
              <strong className="text-[#34354A]">
                {(
                  selectedModel.confusionMatrix.tn + selectedModel.confusionMatrix.tp
                ).toLocaleString()}
              </strong>{' '}
              / 16,392 ({selectedModel.accuracy.toFixed(2)}%)
            </p>
          </div>
        </div>

        {/* Training vs Testing Accuracy Card (New in ds42222_(3).ipynb Cells 54-55) */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
            <div>
              <h3 className="text-lg font-bold text-[#34354A] flex items-center gap-2">
                <Activity className="h-5 w-5 text-[#6D5B97]" />
                <span>Training vs Testing Accuracy (Overfitting Check)</span>
              </h3>
              <p className="text-xs text-[#6B6D85] mt-0.5">
                Comparing in-sample training fit (65,568 hrs) against chronological out-of-sample test performance (16,392 hrs) — Notebook Cells 54–55
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="inline-flex rounded-lg bg-[#F7F4FC] border border-[#E5DDF2] p-0.5 text-[11px]">
                <button
                  type="button"
                  onClick={() => setTtView('interactive')}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                    ttView === 'interactive'
                      ? 'bg-white text-[#34354A] shadow-2xs'
                      : 'text-[#6B6D85] hover:text-[#34354A]'
                  }`}
                >
                  Interactive
                </button>
                <button
                  type="button"
                  onClick={() => setTtView('notebook')}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                    ttView === 'notebook'
                      ? 'bg-white text-[#34354A] shadow-2xs'
                      : 'text-[#6B6D85] hover:text-[#34354A]'
                  }`}
                >
                  Notebook Plot
                </button>
              </div>
              <button
                type="button"
                onClick={() =>
                  onOpenImage({
                    src: '/notebook-plots/train-vs-test-accuracy.png',
                    title: 'Training vs Testing Accuracy',
                  })
                }
                className="p-1.5 rounded-lg border border-[#E5DDF2] bg-[#F7F4FC] text-[#5E4E84] hover:border-[#B8A5D6]"
                title="Zoom notebook plot"
              >
                <Maximize2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7">
              {ttView === 'notebook' ? (
                <div className="rounded-xl bg-[#FFFCF8] p-2 border border-[#EAE4F3]">
                  <img
                    src="/notebook-plots/train-vs-test-accuracy.png"
                    alt="Training vs Testing Accuracy"
                    loading="lazy"
                    onClick={() =>
                      onOpenImage({
                        src: '/notebook-plots/train-vs-test-accuracy.png',
                        title: 'Training vs Testing Accuracy',
                      })
                    }
                    className="w-full h-64 object-contain cursor-zoom-in mx-auto"
                  />
                </div>
              ) : (
                <div className="h-64 w-full rounded-xl bg-[#FFFCF8] border border-[#F2EDF9] p-2 sm:p-3">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={TRAIN_TEST_DATA}
                      margin={{ top: 10, right: 12, left: -12, bottom: 4 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#ECE6F5" vertical={false} />
                      <XAxis dataKey="model" tick={{ fill: '#4B4D66', fontSize: 11 }} />
                      <YAxis
                        domain={[80, 102]}
                        tick={{ fill: '#62647C', fontSize: 11 }}
                        tickFormatter={(v) => `${v}%`}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #DFD6EE',
                          borderRadius: '12px',
                          fontSize: '12px',
                          color: '#34354A',
                          boxShadow: '0 8px 24px -8px rgba(52,53,74,0.14)',
                        }}
                        formatter={(val, name) => [`${val.toFixed(2)}%`, name]}
                      />
                      <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '6px' }} />
                      <Bar dataKey="Training Accuracy" fill="#B8A5D6" radius={[6, 6, 0, 0]} maxBarSize={44} />
                      <Bar dataKey="Testing Accuracy" fill="#82BC9C" radius={[6, 6, 0, 0]} maxBarSize={44} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            <div className="lg:col-span-5 space-y-3 text-xs text-[#54566E] leading-relaxed">
              <div className="rounded-xl bg-[#EEF6FB]/75 border border-[#B9D7EA] p-3.5">
                <p className="font-mono font-semibold text-[#3F6F90]">
                  Logistic Regression · Gap: 1.89%
                </p>
                <p className="mt-1">
                  Train <strong className="text-[#34354A]">95.00%</strong> vs Test{' '}
                  <strong className="text-[#34354A]">93.11%</strong> — very stable linear baseline with minimal variance.
                </p>
              </div>
              <div className="rounded-xl bg-[#FDF1F5]/80 border border-[#F2C6D5] p-3.5">
                <p className="font-mono font-semibold text-[#9A4E6A]">
                  Decision Tree · Gap: 9.37% (Overfitting)
                </p>
                <p className="mt-1">
                  Train <strong className="text-[#34354A]">100.00%</strong> vs Test{' '}
                  <strong className="text-[#34354A]">90.63%</strong> — a single unpruned tree memorizes training noise and drops on unseen years.
                </p>
              </div>
              <div className="rounded-xl bg-[#EFF8F2]/85 border border-[#C9E4D4] p-3.5">
                <p className="font-mono font-semibold text-[#32694A]">
                  Random Forest · Gap: 4.33% (Best Generalization)
                </p>
                <p className="mt-1">
                  Train <strong className="text-[#34354A]">100.00%</strong> vs Test{' '}
                  <strong className="text-[#34354A]">95.67%</strong> — averaging 200 trees cuts single-tree error in half while achieving the top test score.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
