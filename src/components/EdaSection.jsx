import React, { useState } from 'react';
import {
  BarChart2,
  Maximize2,
  Sliders,
  Image as ImageIcon,
  Info,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ScatterChart,
  Scatter,
  LineChart,
  Line,
  ReferenceLine,
  ComposedChart,
} from 'recharts';
import SectionHeader from './SectionHeader';
import edaData from '../data/edaData.json';

const TOOLTIP_STYLE = {
  backgroundColor: '#FFFFFF',
  border: '1px solid #DFD6EE',
  borderRadius: '12px',
  fontSize: '12px',
  color: '#34354A',
  boxShadow: '0 8px 24px -8px rgba(52, 53, 74, 0.14)',
};

// Soft pastel diverging color scale with readable dark muted navy text
function getCorrColor(val) {
  if (val >= 0.75) return 'bg-[#D69DB5] text-[#34354A] font-semibold';
  if (val >= 0.5) return 'bg-[#F2C6D5] text-[#34354A] font-medium';
  if (val >= 0.25) return 'bg-[#DDD0F0] text-[#34354A]';
  if (val >= 0.08) return 'bg-[#ECE6F7] text-[#454760]';
  if (val > -0.08) return 'bg-[#FAF8FC] text-[#6E7088]';
  return 'bg-[#B9D7EA] text-[#34354A]';
}

function EdaCard({ title, subtitle, insight, plotSrc, mode, onZoom, children, fullWidth = false }) {
  return (
    <div
      className={`glass-card rounded-2xl p-5 sm:p-6 flex flex-col justify-between ${
        fullWidth ? 'lg:col-span-2' : ''
      }`}
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#34354A]">{title}</h3>
            <p className="text-xs text-[#6B6D85] mt-0.5">{subtitle}</p>
          </div>
          {plotSrc && (
            <button
              type="button"
              onClick={() => onZoom({ src: plotSrc, title })}
              className="shrink-0 inline-flex items-center gap-1 rounded-lg border border-[#E5DDF2] bg-[#F7F4FC] px-2.5 py-1.5 text-[11px] font-medium text-[#5E4E84] hover:bg-[#EFE9FA] hover:border-[#B8A5D6] transition-colors"
              title="Inspect original Jupyter Notebook plot"
            >
              <Maximize2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Notebook PNG</span>
            </button>
          )}
        </div>

        {mode === 'notebook' && plotSrc ? (
          <div className="rounded-xl bg-[#FFFCF8] p-2.5 border border-[#EAE4F3] overflow-hidden">
            <img
              src={plotSrc}
              alt={title}
              loading="lazy"
              onClick={() => onZoom({ src: plotSrc, title })}
              className="w-full h-64 sm:h-72 object-contain cursor-zoom-in mx-auto"
            />
          </div>
        ) : (
          <div className="w-full rounded-xl bg-[#FFFCF8]/70 border border-[#F2EDF9] p-2 sm:p-3">
            {children}
          </div>
        )}
      </div>

      {insight && (
        <div className="mt-4 pt-3.5 border-t border-[#F0EAF7] flex items-start gap-2 text-xs text-[#54566E] leading-relaxed">
          <Info className="h-4 w-4 text-[#7A67A6] shrink-0 mt-0.5" />
          <span>{insight}</span>
        </div>
      )}
    </div>
  );
}

