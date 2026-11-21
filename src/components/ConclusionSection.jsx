import React from 'react';
import {
  CheckCircle2,
  Award,
  Zap,
  Rocket,
  Compass,
} from 'lucide-react';
import SectionHeader from './SectionHeader';

const CONCLUSION_CARDS = [
  {
    icon: CheckCircle2,
    accent: 'text-[#3F6F90] bg-[#EEF6FB] border-[#B9D7EA]',
    dot: 'bg-[#7EAED0]',
    title: 'What the Project Achieved',
    points: [
      'Transformed 94,934 raw PGCB power grid logs (2015–2026) into 81,960 strictly aligned hourly records with 0 duplicates, 0 negative values, and 0 infinite values.',
      'Formulated a leak-free next-hour high-demand classification task using the training-only 75th-percentile threshold (9,742 MW) and engineered calendar features (Hour, DayOfYear).',
      'Built, evaluated, and benchmarked three complete scikit-learn Pipelines (including Train vs Test overfitting checks and per-class classification reports) on a chronological 16,392-hour test set, saving the winner via joblib.',
    ],
  },
  {
    icon: Award,
    accent: 'text-[#376F50] bg-[#EFF8F2] border-[#C9E4D4]',
    dot: 'bg-[#7BB897]',
    title: 'Best-Performing Model: Random Forest',
    points: [
      'Outperformed both Logistic Regression and Decision Tree across Accuracy (95.67%), Precision (98.47%), F1-Score (97.13%), and ROC-AUC (0.991), correctly classifying 15,682 of 16,392 test hours.',
      'Generalized significantly better than a single Decision Tree (95.67% vs 90.63% test accuracy) while slashing false positives by 79% compared to Logistic Regression (187 vs 889 false alarms).',
      'Revealed interpretable grid drivers led by demand_mw (33.48%), generation_mw (28.76%), india_bheramara_hvdc (10.87%), india_tripura (4.99%), and gas (4.73%).',
    ],
  },
  {
    icon: Zap,
    accent: 'text-[#9A4E6A] bg-[#FDF1F5] border-[#F2C6D5]',
    dot: 'bg-[#DE94AF]',
    title: 'How ML Supports Grid Forecasting',
    points: [
      'Provides automated 1-hour advance peak-load warnings so dispatch engineers can spin up gas/liquid-fuel peaking units before frequency drops.',
      'Helps reduce unscheduled load shedding during high-demand evening windows (20:00–22:00) and summer heat waves.',
      'Supports proactive cross-border import scheduling (Bheramara HVDC & Tripura links) and renewable variability balancing.',
    ],
  },
  {
    icon: Rocket,
    accent: 'text-[#625288] bg-[#F7F4FC] border-[#B8A5D6]',
    dot: 'bg-[#A692C9]',
    title: 'Possible Future Improvements',
    points: [
      'Outlier sanitization: cap or clean extreme raw telemetry typos (e.g., 64.5M MW generation and >20k MW demand anomalies) to boost linear and neural models.',
      'Richer time-series features: add multi-hour lag features (t-2h, t-24h, t-168h), rolling averages, day-of-week, and national holiday indicators.',
      'External signals & advanced models: integrate ambient temperature/humidity weather feeds, benchmark XGBoost/LightGBM/LSTM models, and extend to 6-hour and 24-hour multi-step forecasting.',
    ],
  },
];

export default function ConclusionSection() {
  return (
    <section id="conclusion" className="py-20 sm:py-24 relative bg-[#FFFCF8] border-t border-[#EAE4F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Section 09 · Synthesis & Outlook"
          icon={Compass}
          title="Conclusion & Future Work"
          subtitle="Key takeaways from our empirical evaluation on Bangladesh's national electricity grid and actionable directions to push forecasting accuracy even further."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {CONCLUSION_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="glass-card glass-card-hover rounded-2xl p-6 sm:p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-4">
                    <div
                      className={`h-11 w-11 rounded-xl border flex items-center justify-center shrink-0 ${card.accent}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#34354A]">{card.title}</h3>
                  </div>

                  <ul className="space-y-3">
                    {card.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2.5 text-sm text-[#54566E] leading-relaxed"
                      >
                        <span className={`h-2 w-2 rounded-full shrink-0 mt-2 ${card.dot}`} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
