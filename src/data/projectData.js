// Ground-truth project metadata, preprocessing facts, and model evaluation metrics
// extracted directly from `ds42222_(3).ipynb` and `pgcb_V1_raw.csv`.

export const NAV_LINKS = [
  { id: 'intro', label: 'Introduction' },
  { id: 'dataset', label: 'Dataset' },
  { id: 'features', label: 'Features' },
  { id: 'preprocessing', label: 'Preprocessing' },
  { id: 'eda', label: 'EDA' },
  { id: 'models', label: 'Models' },
  { id: 'comparison', label: 'Comparison' },
  { id: 'best-model', label: 'Best Model' },
  { id: 'conclusion', label: 'Conclusion' },
];

export const DATASET_INFO = {
  name: 'Bangladesh Electricity Generation Dataset',
  filename: 'pgcb_V1_raw.csv',
  sourceLabel: 'Power Grid Company of Bangladesh (PGCB) operational logs — provided for DS422 ML Lab',
  initialRows: 94934,
  initialCols: 15,
  afterDropCols: 11,
  cleanedRows: 81960,
  modelingFeatureCount: 12,
  duplicateRows: 0,
  duplicateDatetimes: 0,
  negativeValues: 0,
  infiniteValues: 0,
  dateRange: 'Apr 17, 2015 – Mar 08, 2026',
  highDemandThresholdMw: 9742,
  trainRows: 65568,
  testRows: 16392,
  trainSplitPct: 80,
  testSplitPct: 20,
  droppedColumns: [
    { name: 'remarks', missingCount: 88030, missingPct: 92.73, action: 'Dropped' },
    { name: 'nepal', missingCount: 83456, missingPct: 87.91, action: 'Dropped' },
    { name: 'india_adani', missingCount: 81549, missingPct: 85.90, action: 'Dropped' },
    { name: 'wind', missingCount: 70676, missingPct: 74.45, action: 'Dropped' },
    { name: 'solar', missingCount: 21050, missingPct: 22.17, action: 'Retained (Median Imputed)' },
  ],
  intervalDistribution: [
    { interval: '01:00:00 (Kept)', count: 81960, kept: true },
    { interval: '00:30:00', count: 8869, kept: false },
    { interval: '02:00:00', count: 4022, kept: false },
    { interval: '03:00:00', count: 35, kept: false },
    { interval: '01:30:00', count: 8, kept: false },
  ],
};