export default function EdaSection({ onOpenImage }) {
  const [chartMode, setChartMode] = useState('interactive');
  const [hoveredCell, setHoveredCell] = useState(null);

  const {
    histogram,
    hourlyDemand,
    yearlyDemand,
    targetDistribution,
    correlation,
    scatter,
    summary,
  } = edaData;

  const genNormal = scatter.genVsDemand.filter((p) => p.high === 0);
  const genHigh = scatter.genVsDemand.filter((p) => p.high === 1);
  const lsPoints = scatter.loadSheddingVsDemand;
  const solarPoints = scatter.solarVsGeneration;

  // Map pastel fills for target distribution without mutating edaData.json
  const pastelTargetDist = targetDistribution.map((item, idx) => ({
    ...item,
    pastelFill: idx === 0 ? '#8FBAD6' : '#E39EB7',
    pastelBg: idx === 0 ? 'bg-[#EEF6FB] border-[#B9D7EA]' : 'bg-[#FDF1F5] border-[#F2C6D5]',
    pastelText: idx === 0 ? 'text-[#3F6F90]' : 'text-[#9A4E6A]',
  }));

  return (
    <section id="eda" className="py-20 sm:py-24 relative bg-[#FFFCF8] border-t border-[#EAE4F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8">
          <div className="max-w-2xl">
            <SectionHeader
              eyebrow="Section 05 · Visual Analytics"
              icon={BarChart2}
              title="Exploratory Data Analysis (EDA)"
              subtitle="All eight EDA visualizations computed directly from the cleaned 73,976-row Bangladesh electricity dataset — switch anytime between interactive Recharts and the exact Matplotlib/Seaborn notebook outputs."
            />
          </div>

          {/* Global Interactive vs Notebook PNG Switch */}
          <div className="md:mb-10 inline-flex rounded-xl bg-[#F7F4FC] border border-[#E5DDF2] p-1 self-start">
            <button
              type="button"
              onClick={() => setChartMode('interactive')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                chartMode === 'interactive'
                  ? 'bg-white text-[#34354A] border border-[#B8A5D6] shadow-2xs'
                  : 'text-[#62647C] hover:text-[#34354A] border border-transparent'
              }`}
            >
              <Sliders className="h-3.5 w-3.5 text-[#7A67A6]" />
              <span>Interactive Charts</span>
            </button>
            <button
              type="button"
              onClick={() => setChartMode('notebook')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                chartMode === 'notebook'
                  ? 'bg-white text-[#34354A] border border-[#B8A5D6] shadow-2xs'
                  : 'text-[#62647C] hover:text-[#34354A] border border-transparent'
              }`}
            >
              <ImageIcon className="h-3.5 w-3.5 text-[#7A67A6]" />
              <span>Notebook Outputs</span>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* 1. Electricity Demand Distribution */}
          <EdaCard
            title="1. Electricity Demand Distribution"
            subtitle="Frequency histogram of hourly demand_mw (0–18,000 MW operating range)"
            plotSrc="/notebook-plots/demand-distribution.png"
            mode={chartMode}
            onZoom={onOpenImage}
            insight={`Mean demand is ${summary.meanDemand.toLocaleString()} MW (median ${summary.medianDemand.toLocaleString()} MW). Pastel pink bars highlight demand above the leak-free training 75th percentile (≥ 9,742 MW) defining High Demand; 7 extreme logging anomalies above 18,000 MW are visible in the raw notebook plot.`}
          >
            <div className="h-64 sm:h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={histogram} margin={{ top: 10, right: 10, left: -12, bottom: 18 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ECE6F5" vertical={false} />
                  <XAxis
                    dataKey="range"
                    tick={{ fill: '#62647C', fontSize: 10 }}
                    angle={-35}
                    textAnchor="end"
                    interval={1}
                  />
                  <YAxis
                    tick={{ fill: '#62647C', fontSize: 10 }}
                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    contentStyle={TOOLTIP_STYLE}
                    formatter={(value) => [`${value.toLocaleString()} hours`, 'Frequency']}
                    labelFormatter={(lbl, payload) => payload?.[0]?.payload?.label || lbl}
                  />
                  <Bar dataKey="count" radius={[5, 5, 0, 0]}>
                    {histogram.map((entry) => (
                      <Cell
                        key={entry.range}
                        fill={entry.isHighZone ? '#E4A3BC' : '#96C1DC'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </EdaCard>

          {/* 2. Average Electricity Demand by Hour */}
          <EdaCard
            title="2. Average Electricity Demand by Hour"
            subtitle="Mean demand_mw (bars) & next-hour high-demand probability (line) across 00:00–23:00"
            plotSrc="/notebook-plots/hourly-demand.png"
            mode={chartMode}
            onZoom={onOpenImage}
            insight="Demand dips overnight before climbing steadily through the day and surging during evening residential & commercial peak hours (20:00–22:00, peaking at 10,363 MW at 21:00), confirming why Hour is a key engineered feature."
          >
            <div className="h-64 sm:h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={hourlyDemand} margin={{ top: 10, right: 6, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ECE6F5" vertical={false} />
                  <XAxis
                    dataKey="hourNum"
                    tick={{ fill: '#62647C', fontSize: 10 }}
                    tickFormatter={(h) => `${h}h`}
                    interval={1}
                  />
                  <YAxis
                    yAxisId="left"
                    tick={{ fill: '#62647C', fontSize: 10 }}
                    domain={[5000, 11500]}
                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tick={{ fill: '#7D68A8', fontSize: 10 }}
                    domain={[0, 70]}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <Tooltip
                    contentStyle={TOOLTIP_STYLE}
                    formatter={(val, name) =>
                      name === 'avgDemand'
                        ? [`${val.toLocaleString()} MW`, 'Avg Demand']
                        : [`${val}%`, 'High Demand Next Hr']
                    }
                    labelFormatter={(h) => `Hour ${String(h).padStart(2, '0')}:00`}
                  />
                  <Bar yAxisId="left" dataKey="avgDemand" radius={[4, 4, 0, 0]} fill="#A5CBE2" />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="highProbPct"
                    stroke="#8B74B8"
                    strokeWidth={2.5}
                    dot={false}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </EdaCard>

          {/* 3. Generation vs Demand */}
          <EdaCard
            title="3. Generation vs Demand"
            subtitle={`Stratified real sample of ${scatter.genVsDemandCount.toLocaleString()} valid hourly records (MW)`}
            plotSrc="/notebook-plots/generation-vs-demand.png"
            mode={chartMode}
            onZoom={onOpenImage}
            insight="In normal grid operation, generation tracks demand closely along the 1:1 diagonal, with upward divergence indicating load shedding. Note: the raw unclipped notebook scatter reveals 1 extreme generation typo (64.5M MW on 2023-01-15) and 7 demand outliers >20k MW."
          >
            <div className="h-64 sm:h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 10, right: 16, left: -8, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ECE6F5" />
                  <XAxis
                    type="number"
                    dataKey="x"
                    name="Generation"
                    unit=" MW"
                    tick={{ fill: '#62647C', fontSize: 10 }}
                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                    domain={[0, 18000]}
                  />
                  <YAxis
                    type="number"
                    dataKey="y"
                    name="Demand"
                    unit=" MW"
                    tick={{ fill: '#62647C', fontSize: 10 }}
                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                    domain={[0, 18000]}
                  />
                  <Tooltip
                    cursor={{ strokeDasharray: '3 3', stroke: '#B8A5D6' }}
                    contentStyle={TOOLTIP_STYLE}
                    formatter={(val, name) => [`${val.toLocaleString()} MW`, name]}
                  />
                  <ReferenceLine y={9742} stroke="#9E87C8" strokeDasharray="4 4" />
                  <Scatter name="Normal Next Hr (0)" data={genNormal} fill="#7CAED0" fillOpacity={0.75} />
                  <Scatter name="High Next Hr (1)" data={genHigh} fill="#DC91AC" fillOpacity={0.85} />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </EdaCard>

          {/* 4. Load Shedding vs Demand */}
          <EdaCard
            title="4. Load Shedding vs Demand"
            subtitle={`Supply shortfall events (${summary.loadSheddingEvents.toLocaleString()} hours with load_shedding > 0)`}
            plotSrc="/notebook-plots/load-shedding-vs-demand.png"
            mode={chartMode}
            onZoom={onOpenImage}
            insight="Load shedding shows a positive correlation (r = 0.35) with demand_mw and spikes sharply when demand surpasses 10,000–16,000 MW, making it a useful grid-stress indicator for high-demand classification."
          >
            <div className="h-64 sm:h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 10, right: 16, left: -8, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ECE6F5" />
                  <XAxis
                    type="number"
                    dataKey="x"
                    name="Load Shedding"
                    unit=" MW"
                    tick={{ fill: '#62647C', fontSize: 10 }}
                  />
                  <YAxis
                    type="number"
                    dataKey="y"
                    name="Demand"
                    unit=" MW"
                    tick={{ fill: '#62647C', fontSize: 10 }}
                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    cursor={{ strokeDasharray: '3 3', stroke: '#B8A5D6' }}
                    contentStyle={TOOLTIP_STYLE}
                    formatter={(val, name) => [`${val.toLocaleString()} MW`, name]}
                  />
                  <ReferenceLine y={9742} stroke="#9E87C8" strokeDasharray="4 4" />
                  <Scatter name="Hourly Observation" data={lsPoints} fill="#D98DA9" fillOpacity={0.75} />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </EdaCard>

          {/* 5. Solar Generation vs Total Generation */}
          <EdaCard
            title="5. Solar Generation vs Total Generation"
            subtitle={`Solar output vs total generation (${scatter.solarCount.toLocaleString()} non-null solar records)`}
            plotSrc="/notebook-plots/solar-vs-generation.png"
            mode={chartMode}
            onZoom={onOpenImage}
            insight="Solar generation contributes up to ~600–700 MW during sunny daytime periods (mostly expanding after 2020) and correlates moderately with coal (r = 0.42) and demand (r = 0.29) because both peak during midday industrial hours."
          >
            <div className="h-64 sm:h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 10, right: 16, left: -8, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ECE6F5" />
                  <XAxis
                    type="number"
                    dataKey="x"
                    name="Solar"
                    unit=" MW"
                    tick={{ fill: '#62647C', fontSize: 10 }}
                  />
                  <YAxis
                    type="number"
                    dataKey="y"
                    name="Total Generation"
                    unit=" MW"
                    tick={{ fill: '#62647C', fontSize: 10 }}
                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    cursor={{ strokeDasharray: '3 3', stroke: '#B8A5D6' }}
                    contentStyle={TOOLTIP_STYLE}
                    formatter={(val, name) => [`${val.toLocaleString()} MW`, name]}
                  />
                  <Scatter name="Solar vs Generation" data={solarPoints} fill="#7DB999" fillOpacity={0.8} />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </EdaCard>

          {/* 6. Yearly Average Electricity Demand */}
          <EdaCard
            title="6. Yearly Average Electricity Demand"
            subtitle="Long-term structural growth in Bangladesh's annual average demand (2015–2026)"
            plotSrc="/notebook-plots/yearly-demand.png"
            mode={chartMode}
            onZoom={onOpenImage}
            insight="Average demand more than doubled in a decade — climbing from 5,664 MW in 2015 to 11,750 MW in 2025 (+107.5%). The 2026 figure (10,004 MW) reflects winter/early-spring records only (Jan–Mar 8, 2026, 1,272 continuous hours)."
          >
            <div className="h-64 sm:h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={yearlyDemand} margin={{ top: 12, right: 16, left: -8, bottom: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ECE6F5" vertical={false} />
                  <XAxis dataKey="year" tick={{ fill: '#62647C', fontSize: 11 }} />
                  <YAxis
                    tick={{ fill: '#62647C', fontSize: 10 }}
                    domain={[5000, 12500]}
                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    contentStyle={TOOLTIP_STYLE}
                    formatter={(val, name) =>
                      name === 'avgDemand'
                        ? [`${val.toLocaleString()} MW`, 'Avg Demand']
                        : [`${val}%`, 'High Demand Share']
                    }
                  />
                  <ReferenceLine y={9742} stroke="#D98DA9" strokeDasharray="4 4" />
                  <Line
                    type="monotone"
                    dataKey="avgDemand"
                    stroke="#8E79B8"
                    strokeWidth={3}
                    dot={{ r: 4.5, fill: '#B8A5D6', strokeWidth: 2, stroke: '#FFFFFF' }}
                    activeDot={{ r: 6, fill: '#6EA988' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </EdaCard>

          {/* 7. Target Class Distribution */}
          <EdaCard
            title="7. Target Class Distribution"
            subtitle="Binary label balance for High_Demand_Next_Hour (Train Q75 ≥ 9,742 MW)"
            plotSrc="/notebook-plots/target-distribution.png"
            mode={chartMode}
            onZoom={onOpenImage}
            insight="Using the leak-free training 75th percentile threshold (9,742 MW) across the 73,976 strictly continuous hourly records, the dataset splits into 65.44% Normal (48,413) vs 34.56% High Demand (25,563). Because demand grew strongly after 2022, the chronological 20% test set contains 76.24% High Demand (11,280 vs 3,516) — motivating class_weight='balanced' during training."
          >
            <div className="grid sm:grid-cols-12 gap-4 items-center h-auto sm:h-72">
              <div className="sm:col-span-7 h-56 sm:h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={pastelTargetDist}
                    margin={{ top: 12, right: 12, left: -8, bottom: 4 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#ECE6F5" vertical={false} />
                    <XAxis dataKey="shortName" tick={{ fill: '#4B4D66', fontSize: 11 }} />
                    <YAxis
                      tick={{ fill: '#62647C', fontSize: 10 }}
                      tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                    />
                    <Tooltip
                      contentStyle={TOOLTIP_STYLE}
                      formatter={(val) => [`${val.toLocaleString()} hours`, 'Count']}
                    />
                    <Bar dataKey="count" radius={[8, 8, 0, 0]} barSize={56}>
                      {pastelTargetDist.map((entry) => (
                        <Cell key={entry.name} fill={entry.pastelFill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="sm:col-span-5 space-y-3">
                {pastelTargetDist.map((cls) => (
                  <div
                    key={cls.name}
                    className={`rounded-xl border p-3.5 ${cls.pastelBg}`}
                  >
                    <div className="flex items-center justify-between text-xs text-[#4B4D66]">
                      <span className="font-semibold">{cls.name}</span>
                      <span className="font-mono font-bold text-[#34354A]">{cls.percentage}%</span>
                    </div>
                    <p className={`mt-1 text-lg font-extrabold font-mono ${cls.pastelText}`}>
                      {cls.count.toLocaleString()}
                    </p>
                  </div>
                ))}
                <div className="rounded-xl bg-[#F7F4FC] border border-[#E5DDF2] p-3 text-[11px] font-mono text-[#5C5E76]">
                  <div>Train: 44,897 (0) · 14,283 (1)</div>
                  <div className="mt-1 text-[#5E4E84] font-semibold">Test: 3,516 (0) · 11,280 (1)</div>
                </div>
              </div>
            </div>
          </EdaCard>

          {/* 8. Correlation Heatmap (Full width for crisp readability) */}
          <EdaCard
            fullWidth
            title="8. Correlation Heatmap"
            subtitle="Pearson correlation matrix across numeric grid variables and next-hour demand targets"
            plotSrc="/notebook-plots/correlation-heatmap.png"
            mode={chartMode}
            onZoom={onOpenImage}
            insight="demand_mw correlates strongly with Next_Hour_Demand (r = 0.90) and High_Demand_Next_Hour (r = 0.78), followed by coal (0.68) and india_bheramara_hvdc (0.67). Notice generation_mw shows r = 0.01 linearly because of a single 64.5M MW raw logging typo — explaining why tree-based Random Forest outperforms linear models!"
          >
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#62647C]">
                <span>Hover any cell to inspect exact Pearson correlation (r).</span>
                {hoveredCell ? (
                  <span className="font-mono text-[#5B4A83] bg-[#F7F4FC] border border-[#B8A5D6] px-2.5 py-1 rounded-md">
                    {hoveredCell.row} × {hoveredCell.col} = <strong>{hoveredCell.val.toFixed(2)}</strong>
                  </span>
                ) : (
                  <span className="font-mono text-[#6B6D85]">
                    Top pair: demand_mw × Next_Hour_Demand = 0.90
                  </span>
                )}
              </div>

              <div className="overflow-x-auto pb-2">
                <table className="w-full min-w-[740px] border-separate border-spacing-1 text-[10px] font-mono">
                  <thead>
                    <tr>
                      <th className="p-1 text-left text-[#62647C] font-medium">Feature</th>
                      {correlation.labels.map((lbl) => (
                        <th
                          key={lbl}
                          className="p-1 text-center text-[#62647C] font-medium max-w-[60px] truncate"
                          title={lbl}
                        >
                          {lbl
                            .replace('india_bheramara_hvdc', 'bheramara')
                            .replace('High_Demand_Next_Hour', 'High_Next')
                            .replace('Next_Hour_Demand', 'Next_Dem')
                            .replace('load_shedding', 'load_shd')
                            .replace('generation_mw', 'gen_mw')}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {correlation.matrix.map((row) => (
                      <tr key={row.feature}>
                        <td
                          className="pr-2 py-1 text-right text-[#34354A] whitespace-nowrap font-medium"
                          title={row.feature}
                        >
                          {row.feature}
                        </td>
                        {row.values.map((val, colIdx) => {
                          const colName = correlation.labels[colIdx];
                          return (
                            <td
                              key={`${row.feature}-${colName}`}
                              onMouseEnter={() =>
                                setHoveredCell({ row: row.feature, col: colName, val })
                              }
                              onMouseLeave={() => setHoveredCell(null)}
                              className={`text-center py-1.5 px-1 rounded cursor-default transition-transform hover:scale-110 border border-white/60 ${getCorrColor(
                                val
                              )}`}
                            >
                              {val.toFixed(2)}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </EdaCard>
        </div>
      </div>
    </section>
  );
}
