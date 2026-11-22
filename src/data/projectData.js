// Ground-truth project metadata, preprocessing facts, and model evaluation metrics
// extracted directly from `ds42222_(4).ipynb` and `pgcb_V1_raw.csv`.

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
  forwardAlignedRows: 81960,
  cleanedRows: 73976,
  modelingFeatureCount: 12,
  duplicateRows: 0,
  duplicateDatetimes: 0,
  negativeValues: 0,
  infiniteValues: 0,
  dateRange: 'Apr 17, 2015 – Mar 08, 2026',
  highDemandThresholdMw: 9742,
  trainRows: 59180,
  testRows: 14796,
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
    { interval: '01:00:00 (Kept)', count: 73976, kept: true },
    { interval: '03:00:00', count: 4497, kept: false },
    { interval: '02:00:00', count: 3388, kept: false },
    { interval: '04:00:00+', count: 98, kept: false },
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
      'Exact date and time of each grid measurement. Converted to datetime, sorted chronologically, and used to enforce strict 1-hour continuity plus extract Hour and DayOfYear.',
  },
  {
    name: 'demand_mw',
    role: 'Primary Input Feature',
    category: 'Core Grid',
    unit: 'Megawatts (MW)',
    usedInX: true,
    description:
      'Total national electricity demand at the current timestamp. Strongest predictor of next-hour demand (r = 0.90 with Next_Hour_Demand; 33.29% RF importance).',
  },
  {
    name: 'generation_mw',
    role: 'Primary Input Feature',
    category: 'Core Grid',
    unit: 'Megawatts (MW)',
    usedInX: true,
    description:
      'Total electricity generated across the power system at that hour. Closely tracks grid supply capacity and ranks #2 in Random Forest feature importance (28.41%).',
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
      'Power produced by natural gas power plants — historically the largest domestic fuel source in Bangladesh (4.55% RF importance).',
  },
  {
    name: 'liquid_fuel',
    role: 'Generation Source',
    category: 'Fuel & Imports',
    unit: 'Megawatts (MW)',
    usedInX: true,
    description:
      'Electricity generated from HFO (heavy fuel oil) and HSD (diesel) plants, frequently dispatched as flexible peaking capacity when demand surges (4.47% RF importance).',
  },
  {
    name: 'coal',
    role: 'Generation Source',
    category: 'Fuel & Imports',
    unit: 'Megawatts (MW)',
    usedInX: true,
    description:
      'Baseload power supplied by coal-fired power stations. Exhibits a strong positive correlation with demand (r = 0.68) as new plants came online in recent years.',
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
      'Electricity imported from India through the Bheramara HVDC transmission link. Ranks #3 in Random Forest importance (11.38%) with r = 0.67 correlation to demand.',
  },
  {
    name: 'india_tripura',
    role: 'Cross-Border Import',
    category: 'Fuel & Imports',
    unit: 'Megawatts (MW)',
    usedInX: true,
    description:
      'Cross-border electricity imported via the Tripura transmission interconnection, ranking #4 in Random Forest importance (4.92%).',
  },
  {
    name: 'Hour',
    role: 'Engineered Feature',
    category: 'Temporal',
    unit: '0 – 23',
    usedInX: true,
    description:
      'Hour of the day extracted from datetime. Captures daily consumption cycles — peaking in the evening (~10,363 MW at 21:00) and contributing 3.99% RF importance.',
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
    detail: 'Verified 9 integer columns, 4 float columns, and 2 object columns covering Apr 2015 – Mar 2026.',
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
    title: 'Sort & Enforce Strict 1-Hr Continuity',
    badge: '73,976 Hourly Rows',
    summary: 'Sorted ascending by datetime and filtered both forward and backward 1-hour intervals.',
    detail: 'Aligned forward 1-hr pairs (81,960 rows), then removed remaining multi-hour prior gaps (2h/3h+) via time_diff == 1h to produce 73,976 strictly continuous hourly records.',
  },
  {
    step: 7,
    title: 'Create Leak-Free Next-Hour Target',
    badge: 'Threshold: 9,742 MW',
    summary: 'Computed the 75th-percentile threshold (9,742 MW) strictly on the 80% training split.',
    detail: 'Labeled High_Demand_Next_Hour = 1 when next-hour demand ≥ 9,742 MW (zero future leakage): 48,413 Normal (65.44%) vs 25,563 High (34.56%).',
  },
  {
    step: 8,
    title: 'Prepare Features for ML',
    badge: '12 Features · 80/20',
    summary: 'Extracted Hour & DayOfYear, selected 12 features, and split chronologically without shuffling.',
    detail: 'Train: 59,180 rows (80%) | Test: 14,796 rows (20%). Applied SimpleImputer(median) and StandardScaler (for LR) inside scikit-learn Pipelines.',
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
      'Serves as a fast, interpretable linear benchmark with minimal overfitting (94.68% train vs 92.68% test accuracy). With balanced class weights it flags 98.28% of high-demand hours, though linear boundaries still generate 889 false positives.',
    strengths: ['Highest Recall (98.28%)', 'Lowest Train–Test Gap (2.00%) & 0.981 ROC-AUC', 'Fast training & interpretable'],
    tradeoff: 'Produces 889 false positives (92.58% precision), trailing Random Forest on Accuracy and F1-Score.',
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
      'Captures non-linear relationships without feature scaling and reaches 97.36% precision (only 272 false alarms). However, memorizing training data (100% train vs 89.73% test) reveals clear overfitting and lowers recall to 88.95%.',
    strengths: ['High Precision (97.36%)', 'Captures non-linear thresholds', 'No scaling required'],
    tradeoff: 'Clear overfitting (100% train vs 89.73% test accuracy) and lowest ROC-AUC (0.906).',
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
      'Combines non-linear tree expressiveness with bagging variance reduction to achieve the highest Accuracy (95.47%), Precision (98.55%), F1-Score (96.98%), and ROC-AUC (0.990), correctly classifying 14,126 of 14,796 test hours.',
    strengths: ['Best overall F1-Score (96.98%) & Accuracy (95.47%)', 'Top Precision (98.55%) & ROC-AUC (0.990)', 'Robust to outliers & provides feature importances'],
    tradeoff: 'Higher compute footprint than a single tree, though still fast with n_jobs=-1.',
  },
];