export const DATASET_FEATURES = [
  {
    name: 'datetime',
    role: 'Timestamp Index',
    category: 'Temporal',
    unit: 'YYYY-MM-DD HH:MM:SS',
    usedInX: false,
    description:
      'Exact date and time of each grid measurement. Converted to datetime, sorted chronologically, and used to construct 1-hour target shifts plus the Hour and DayOfYear features.',
  },
  {
    name: 'demand_mw',
    role: 'Primary Input Feature',
    category: 'Core Grid',
    unit: 'Megawatts (MW)',
    usedInX: true,
    description:
      'Total national electricity demand at the current timestamp. Strongest predictor of next-hour demand (r = 0.91 with Next_Hour_Demand; 33.48% RF importance).',
  },
  {
    name: 'generation_mw',
    role: 'Primary Input Feature',
    category: 'Core Grid',
    unit: 'Megawatts (MW)',
    usedInX: true,
    description:
      'Total electricity generated across the power system at that hour. Closely tracks grid supply capacity and ranks #2 in Random Forest feature importance (28.76%).',
  },
  {
    name: 'load_shedding',
    role: 'Grid Deficit Indicator',
    category: 'Core Grid',
    unit: 'Megawatts (MW)',
    usedInX: true,
    description:
      'Unmet electricity demand intentionally shed when supply falls short of total load. Non-zero values signal grid stress during peak consumption periods.',
  },
  {
    name: 'gas',
    role: 'Generation Source',
    category: 'Fuel & Imports',
    unit: 'Megawatts (MW)',
    usedInX: true,
    description:
      'Power produced by natural gas power plants — historically the largest domestic fuel source in Bangladesh (4.73% RF importance; avg ~5,070 MW across valid cleaned records).',
  },
  {
    name: 'liquid_fuel',
    role: 'Generation Source',
    category: 'Fuel & Imports',
    unit: 'Megawatts (MW)',
    usedInX: true,
    description:
      'Electricity generated from HFO (heavy fuel oil) and HSD (diesel) plants, frequently dispatched as flexible peaking capacity when demand surges (4.51% RF importance).',
  },
  {
    name: 'coal',
    role: 'Generation Source',
    category: 'Fuel & Imports',
    unit: 'Megawatts (MW)',
    usedInX: true,
    description:
      'Baseload power supplied by coal-fired power stations. Exhibits a strong positive correlation with demand (r = 0.68) and High Demand (r = 0.60).',
  },
  {
    name: 'hydro',
    role: 'Renewable Source',
    category: 'Fuel & Imports',
    unit: 'Megawatts (MW)',
    usedInX: true,
    description:
      'Hydroelectric generation (primarily from Kaptai Hydroelectric Power Station), varying with seasonal water availability and monsoon flows.',
  },
  {
    name: 'solar',
    role: 'Renewable Source',
    category: 'Fuel & Imports',
    unit: 'Megawatts (MW)',
    usedInX: true,
    description:
      'Grid-connected solar photovoltaic output peaking during midday sunlight hours. Contained 22.17% missing values early on and was median-imputed inside model pipelines.',
  },
  {
    name: 'india_bheramara_hvdc',
    role: 'Cross-Border Import',
    category: 'Fuel & Imports',
    unit: 'Megawatts (MW)',
    usedInX: true,
    description:
      'Electricity imported from India through the Bheramara HVDC transmission link. Ranks #3 in Random Forest importance (10.87%) with r = 0.67 correlation to demand.',
  },
  {
    name: 'india_tripura',
    role: 'Cross-Border Import',
    category: 'Fuel & Imports',
    unit: 'Megawatts (MW)',
    usedInX: true,
    description:
      'Cross-border electricity imported via the Tripura transmission interconnection, ranking #4 in Random Forest importance (4.99%).',
  },
  {
    name: 'Hour',
    role: 'Engineered Feature',
    category: 'Temporal',
    unit: '0 – 23',
    usedInX: true,
    description:
      'Hour of the day extracted from datetime. Captures daily consumption cycles — from early-morning lows to evening peaks (~10,200+ MW at 19:00–21:00).',
  },
  {
    name: 'DayOfYear',
    role: 'Engineered Feature',
    category: 'Temporal',
    unit: '1 – 366',
    usedInX: true,
    description:
      'Calendar day number within the year extracted from datetime. Captures seasonal cooling surges during hot summer months versus milder winter demand.',
  },
];

export const PREPROCESSING_STEPS = [
  {
    step: 1,
    title: 'Load Dataset',
    badge: '94,934 × 15',
    summary: 'Loaded raw operational records from pgcb_V1_raw.csv using pandas.',
    detail: 'Verified 9 integer columns, 4 float columns, and 2 object columns covering 2015–2026.',
  },
  {
    step: 2,
    title: 'Check Missing Values',
    badge: '5 Columns w/ NaN',
    summary: 'Quantified null counts and missingness percentages across all 15 attributes.',
    detail: 'Found heavy missingness in remarks (92.73%), nepal (87.91%), india_adani (85.90%), wind (74.45%), and moderate missingness in solar (22.17%).',
  },
  {
    step: 3,
    title: 'Check Duplicate & Invalid Values',
    badge: '0 Dup · 0 Neg · 0 Inf',
    summary: 'Audited duplicate rows/timestamps plus verified 0 negative and 0 infinite values.',
    detail: 'Confirmed 0 duplicate rows, 0 duplicate datetimes, 0 negative readings across all 8 power columns, and 0 infinite numeric values.',
  },
  {
    step: 4,
    title: 'Remove Unnecessary Columns',
    badge: '15 → 11 Cols',
    summary: 'Dropped sparse and non-predictive columns plus checked for unnamed index columns.',
    detail: 'Removed wind, india_adani, nepal, and remarks (>74% missing), retaining 11 core columns including solar.',
  },
  {
    step: 5,
    title: 'Convert Datetime',
    badge: 'datetime64[ns]',
    summary: 'Parsed the datetime column with errors="coerce" and dropped any unparseable timestamps.',
    detail: 'Ensured strict temporal data type compatibility for interval checks and calendar feature extraction.',
  },
  {
    step: 6,
    title: 'Sort Records Chronologically',
    badge: 'Time-Ordered',
    summary: 'Sorted the entire dataset ascending by datetime and reset row indices.',
    detail: 'Computed consecutive Time_Difference values: 81,960 exact 1-hour intervals, 8,869 half-hour, and 4,022 two-hour gaps.',
  },
  {
    step: 7,
    title: 'Leak-Free Next-Hour Target',
    badge: 'Threshold: 9,742 MW',
    summary: 'Filtered exact 1-hour pairs (81,960 rows) and computed Q75 strictly on the 80% training split.',
    detail: 'Defined High_Demand_Next_Hour = 1 when Next_Hour_Demand ≥ 9,742 MW (train-only Q75, zero leakage): 52,963 Normal (64.62%) vs 28,997 High (35.38%).',
  },
  {
    step: 8,
    title: 'Prepare Features for ML',
    badge: '12 Features · 80/20',
    summary: 'Extracted Hour & DayOfYear, selected 12 features, and split chronologically without shuffling.',
    detail: 'Train: 65,568 rows (80%) | Test: 16,392 rows (20%). Applied SimpleImputer(median) and StandardScaler (for LR) inside scikit-learn Pipelines.',
  },
];

