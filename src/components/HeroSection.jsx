import React from 'react';
import {
  Zap,
  ArrowRight,
  BarChart3,
  Activity,
  ShieldCheck,
  Database,
  Clock,
  TrendingUp,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
} from 'recharts';
import edaData from '../data/edaData.json';

export default function HeroSection() {
  const { hourlyDemand, summary } = edaData;

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] pt-24 pb-20 flex items-center overflow-hidden bg-[#F7F4FC] bg-grid-pattern border-b border-[#EAE4F3]"
    >
      {/* Subtle soft pastel ambient blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full bg-[#B9D7EA]/35 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[380px] w-[380px] rounded-full bg-[#F2C6D5]/30 blur-[110px]" />

      {/* Decorative subtle pastel power grid curves */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-55"
        viewBox="0 0 1440 760"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <path
          d="M-60 560 C 260 440, 480 650, 820 420 S 1220 260, 1520 360"
          stroke="#B8A5D6"
          strokeOpacity="0.45"
          strokeWidth="1.5"
        />
        <path
          d="M-60 560 C 260 440, 480 650, 820 420 S 1220 260, 1520 360"
          stroke="#7E6AA8"
          strokeWidth="2.2"
          className="animate-power-flow"
        />
        <path
          d="M-80 260 C 280 180, 560 360, 920 200 S 1260 120, 1540 210"
          stroke="#B9D7EA"
          strokeOpacity="0.6"
          strokeWidth="1.4"
        />
      </svg>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Title, Intro, CTAs */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold tracking-tight text-[#34354A] leading-[1.08]">
                Electricity Demand{' '}
                <span className="text-[#6F5C9A]">Prediction</span>
              </h1>
              <p className="text-lg sm:text-xl font-semibold text-[#555770]">
                Predicting High Electricity Demand Using Machine Learning
              </p>
            </div>

            <p className="text-[#585A73] text-base sm:text-lg leading-relaxed max-w-xl">
              An end-to-end supervised classification study using{' '}
              <span className="text-[#34354A] font-semibold">11 years of Bangladesh national power grid records</span>{' '}
              (<code className="font-mono text-[#625288] bg-white/85 border border-[#E5DDF2] px-1.5 py-0.5 rounded text-sm">pgcb_V1_raw.csv</code>) to forecast whether
              electricity demand in the <span className="text-[#34354A] font-semibold">next hour</span> will enter
              the high-load threshold (≥ 9,742 MW, computed strictly on the training split).
            </p>

            {/* Primary CTA buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#intro"
                className="inline-flex items-center gap-2.5 rounded-xl bg-[#B8A5D6] border border-[#A48FC7] px-6 py-3.5 text-sm font-semibold text-[#34354A] shadow-sm hover:bg-[#AA95CC] transition-all hover:-translate-y-0.5"
              >
                <span>Explore Project</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#comparison"
                className="inline-flex items-center gap-2.5 rounded-xl border border-[#DDD4EC] bg-white px-6 py-3.5 text-sm font-semibold text-[#34354A] hover:border-[#B8A5D6] hover:bg-[#FFFCF8] transition-all hover:-translate-y-0.5 shadow-xs"
              >
                <BarChart3 className="h-4 w-4 text-[#6B5A93]" />
                <span>View Results</span>
              </a>
            </div>

            {/* Key project stats strip */}
            <div className="grid grid-cols-3 gap-3 pt-4 max-w-xl">
              <div className="rounded-xl border border-[#EAE4F3] bg-white p-3.5 shadow-xs">
                <div className="flex items-center gap-1.5 text-xs text-[#6B6D85]">
                  <Database className="h-3.5 w-3.5 text-[#5888A8]" />
                  <span>Cleaned Hourly</span>
                </div>
                <p className="mt-1 text-xl font-bold font-mono text-[#34354A]">
                  {summary.cleanedRows.toLocaleString()}
                </p>
              </div>
              <div className="rounded-xl border border-[#C9E4D4] bg-[#F3FBF6] p-3.5 shadow-xs">
                <div className="flex items-center gap-1.5 text-xs text-[#4A6B59]">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#498765]" />
                  <span>Best Accuracy</span>
                </div>
                <p className="mt-1 text-xl font-bold font-mono text-[#386E50]">95.47%</p>
              </div>
              <div className="rounded-xl border border-[#EAE4F3] bg-white p-3.5 shadow-xs">
                <div className="flex items-center gap-1.5 text-xs text-[#6B6D85]">
                  <TrendingUp className="h-3.5 w-3.5 text-[#7A67A6]" />
                  <span>Best ROC-AUC</span>
                </div>
                <p className="mt-1 text-xl font-bold font-mono text-[#5F4E87]">0.990</p>
              </div>
            </div>
          </div>

          {/* Right Column: Clean White Grid Analytics Telemetry Visual */}
          <div className="lg:col-span-6">
            <div className="glass-card rounded-2xl p-5 sm:p-6 relative overflow-hidden animate-float-slow">
              <div className="absolute inset-x-0 top-0 h-1.5 bg-[#B8A5D6]" />

              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#EFEAF7]">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-[#EEF6FB] border border-[#B9D7EA] flex items-center justify-center">
                    <Activity className="h-5 w-5 text-[#4C7D9E]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#34354A]">
                      National Grid Load Profile (24-Hour Cycle)
                    </h3>
                    <p className="text-xs text-[#6B6D85] font-mono">
                      PGCB Dataset · 2015–2026 Mean Hourly Demand
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FDF1F5] border border-[#F2C6D5] px-3 py-1 text-[11px] font-mono text-[#964D68]">
                  <Zap className="h-3 w-3" />
                  High Threshold: 9,742 MW
                </span>
              </div>

              {/* Interactive Hourly Area Chart using Real Dataset Values */}
              <div className="mt-5 h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={hourlyDemand} margin={{ top: 10, right: 12, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="heroDemandGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#B9D7EA" stopOpacity={0.7} />
                        <stop offset="95%" stopColor="#B9D7EA" stopOpacity={0.08} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="hour"
                      stroke="#D8D1E6"
                      tick={{ fill: '#6B6D85', fontSize: 10 }}
                      interval={3}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#D8D1E6"
                      tick={{ fill: '#6B6D85', fontSize: 10 }}
                      domain={[5000, 11500]}
                      tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                      tickLine={false}
                      axisLine={false}
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
                      formatter={(val, name) => [
                        name === 'avgDemand' ? `${val.toLocaleString()} MW` : `${val}%`,
                        name === 'avgDemand' ? 'Avg Demand' : 'High-Demand Prob',
                      ]}
                    />
                    <ReferenceLine
                      y={9742}
                      stroke="#D484A0"
                      strokeDasharray="4 4"
                      label={{
                        value: 'Train Q75 (9,742 MW)',
                        position: 'insideTopRight',
                        fill: '#9C516C',
                        fontSize: 10,
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="avgDemand"
                      stroke="#6B9EC0"
                      strokeWidth={2.5}
                      fill="url(#heroDemandGrad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Telemetry Footer Cards */}
              <div className="mt-4 grid grid-cols-3 gap-3 pt-4 border-t border-[#EFEAF7]">
                <div className="rounded-xl bg-[#FDF1F5]/75 border border-[#F2C6D5] p-3">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#7D4B5E]">
                    <Clock className="h-3.5 w-3.5 text-[#B46482]" />
                    <span>Peak Hour</span>
                  </div>
                  <p className="mt-1 text-base font-bold font-mono text-[#34354A]">21:00</p>
                  <p className="text-[11px] text-[#964D68] font-mono">10,363 MW avg</p>
                </div>
                <div className="rounded-xl bg-[#EFF8F2] border border-[#C9E4D4] p-3">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#456B56]">
                    <Zap className="h-3.5 w-3.5 text-[#498765]" />
                    <span>Winning Model</span>
                  </div>
                  <p className="mt-1 text-base font-bold text-[#34354A]">Random Forest</p>
                  <p className="text-[11px] text-[#3B7354] font-mono">F1: 96.98%</p>
                </div>
                <div className="rounded-xl bg-[#EEF6FB] border border-[#B9D7EA] p-3">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#486B84]">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#4F81A3]" />
                    <span>Validation</span>
                  </div>
                  <p className="mt-1 text-base font-bold font-mono text-[#34354A]">14,796 hrs</p>
                  <p className="text-[11px] text-[#4C7A9B] font-mono">Chronological 20%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