// Exact evaluation metrics directly from `ds42222_(4).ipynb`
export const MODEL_COMPARISON = [
  {
    id: 'lr',
    model: 'Logistic Regression',
    shortName: 'Logistic Reg.',
    trainAccuracy: 94.68,
    accuracy: 92.68,
    precision: 92.58,
    recall: 98.28,
    f1Score: 95.34,
    rocAuc: 0.981,
    rocAucPct: 98.07,
    exact: {
      accuracy: 92.6805,
      precision: 92.5762,
      recall: 98.2801,
      f1Score: 95.3429,
      rocAuc: 0.9807,
    },
    classReport: {
      normal: { precision: 0.93, recall: 0.75, f1: 0.83, support: 3516 },
      high: { precision: 0.93, recall: 0.98, f1: 0.95, support: 11280 },
      macroF1: 0.89,
      weightedF1: 0.92,
    },
    confusionMatrix: { tn: 2627, fp: 889, fn: 194, tp: 11086 },
    isBest: false,
  },
  {
    id: 'dt',
    model: 'Decision Tree',
    shortName: 'Decision Tree',
    trainAccuracy: 100.00,
    accuracy: 89.73,
    precision: 97.36,
    recall: 88.95,
    f1Score: 92.96,
    rocAuc: 0.906,
    rocAucPct: 90.60,
    exact: {
      accuracy: 89.7337,
      precision: 97.3605,
      recall: 88.9450,
      f1Score: 92.9628,
      rocAuc: 0.9060,
    },
    classReport: {
      normal: { precision: 0.72, recall: 0.92, f1: 0.81, support: 3516 },
      high: { precision: 0.97, recall: 0.89, f1: 0.93, support: 11280 },
      macroF1: 0.87,
      weightedF1: 0.90,
    },
    confusionMatrix: { tn: 3244, fp: 272, fn: 1247, tp: 10033 },
    isBest: false,
  },
  {
    id: 'rf',
    model: 'Random Forest',
    shortName: 'Random Forest',
    trainAccuracy: 100.00,
    accuracy: 95.47,
    precision: 98.55,
    recall: 95.47,
    f1Score: 96.98,
    rocAuc: 0.990,
    rocAucPct: 99.01,
    exact: {
      accuracy: 95.4717,
      precision: 98.5450,
      recall: 95.4699,
      f1Score: 96.9831,
      rocAuc: 0.9901,
    },
    classReport: {
      normal: { precision: 0.87, recall: 0.95, f1: 0.91, support: 3516 },
      high: { precision: 0.99, recall: 0.95, f1: 0.97, support: 11280 },
      macroF1: 0.94,
      weightedF1: 0.96,
    },
    confusionMatrix: { tn: 3357, fp: 159, fn: 511, tp: 10769 },
    isBest: true,
  },
];

// Exact Random Forest feature importances from `ds42222_(4).ipynb` (Cell 65)
export const RF_FEATURE_IMPORTANCE = [
  { feature: 'demand_mw', importance: 0.332857, pct: 33.29, category: 'Core Grid' },
  { feature: 'generation_mw', importance: 0.284073, pct: 28.41, category: 'Core Grid' },
  { feature: 'india_bheramara_hvdc', importance: 0.113794, pct: 11.38, category: 'Cross-Border Import' },
  { feature: 'india_tripura', importance: 0.049164, pct: 4.92, category: 'Cross-Border Import' },
  { feature: 'gas', importance: 0.045470, pct: 4.55, category: 'Fuel Source' },
  { feature: 'liquid_fuel', importance: 0.044719, pct: 4.47, category: 'Fuel Source' },
  { feature: 'Hour', importance: 0.039889, pct: 3.99, category: 'Temporal' },
  { feature: 'coal', importance: 0.039738, pct: 3.97, category: 'Fuel Source' },
  { feature: 'solar', importance: 0.016052, pct: 1.61, category: 'Renewable' },
  { feature: 'DayOfYear', importance: 0.014127, pct: 1.41, category: 'Temporal' },
  { feature: 'load_shedding', importance: 0.012444, pct: 1.24, category: 'Core Grid' },
  { feature: 'hydro', importance: 0.007673, pct: 0.77, category: 'Renewable' },
];