export const ML_MODELS = [
  {
    id: 'logistic-regression',
    name: 'Logistic Regression',
    tag: 'Linear Baseline',
    accent: 'sky',
    pipeline: ['SimpleImputer(median)', 'StandardScaler()', 'LogisticRegression(class_weight="balanced", max_iter=1000)'],
    howItWorks:
      'Models the log-odds probability of high next-hour electricity demand as a weighted linear combination of the 12 standardized grid and time features.',
    projectRole:
      'Serves as a fast, interpretable linear benchmark with minimal overfitting (95.00% train vs 93.11% test accuracy). With balanced class weights it flags 98.08% of high-demand hours, though linear boundaries still generate 889 false positives.',
    strengths: ['Highest Recall (98.08%)', 'Lowest Train–Test Gap (1.89%) & 0.983 ROC-AUC', 'Fast training & interpretable'],
    tradeoff: 'Produces 889 false positives (93.25% precision), trailing Random Forest on Accuracy and F1-Score.',
  },
  {
    id: 'decision-tree',
    name: 'Decision Tree',
    tag: 'Non-Linear Rule Model',
    accent: 'amber',
    pipeline: ['SimpleImputer(median)', 'DecisionTreeClassifier(class_weight="balanced", random_state=42)'],
    howItWorks:
      'Recursively splits the grid records into if-then decision branches using thresholds on features like current demand, generation, fuel mix, and hour of day.',
    projectRole:
      'Captures non-linear relationships without feature scaling and reaches 97.97% precision (only 233 false alarms). However, memorizing training data (100% train vs 90.63% test) reveals clear overfitting and lowers recall to 89.60%.',
    strengths: ['High Precision (97.97%)', 'Captures non-linear thresholds', 'No scaling required'],
    tradeoff: 'Noticeable overfitting (100% train vs 90.63% test accuracy) and lowest ROC-AUC (0.918).',
  },
  {
    id: 'random-forest',
    name: 'Random Forest',
    tag: 'Best Performing Ensemble',
    accent: 'emerald',
    isBest: true,
    pipeline: ['SimpleImputer(median)', 'RandomForestClassifier(n_estimators=200, class_weight="balanced", random_state=42)'],
    howItWorks:
      'Trains 200 independent decision trees on bootstrapped subsets of the training data and random feature subsets, then aggregates their probability votes for the final prediction.',
    projectRole:
      'Combines non-linear tree expressiveness with bagging variance reduction to achieve the highest Accuracy (95.67%), Precision (98.47%), F1-Score (97.13%), and ROC-AUC (0.991), correctly classifying 15,682 of 16,392 test hours.',
    strengths: ['Best overall F1-Score (97.13%) & Accuracy (95.67%)', 'Top Precision (98.47%) & ROC-AUC (0.991)', 'Robust to outliers & provides feature importances'],
    tradeoff: 'Higher compute footprint than a single tree, though still fast with n_jobs=-1.',
  },
];

// Exact evaluation metrics directly from `ds42222_(3).ipynb` (Cells 38-60)
export const MODEL_COMPARISON = [
  {
    id: 'lr',
    model: 'Logistic Regression',
    shortName: 'Logistic Reg.',
    trainAccuracy: 95.00,
    accuracy: 93.11,
    precision: 93.25,
    recall: 98.08,
    f1Score: 95.61,
    rocAuc: 0.983,
    rocAucPct: 98.28,
    exact: {
      accuracy: 93.1125,
      precision: 93.2519,
      recall: 98.0838,
      f1Score: 95.6068,
      rocAuc: 0.9828,
    },
    classReport: {
      normal: { precision: 0.93, recall: 0.77, f1: 0.84, support: 3867 },
      high: { precision: 0.93, recall: 0.98, f1: 0.96, support: 12525 },
      macroF1: 0.90,
      weightedF1: 0.93,
    },
    confusionMatrix: { tn: 2978, fp: 889, fn: 240, tp: 12285 },
    isBest: false,
  },
  {
    id: 'dt',
    model: 'Decision Tree',
    shortName: 'Decision Tree',
    trainAccuracy: 100.00,
    accuracy: 90.63,
    precision: 97.97,
    recall: 89.60,
    f1Score: 93.59,
    rocAuc: 0.918,
    rocAucPct: 91.79,
    exact: {
      accuracy: 90.6296,
      precision: 97.9659,
      recall: 89.5968,
      f1Score: 93.5947,
      rocAuc: 0.9179,
    },
    classReport: {
      normal: { precision: 0.74, recall: 0.94, f1: 0.83, support: 3867 },
      high: { precision: 0.98, recall: 0.90, f1: 0.94, support: 12525 },
      macroF1: 0.88,
      weightedF1: 0.91,
    },
    confusionMatrix: { tn: 3634, fp: 233, fn: 1303, tp: 11222 },
    isBest: false,
  },
  {
    id: 'rf',
    model: 'Random Forest',
    shortName: 'Random Forest',
    trainAccuracy: 100.00,
    accuracy: 95.67,
    precision: 98.47,
    recall: 95.82,
    f1Score: 97.13,
    rocAuc: 0.991,
    rocAucPct: 99.09,
    exact: {
      accuracy: 95.6686,
      precision: 98.4658,
      recall: 95.8244,
      f1Score: 97.1271,
      rocAuc: 0.9909,
    },
    classReport: {
      normal: { precision: 0.88, recall: 0.95, f1: 0.91, support: 3867 },
      high: { precision: 0.98, recall: 0.96, f1: 0.97, support: 12525 },
      macroF1: 0.94,
      weightedF1: 0.96,
    },
    confusionMatrix: { tn: 3680, fp: 187, fn: 523, tp: 12002 },
    isBest: true,
  },
];

// Exact Random Forest feature importances from `ds42222_(3).ipynb` (Cell 60)
export const RF_FEATURE_IMPORTANCE = [
  { feature: 'demand_mw', importance: 0.334798, pct: 33.48, category: 'Core Grid' },
  { feature: 'generation_mw', importance: 0.287570, pct: 28.76, category: 'Core Grid' },
  { feature: 'india_bheramara_hvdc', importance: 0.108735, pct: 10.87, category: 'Cross-Border Import' },
  { feature: 'india_tripura', importance: 0.049883, pct: 4.99, category: 'Cross-Border Import' },
  { feature: 'gas', importance: 0.047262, pct: 4.73, category: 'Fuel Source' },
  { feature: 'liquid_fuel', importance: 0.045054, pct: 4.51, category: 'Fuel Source' },
  { feature: 'coal', importance: 0.040601, pct: 4.06, category: 'Fuel Source' },
  { feature: 'Hour', importance: 0.037671, pct: 3.77, category: 'Temporal' },
  { feature: 'solar', importance: 0.015073, pct: 1.51, category: 'Renewable' },
  { feature: 'DayOfYear', importance: 0.014556, pct: 1.46, category: 'Temporal' },
  { feature: 'load_shedding', importance: 0.011180, pct: 1.12, category: 'Core Grid' },
  { feature: 'hydro', importance: 0.007617, pct: 0.76, category: 'Renewable' },
];
