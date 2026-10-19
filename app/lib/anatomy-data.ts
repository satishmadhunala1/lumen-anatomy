export type OrganId =
  | "heart"
  | "brain"
  | "lungs"
  | "liver"
  | "kidneys"
  | "eyeball"
  | "intestine"
  | "pancreas"
  | "skin"
  | "stomach"
  | "spleen"
  | "thyroid"
  | "bladder"
  | "gallbladder"
  | "ear";

export type Hotspot = {
  id: string;
  label: string;
  detail: string;
  position: [number, number, number];
  color: string;
};

export type QuizQuestion = {
  prompt: string;
  choices: string[];
  answer: number;
  explain: string;
};

export type Flashcard = {
  front: string;
  back: string;
};

export type PathwayStep = {
  title: string;
  detail: string;
};

export type VitalStat = {
  label: string;
  value: string;
  unit?: string;
};

export type TimelineEvent = {
  stage: string;
  detail: string;
};

export type MythFact = {
  myth: string;
  fact: string;
};

export type Organ = {
  id: OrganId;
  name: string;
  scientificName: string;
  system: string;
  model: string;
  icon: string;
  accent: string;
  description: string;
  overview: string;
  poetic: string;
  size: string;
  weight: string;
  location: string;
  function: string;
  dailyFact: string;
  medical: string;
  bloodSupply: string;
  innervation: string;
  lymphatics: string;
  funFact: string;
  mnemonic: string;
  tissue: string;
  comparison: string;
  embryology: string;
  clinicalPearl: string;
  conditions: string[];
  structures: string[];
  vitals: VitalStat[];
  pathway: PathwayStep[];
  timeline: TimelineEvent[];
  myths: MythFact[];
  quiz: QuizQuestion[];
  flashcards: Flashcard[];
  hotspots: Hotspot[];
  illustrated: boolean;
  /** Image file extension under /anatomy/<id>/ (default webp). */
  imageExt?: "webp" | "jpg";
  /** False when no GLB ships — UI shows illustration + labels instead of Three.js. */
  hasModel: boolean;
  /** Extra teaching blurbs shown on the diagram stage. */
  labNotes?: string;
  /** Neighboring / related structures for context cards. */
  relations?: string[];
  /** Short scannable facts beyond vitals. */
  quickFacts?: string[];
  /** Per-structure explainers used by diagram callouts. */
  structuresExtra?: Record<string, string>;
  diagramCallouts?: { id: string; label: string; detail: string }[];
};

export type GlossaryTerm = {
  term: string;
  definition: string;
  organId?: OrganId;
};

export const bodySystems = [
  "Cardiovascular",
  "Nervous System",
  "Respiratory System",
  "Digestive System",
  "Urinary System",
  "Sensory System",
  "Endocrine System",
  "Integumentary System",
  "Lymphatic System",
] as const;

export type BodySystem = (typeof bodySystems)[number];

export const organs: Organ[] = [
  {
    id: "heart",
    name: "Heart",
    scientificName: "Cor",
    system: "Cardiovascular",
    model: "/models/heart.glb",
    icon: "♥",
    accent: "#ee7c6a",
    description: "A muscular pump that keeps blood circulating so oxygen and nutrients reach every tissue.",
    overview:
      "Four chambers, valves, and a dedicated coronary circulation work as one continuous pressure system. Electrical impulses from the sinoatrial node set the pace; the myocardium converts that signal into force.",
    poetic: "The tireless pump",
    size: "About the size of your fist",
    weight: "250–350 g",
    location: "Middle mediastinum, slightly left of midline",
    function: "Circulates oxygenated blood",
    dailyFact: "Beats about 100,000 times",
    medical: "Coronary perfusion happens mainly in diastole — when the heart muscle relaxes.",
    bloodSupply: "Left and right coronary arteries",
    innervation: "Cardiac plexus — sympathetic speed-up, vagus slow-down",
    lymphatics: "Drains toward tracheobronchial and mediastinal nodes",
    funFact: "It starts beating weeks before birth and may exceed 2.5 billion beats in a lifetime.",
    mnemonic: "Try before you buy — Tricuspid before Bicuspid (mitral) in blood flow order.",
    tissue: "Cardiac muscle tissue",
    comparison: "Heart vs. brain",
    embryology: "Forms from the cardiogenic mesoderm; looping creates left–right chamber layout.",
    clinicalPearl: "Left ventricular wall is thicker because systemic pressure is higher than pulmonary pressure.",
    conditions: ["Coronary artery disease", "Arrhythmia", "Valve disease", "Heart failure", "Cardiomyopathy", "Myocarditis", "Atrial fibrillation", "Congenital defects"],
    structures: ["Aorta", "Atria", "Ventricles", "Mitral valve", "Tricuspid valve", "Coronary arteries", "SA node", "Pericardium"],
    vitals: [
      { label: "Resting rate", value: "60–100", unit: "bpm" },
      { label: "Stroke volume", value: "~70", unit: "mL" },
      { label: "Cardiac output", value: "~5", unit: "L/min" },
      { label: "Lifetimely beats", value: "~100k", unit: "" },
    ],
    pathway: [
      { title: "Venous return", detail: "Deoxygenated blood enters the right atrium via venae cavae." },
      { title: "Right ventricle", detail: "Blood crosses the tricuspid valve and is pumped to the lungs." },
      { title: "Pulmonary exchange", detail: "Lungs oxygenate blood; pulmonary veins fill the left atrium." },
      { title: "Systemic push", detail: "Left ventricle ejects through the aortic valve to the body." },
    ],
    timeline: [
      { stage: "Week 3", detail: "Cardiogenic fields fuse into a primitive heart tube." },
      { stage: "Week 4", detail: "Heart looping establishes future chamber positions." },
      { stage: "Week 7–8", detail: "Septa and valves largely complete fetal architecture." },
      { stage: "Birth", detail: "Foramen ovale and ductus arteriosus begin closing as lungs inflate." },
    ],
    myths: [
      { myth: "The heart is on the left side only.", fact: "It sits centrally with the apex angled left — most mass is midline to left." },
      { myth: "Emotions live only in the heart.", fact: "Feelings are brain-driven; the heart responds via autonomic nerves and hormones." },
    ],
    quiz: [
      { prompt: "Which chamber pumps oxygenated blood to the body?", choices: ["Right atrium", "Left ventricle", "Right ventricle", "Left atrium"], answer: 1, explain: "The left ventricle drives systemic circulation." },
      { prompt: "What do coronary arteries supply?", choices: ["Lungs", "Brain", "Heart muscle", "Liver"], answer: 2, explain: "They feed the myocardium." },
      { prompt: "About how many beats per day?", choices: ["10,000", "50,000", "100,000", "1 million"], answer: 2, explain: "Roughly 100,000 beats daily at rest averages." },
      { prompt: "Where does the cardiac impulse usually begin?", choices: ["AV node", "SA node", "Purkinje fibers", "Mitral valve"], answer: 1, explain: "The sinoatrial node is the natural pacemaker." },
    ],
    flashcards: [
      { front: "Aorta", back: "Largest artery — carries oxygenated blood from the left ventricle." },
      { front: "Mitral valve", back: "Two-cusp valve between left atrium and left ventricle." },
      { front: "SA node", back: "Pacemaker cluster in the right atrial wall." },
      { front: "Stroke volume", back: "Blood ejected per beat — often ~70 mL at rest." },
    ],
    illustrated: true,
    hasModel: true,
    hotspots: [
      { id: "aorta", label: "Aorta", detail: "Main artery", position: [-0.35, 1.65, 0.55], color: "#ee7c6a" },
      { id: "left-atrium", label: "Left Atrium", detail: "Receives oxygenated blood", position: [0.82, 0.65, 0.5], color: "#f2a33b" },
      { id: "right-atrium", label: "Right Atrium", detail: "Receives venous blood", position: [-0.9, 0.35, 0.55], color: "#6393d8" },
      { id: "left-ventricle", label: "Left Ventricle", detail: "Pumps to the body", position: [0.7, -0.75, 0.65], color: "#f2a33b" },
      { id: "right-ventricle", label: "Right Ventricle", detail: "Pumps to the lungs", position: [-0.65, -0.68, 0.66], color: "#ee7c6a" },
      { id: "mitral", label: "Mitral Valve", detail: "Prevents backflow", position: [0.18, -1.35, 0.48], color: "#d89bc4" },
    ],
  },
  {
    id: "brain",
    name: "Brain",
    scientificName: "Encephalon",
    system: "Nervous System",
    model: "/models/brain.glb",
    icon: "◉",
    accent: "#c58696",
    description: "The command center for sensation, thought, emotion, memory, and precise movement.",
    overview:
      "Roughly 86 billion neurons form networks across cortex, deep nuclei, cerebellum, and brainstem. Protective meninges and cerebrospinal fluid cushion this high-energy organ.",
    poetic: "The universe within",
    size: "Roughly two clenched fists",
    weight: "1.3–1.4 kg",
    location: "Cranial cavity within the skull",
    function: "Processes and coordinates signals",
    dailyFact: "Uses about 20% of resting energy",
    medical: "Neurons communicate via electrical spikes and chemical synapses.",
    bloodSupply: "Internal carotid and vertebral arteries (Circle of Willis)",
    innervation: "Cranial nerves I–XII emerge from brain and brainstem",
    lymphatics: "Glymphatic clearance along perivascular spaces",
    funFact: "It has no pain receptors — headaches arise from surrounding tissues and vessels.",
    mnemonic: "Homunculus: hands and face claim oversized cortical real estate.",
    tissue: "Cerebral cortex",
    comparison: "Brain vs. eye",
    embryology: "Neural tube expands into forebrain, midbrain, and hindbrain vesicles.",
    clinicalPearl: "Stroke symptoms follow vascular territories — know MCA, ACA, PCA patterns.",
    conditions: ["Migraine", "Stroke", "Epilepsy", "TBI", "Meningitis", "MS", "Parkinson’s", "Aneurysm"],
    structures: ["Frontal lobe", "Parietal lobe", "Temporal lobe", "Occipital lobe", "Cerebellum", "Brainstem", "Corpus callosum", "Thalamus"],
    vitals: [
      { label: "Neurons", value: "~86", unit: "billion" },
      { label: "Energy share", value: "~20", unit: "%" },
      { label: "CSF volume", value: "~150", unit: "mL" },
      { label: "Blood flow", value: "~750", unit: "mL/min" },
    ],
    pathway: [
      { title: "Sense in", detail: "Sensory pathways reach thalamus, then cortex." },
      { title: "Integrate", detail: "Association areas combine memory, emotion, and goals." },
      { title: "Decide", detail: "Prefrontal circuits weigh options and plan action." },
      { title: "Act out", detail: "Motor cortex and cerebellum refine movement commands." },
    ],
    timeline: [
      { stage: "Week 3–4", detail: "Neural plate folds into the neural tube." },
      { stage: "Week 5", detail: "Primary brain vesicles appear." },
      { stage: "Fetal life", detail: "Cortical folding increases surface area dramatically." },
      { stage: "Childhood", detail: "Synaptic pruning and myelination sharpen circuits." },
    ],
    myths: [
      { myth: "We only use 10% of the brain.", fact: "Imaging shows widespread activity; most regions have known roles." },
      { myth: "Left-brained vs right-brained people.", fact: "Both hemispheres cooperate constantly; preferences are not half-brain labels." },
    ],
    quiz: [
      { prompt: "Which lobe handles planning and voluntary movement?", choices: ["Occipital", "Frontal", "Temporal", "Cerebellum"], answer: 1, explain: "Frontal lobe = executive + motor planning." },
      { prompt: "Energy share at rest?", choices: ["5%", "10%", "20%", "40%"], answer: 2, explain: "About one-fifth of resting metabolism." },
      { prompt: "Cerebellum mainly helps with…", choices: ["Vision", "Hormones", "Balance & coordination", "Digestion"], answer: 2, explain: "It fine-tunes movement timing and posture." },
      { prompt: "CSF mainly cushions and…", choices: ["Stores fat", "Clears metabolites", "Makes insulin", "Forms bile"], answer: 1, explain: "CSF supports buoyancy and chemical clearance." },
    ],
    flashcards: [
      { front: "Frontal lobe", back: "Planning, personality, voluntary motor control." },
      { front: "Temporal lobe", back: "Hearing, language comprehension, memory." },
      { front: "Cerebellum", back: "Balance, coordination, motor learning." },
      { front: "Circle of Willis", back: "Arterial ring that can reroute cerebral blood flow." },
    ],
    illustrated: true,
    hasModel: true,
    hotspots: [
      { id: "frontal", label: "Frontal Lobe", detail: "Planning & movement", position: [-0.7, 0.65, 0.8], color: "#ee7c6a" },
      { id: "parietal", label: "Parietal Lobe", detail: "Sensory integration", position: [0.15, 1.1, 0.65], color: "#f2a33b" },
      { id: "temporal", label: "Temporal Lobe", detail: "Memory & hearing", position: [0.75, -0.1, 0.82], color: "#6393d8" },
      { id: "cerebellum", label: "Cerebellum", detail: "Balance & coordination", position: [0.72, -0.9, 0.55], color: "#d89bc4" },
    ],
  },
  {
    id: "lungs",
    name: "Lungs",
    scientificName: "Pulmones",
    system: "Respiratory System",
    model: "/models/lungs.glb",
    icon: "◍",
    accent: "#dd8f8b",
    description: "Paired organs that exchange oxygen and carbon dioxide across an enormous alveolar surface.",
    overview:
      "Air travels trachea → bronchi → bronchioles → alveoli. The pulmonary circuit brings CO₂-rich blood for gas exchange; bronchial arteries feed lung tissue itself.",
    poetic: "The breath of life",
    size: "Each about 25 cm tall",
    weight: "~1 kg together",
    location: "Pleural cavities on either side of the heart",
    function: "Gas exchange",
    dailyFact: "Moves around 11,000 L of air",
    medical: "Alveolar surface area approximates a tennis court when unfolded.",
    bloodSupply: "Pulmonary + bronchial arteries",
    innervation: "Pulmonary plexus — parasympathetic bronchoconstriction",
    lymphatics: "Bronchopulmonary and tracheobronchial nodes",
    funFact: "Right lung has three lobes; left has two with a cardiac notch.",
    mnemonic: "Right lung = 3 lobes (R3); left leaves space for the heart.",
    tissue: "Alveolar epithelium",
    comparison: "Lungs vs. heart",
    embryology: "Foregut respiratory diverticulum branches into the bronchial tree.",
    clinicalPearl: "Type II pneumocytes secrete surfactant — critical for keeping alveoli open.",
    conditions: ["Asthma", "COPD", "Pneumonia", "PE", "Fibrosis", "Bronchitis", "CF", "Lung cancer"],
    structures: ["Trachea", "Bronchi", "Alveoli", "Pleura", "Diaphragm interface", "Pulmonary vessels"],
    vitals: [
      { label: "Tidal volume", value: "~500", unit: "mL" },
      { label: "Alveoli", value: "~300", unit: "million" },
      { label: "Daily air", value: "~11,000", unit: "L" },
      { label: "O₂ extraction", value: "~4–5", unit: "% pts" },
    ],
    pathway: [
      { title: "Inhale", detail: "Diaphragm descends; air rushes through upper airways." },
      { title: "Conduct", detail: "Bronchial tree distributes air to lobules." },
      { title: "Exchange", detail: "O₂ and CO₂ diffuse across alveolar–capillary membranes." },
      { title: "Exhale", detail: "Elastic recoil and muscle effort expel CO₂-rich air." },
    ],
    timeline: [
      { stage: "Week 4", detail: "Respiratory diverticulum appears." },
      { stage: "Canalicular", detail: "Airways expand; vasculature densifies." },
      { stage: "Saccular/alveolar", detail: "Gas-exchange surfaces mature late in gestation." },
      { stage: "Birth", detail: "First breaths clear fluid and inflate alveoli." },
    ],
    myths: [
      { myth: "You must force deep breaths constantly.", fact: "Quiet tidal breathing is efficient; over-breathing can cause dizziness." },
      { myth: "Lungs are hollow balloons.", fact: "They are spongy tissues packed with branching airways and capillaries." },
    ],
    quiz: [
      { prompt: "Right lung lobe count?", choices: ["1", "2", "3", "4"], answer: 2, explain: "Three lobes on the right." },
      { prompt: "Main gas-exchange site?", choices: ["Trachea", "Bronchi", "Alveoli", "Pleura"], answer: 2, explain: "Alveoli provide the exchange surface." },
      { prompt: "Gas primarily removed?", choices: ["O₂", "N₂", "CO₂", "He"], answer: 2, explain: "Carbon dioxide is exhaled waste." },
      { prompt: "Surfactant mainly prevents…", choices: ["Infection", "Alveolar collapse", "Heartburn", "Anemia"], answer: 1, explain: "It reduces surface tension." },
    ],
    flashcards: [
      { front: "Alveoli", back: "Microscopic sacs for O₂–CO₂ exchange." },
      { front: "Trachea", back: "Windpipe splitting into main bronchi." },
      { front: "Pleura", back: "Serous membranes enabling frictionless lung motion." },
      { front: "Diaphragm", back: "Primary muscle of quiet inspiration." },
    ],
    illustrated: true,
    hasModel: true,
    hotspots: [
      { id: "trachea", label: "Trachea", detail: "Carries air to the lungs", position: [0, 1.6, 0.2], color: "#6393d8" },
      { id: "right-lung", label: "Right Lung", detail: "Three lobes", position: [-1.2, 0.1, 0.7], color: "#ee7c6a" },
      { id: "left-lung", label: "Left Lung", detail: "Two lobes", position: [1.2, 0.1, 0.7], color: "#f2a33b" },
      { id: "bronchus", label: "Bronchus", detail: "Branching airway", position: [-0.03, 0.3, 0.35], color: "#d89bc4" },
      { id: "base", label: "Lung Base", detail: "Rests on diaphragm", position: [-1.14, -1.2, 1], color: "#7fa88a" },
    ],
  },
  {
    id: "liver",
    name: "Liver",
    scientificName: "Hepar",
    system: "Digestive System",
    model: "/models/liver.glb",
    icon: "≈",
    accent: "#b86858",
    description: "A metabolic hub that filters blood, processes nutrients, stores energy, and makes bile.",
    overview:
      "Dual blood supply (hepatic artery + portal vein) feeds lobules of hepatocytes. Bile produced here emulsifies fats downstream in the gut.",
    poetic: "The quiet alchemist",
    size: "About a football",
    weight: "1.4–1.6 kg",
    location: "Right upper quadrant, under the diaphragm",
    function: "Metabolism, detox, bile",
    dailyFact: "Performs 500+ chemical jobs",
    medical: "Remarkable regenerative capacity after partial loss or resection.",
    bloodSupply: "Hepatic artery + portal vein",
    innervation: "Hepatic plexus from celiac",
    lymphatics: "Hepatic nodes along porta hepatis",
    funFact: "It can regrow toward full size from a substantial remnant.",
    mnemonic: "Portal triad: artery, portal vein, bile duct at each lobule corner.",
    tissue: "Hepatic lobules",
    comparison: "Liver vs. intestine",
    embryology: "Hepatic diverticulum grows into the septum transversum.",
    clinicalPearl: "Portal hypertension reroutes blood through portosystemic anastomoses.",
    conditions: ["Fatty liver", "Hepatitis", "Cirrhosis", "Gallstones impact", "Haemochromatosis", "HCC", "AIH", "Portal HTN"],
    structures: ["Right lobe", "Left lobe", "Portal vein", "Hepatic artery", "Bile ducts", "Lobules", "IVC interface"],
    vitals: [
      { label: "Blood flow", value: "~1.5", unit: "L/min" },
      { label: "Functions", value: "500+", unit: "" },
      { label: "Bile/day", value: "~600–1000", unit: "mL" },
      { label: "Glycogen store", value: "~100", unit: "g" },
    ],
    pathway: [
      { title: "Absorb", detail: "Gut nutrients enter portal venous blood." },
      { title: "Process", detail: "Hepatocytes metabolize, store, or package molecules." },
      { title: "Detox", detail: "Enzymes transform drugs and wastes for clearance." },
      { title: "Export", detail: "Products exit via hepatic veins or bile canaliculi." },
    ],
    timeline: [
      { stage: "Week 4", detail: "Liver bud appears from foregut endoderm." },
      { stage: "Week 6–8", detail: "Hematopoiesis dominates early hepatic life." },
      { stage: "Late fetus", detail: "Metabolic roles expand as marrow takes over blood making." },
      { stage: "Adult", detail: "Lobular architecture supports continuous filtration." },
    ],
    myths: [
      { myth: "Only alcohol damages the liver.", fact: "Viral infection, fat, drugs, and genetics also cause major disease." },
      { myth: "Detox teas clean the liver.", fact: "Hepatocytes already run continuous biotransformation — evidence for miracle teas is weak." },
    ],
    quiz: [
      { prompt: "Nutrient-rich gut blood arrives via…", choices: ["Hepatic vein", "Portal vein", "Aorta", "Renal artery"], answer: 1, explain: "Portal vein feeds the liver first." },
      { prompt: "Regeneration means the liver can…", choices: ["Grow bones", "Regrow tissue", "Make insulin only", "Store O₂"], answer: 1, explain: "It regenerates substantial mass." },
      { prompt: "Bile mainly helps digest…", choices: ["Sugar", "Protein", "Fat", "Minerals"], answer: 2, explain: "Bile emulsifies fats." },
      { prompt: "Portal triad includes all except…", choices: ["Hepatic artery", "Portal vein", "Bile duct", "Ureter"], answer: 3, explain: "Ureter belongs to the urinary tract." },
    ],
    flashcards: [
      { front: "Portal vein", back: "Brings absorbed nutrients from the gut." },
      { front: "Hepatocyte", back: "Workhorse liver cell for metabolism and bile." },
      { front: "Bile", back: "Emulsifies fats; carries some wastes." },
      { front: "Lobule", back: "Hexagonal functional unit around a central vein." },
    ],
    illustrated: true,
    hasModel: true,
    hotspots: [
      { id: "right-lobe", label: "Right Lobe", detail: "Largest lobe", position: [-0.75, 0.35, 0.75], color: "#ee7c6a" },
      { id: "left-lobe", label: "Left Lobe", detail: "Crosses midline", position: [0.85, 0.25, 0.75], color: "#f2a33b" },
      { id: "portal", label: "Portal Vein", detail: "Nutrient inflow", position: [0.1, -0.3, 0.82], color: "#6393d8" },
    ],
  },
  {
    id: "kidneys",
    name: "Kidneys",
    scientificName: "Renes",
    system: "Urinary System",
    model: "/models/kidneys.glb",
    icon: "∞",
    accent: "#c96963",
    description: "Paired filters that balance fluid, electrolytes, blood pressure, and waste excretion.",
    overview:
      "Each kidney packs ~1 million nephrons. Filtration, reabsorption, and secretion sculpt urine while hormones like renin and erythropoietin influence pressure and red-cell production.",
    poetic: "The master filters",
    size: "Each ~ fist-of-a-mouse / computer mouse",
    weight: "120–170 g each",
    location: "Retroperitoneal, flanks below the ribs",
    function: "Filter blood & form urine",
    dailyFact: "Filters ~180 L of fluid",
    medical: "Only 1–2 L typically leave as urine — most filtrate is reclaimed.",
    bloodSupply: "Renal arteries",
    innervation: "Renal plexus — sympathetic vasomotor tone",
    lymphatics: "Lateral aortic (lumbar) nodes",
    funFact: "They help activate vitamin D into its active hormonal form.",
    mnemonic: "A+V+U at hilum: Artery, Vein, Ureter (anterior→posterior varies by text — learn your atlas).",
    tissue: "Renal cortex & medulla",
    comparison: "Kidneys vs. liver",
    embryology: "Metanephros becomes the definitive adult kidney.",
    clinicalPearl: "GFR decline is silent early — track creatinine and urine albumin.",
    conditions: ["Stones", "CKD", "UTI ascent", "Glomerulonephritis", "PKD", "Renal HTN", "AKI", "Nephrotic syndrome"],
    structures: ["Cortex", "Medulla", "Nephron", "Pelvis", "Ureter", "Renal artery", "Glomerulus"],
    vitals: [
      { label: "Nephrons", value: "~1", unit: "million each" },
      { label: "Filtrate/day", value: "~180", unit: "L" },
      { label: "Urine/day", value: "1–2", unit: "L" },
      { label: "Renal blood", value: "~20", unit: "% CO" },
    ],
    pathway: [
      { title: "Filter", detail: "Glomerulus pushes plasma into Bowman’s capsule." },
      { title: "Reclaim", detail: "Tubules reabsorb water, salts, glucose, amino acids." },
      { title: "Tune", detail: "Loop of Henle and collecting duct concentrate urine." },
      { title: "Export", detail: "Urine flows pelvis → ureter → bladder." },
    ],
    timeline: [
      { stage: "Pronephros", detail: "Transient early kidney scaffold." },
      { stage: "Mesonephros", detail: "Interim fetal kidney." },
      { stage: "Metanephros", detail: "Definitive kidney induced by ureteric bud." },
      { stage: "Childhood", detail: "Nephron function matures with growth." },
    ],
    myths: [
      { myth: "Everyone needs 8 glasses of water daily.", fact: "Needs vary with climate, activity, and health — urine color is a practical cue." },
      { myth: "Flank pain always means kidney infection.", fact: "Muscles, stones, and referred pain are common mimics." },
    ],
    quiz: [
      { prompt: "Filtering unit name?", choices: ["Alveolus", "Nephron", "Neuron", "Lobule"], answer: 1, explain: "Nephron is the functional unit." },
      { prompt: "Daily filtrate volume?", choices: ["1–2 L", "20 L", "180 L", "500 L"], answer: 2, explain: "About 180 liters filtered." },
      { prompt: "Kidney → bladder tube?", choices: ["Urethra", "Ureter", "Portal vein", "Bronchus"], answer: 1, explain: "Ureter connects kidney to bladder." },
      { prompt: "Hormone from kidney for RBCs?", choices: ["Insulin", "Erythropoietin", "Gastrin", "ADH only"], answer: 1, explain: "EPO stimulates marrow red-cell production." },
    ],
    flashcards: [
      { front: "Nephron", back: "Filter–reabsorb–secrete unit of the kidney." },
      { front: "Glomerulus", back: "Capillary tuft starting filtration." },
      { front: "Ureter", back: "Muscular tube to the bladder." },
      { front: "EPO", back: "Hormone signaling marrow to make red cells." },
    ],
    illustrated: true,
    hasModel: true,
    hotspots: [
      { id: "cortex", label: "Renal Cortex", detail: "Outer filtering layer", position: [-0.9, 0.55, 0.7], color: "#ee7c6a" },
      { id: "medulla", label: "Renal Medulla", detail: "Concentrates urine", position: [0.85, 0.2, 0.7], color: "#f2a33b" },
      { id: "ureter", label: "Ureter", detail: "Carries urine", position: [0.4, -1.1, 0.5], color: "#6393d8" },
    ],
  },
  {
    id: "eyeball",
    name: "Eye",
    scientificName: "Oculus",
    system: "Sensory System",
    model: "/models/eyeball.glb",
    icon: "⊙",
    accent: "#7294b9",
    description: "A precision optical organ that focuses light and converts it into neural vision signals.",
    overview:
      "Cornea and lens refract light onto the retina. Photoreceptors trigger bipolar and ganglion cells; axons exit as the optic nerve toward visual cortex.",
    poetic: "A window made of light",
    size: "~24 mm diameter",
    weight: "~7.5 g",
    location: "Bony orbit",
    function: "Capture & focus light",
    dailyFact: "Thousands of micro-saccades daily",
    medical: "Retina is CNS tissue — an extension of the brain.",
    bloodSupply: "Ophthalmic artery branches",
    innervation: "CN II (vision), III/IV/VI (muscles), V1 (sensation)",
    lymphatics: "Limited; fluid clears via uveoscleral and trabecular paths",
    funFact: "Cornea has no blood vessels — it breathes oxygen from air and tears.",
    mnemonic: "CN II sees; III, IV, VI move.",
    tissue: "Retinal layers",
    comparison: "Eye vs. brain",
    embryology: "Optic vesicles outpocket from diencephalon.",
    clinicalPearl: "Sudden flashes/floaters can signal retinal tear — urgent review.",
    conditions: ["Myopia", "Cataract", "Glaucoma", "AMD", "Detachment", "Dry eye", "Astigmatism", "Conjunctivitis"],
    structures: ["Cornea", "Iris", "Lens", "Retina", "Optic nerve", "Vitreous", "Ciliary body"],
    vitals: [
      { label: "Axial length", value: "~24", unit: "mm" },
      { label: "Blink rate", value: "15–20", unit: "/min" },
      { label: "Photoreceptors", value: "~100", unit: "million" },
      { label: "IOP normal", value: "10–21", unit: "mmHg" },
    ],
    pathway: [
      { title: "Refract", detail: "Cornea + lens bend rays onto the macula." },
      { title: "Transduce", detail: "Rods/cones convert photons to chemical signals." },
      { title: "Relay", detail: "Optic nerve → chiasm → tract → LGN." },
      { title: "Perceive", detail: "Visual cortex builds the scene you experience." },
    ],
    timeline: [
      { stage: "Week 4", detail: "Optic grooves/vesicles form." },
      { stage: "Week 5–8", detail: "Lens placode invaginates; layers organize." },
      { stage: "Fetal", detail: "Retinal vasculature and eyelids mature." },
      { stage: "Childhood", detail: "Visual acuity sharpens with cortical tuning." },
    ],
    myths: [
      { myth: "Sitting close to screens permanently ruins eyes.", fact: "It can strain focus; outdoor light time matters more for myopia risk in kids." },
      { myth: "Eating carrots gives night vision superpowers.", fact: "Vitamin A supports vision, but carrots won’t create superhuman sight." },
    ],
    quiz: [
      { prompt: "Strongest focusing surface?", choices: ["Iris", "Cornea", "Optic nerve", "Sclera"], answer: 1, explain: "Cornea does most refraction." },
      { prompt: "Iris controls…", choices: ["Blood flow", "Pupil size", "Tears only", "Bone growth"], answer: 1, explain: "Pupil aperture regulates light." },
      { prompt: "Signals leave via…", choices: ["Cornea", "Lens", "Optic nerve", "Choroid"], answer: 2, explain: "Optic nerve to brain." },
      { prompt: "Rods are best for…", choices: ["Color detail", "Dim light", "Focusing", "Tear film"], answer: 1, explain: "Rods dominate scotopic vision." },
    ],
    flashcards: [
      { front: "Cornea", back: "Clear front window; major refractive power." },
      { front: "Retina", back: "Photoreceptor lining converting light to signals." },
      { front: "Optic nerve", back: "CN II carrying visual axons." },
      { front: "IOP", back: "Intraocular pressure — elevated in many glaucomas." },
    ],
    illustrated: true,
    hasModel: true,
    hotspots: [
      { id: "cornea", label: "Cornea", detail: "Clear focusing surface", position: [-0.94, 0.05, 1.47], color: "#6393d8" },
      { id: "iris", label: "Iris", detail: "Controls light entry", position: [-1.22, -0.53, 1.15], color: "#f2a33b" },
      { id: "optic", label: "Optic Nerve", detail: "Carries visual signals", position: [1.61, -0.18, 0.54], color: "#d89bc4" },
    ],
  },
  {
    id: "intestine",
    name: "Intestine",
    scientificName: "Intestinum",
    system: "Digestive System",
    model: "/models/intestine.glb",
    icon: "§",
    accent: "#d78b77",
    description: "A long absorptive tube where nutrients enter the blood and the microbiome thrives.",
    overview:
      "Small intestine absorbs most nutrients; large intestine reclaimswater and ferments fiber. Folds, villi, and microvilli multiply surface area.",
    poetic: "The inner garden",
    size: "6–7 m extended (small) + colon",
    weight: "Varies with contents",
    location: "Central & lower abdomen",
    function: "Digestion & absorption",
    dailyFact: "Hosts trillions of microbes",
    medical: "Epithelium renews every few days — among the fastest turnovers.",
    bloodSupply: "SMA and IMA",
    innervation: "Enteric nervous system + autonomic input",
    lymphatics: "Lacteals → mesenteric nodes",
    funFact: "The enteric nervous system has hundreds of millions of neurons.",
    mnemonic: "DJ Ileum — Duodenum, Jejunum, Ileum order.",
    tissue: "Intestinal villi",
    comparison: "Intestine vs. liver",
    embryology: "Midgut herniates then returns, rotating into adult layout.",
    clinicalPearl: "Iron absorbs proximally; B12 needs ileum + intrinsic factor.",
    conditions: ["IBS", "IBD", "Celiac", "Diverticulitis", "Obstruction", "Polyps", "Crohn’s", "Lactose intolerance"],
    structures: ["Duodenum", "Jejunum", "Ileum", "Colon", "Villi", "Mesentery", "Appendix"],
    vitals: [
      { label: "Small bowel", value: "~6–7", unit: "m" },
      { label: "Surface area", value: "~30–40", unit: "m²" },
      { label: "Transit", value: "2–5", unit: "hrs small" },
      { label: "Microbes", value: "trillions", unit: "" },
    ],
    pathway: [
      { title: "Receive", detail: "Chyme enters duodenum with bile and enzymes." },
      { title: "Absorb", detail: "Jejunum/ileum take up nutrients via villi." },
      { title: "Reclaim", detail: "Colon recovers water and electrolytes." },
      { title: "Eliminate", detail: "Residue forms stool for excretion." },
    ],
    timeline: [
      { stage: "Week 5–6", detail: "Midgut loop herniates into cord." },
      { stage: "Week 10", detail: "Return and rotation complete." },
      { stage: "Birth", detail: "Feeding kickstarts motility and colonization." },
      { stage: "Adult", detail: "Microbiome composition shifts with diet." },
    ],
    myths: [
      { myth: "You must cleanse the colon monthly.", fact: "Healthy motility and fiber usually suffice; aggressive cleanses can harm." },
      { myth: "All bacteria in the gut are harmful.", fact: "Commensals aid vitamins, immunity, and barrier function." },
    ],
    quiz: [
      { prompt: "First small-intestine segment?", choices: ["Ileum", "Jejunum", "Duodenum", "Colon"], answer: 2, explain: "Duodenum is first." },
      { prompt: "Villi mainly increase…", choices: ["Muscle", "Surface area", "BP", "Bone"], answer: 1, explain: "More area = more absorption." },
      { prompt: "Colon’s major job?", choices: ["Insulin", "Water reclaim", "Filter blood", "Store bile"], answer: 1, explain: "Water/electrolyte recovery." },
      { prompt: "B12 absorption site?", choices: ["Stomach only", "Duodenum only", "Terminal ileum", "Rectum"], answer: 2, explain: "Ileum + IF needed." },
    ],
    flashcards: [
      { front: "Duodenum", back: "Mixes chyme with bile and pancreatic juice." },
      { front: "Villi", back: "Finger-like absorptive projections." },
      { front: "Colon", back: "Reclaims water; houses many microbes." },
      { front: "Enteric NS", back: "Gut’s intrinsic neural network." },
    ],
    illustrated: true,
    hasModel: true,
    hotspots: [
      { id: "duodenum", label: "Duodenum", detail: "First segment", position: [0.6, 0.8, 0.75], color: "#f2a33b" },
      { id: "jejunum", label: "Jejunum", detail: "Major absorption", position: [-0.45, 0.1, 0.82], color: "#ee7c6a" },
      { id: "colon", label: "Colon", detail: "Reclaims water", position: [0.75, -0.55, 0.72], color: "#6393d8" },
    ],
  },
  {
    id: "pancreas",
    name: "Pancreas",
    scientificName: "Pancreas",
    system: "Endocrine System",
    model: "/models/pancreas.glb",
    icon: "◈",
    accent: "#c69a5e",
    description: "A dual gland: enzymes for digestion and hormones for blood-sugar balance.",
    overview:
      "Exocrine acini make enzyme-rich juice; islets release insulin, glucagon, and more. The duct joins bile pathways near the duodenum.",
    poetic: "The quiet regulator",
    size: "~15 cm long",
    weight: "70–100 g",
    location: "Retroperitoneal, behind stomach",
    function: "Enzymes + insulin/glucagon",
    dailyFact: "~1.5 L enzyme juice",
    medical: "Islets are ~2% of mass but critical for glucose control.",
    bloodSupply: "Splenic + pancreaticoduodenal arteries",
    innervation: "Vagus and splanchnic fibers",
    lymphatics: "Pancreaticosplenic and pyloric nodes",
    funFact: "It is both endocrine and exocrine in one organ.",
    mnemonic: "Islets = Internal secretions; Acini = into the duct.",
    tissue: "Acini + islets",
    comparison: "Pancreas vs. liver",
    embryology: "Dorsal and ventral buds fuse into adult pancreas.",
    clinicalPearl: "Epigastric pain radiating to the back raises pancreatitis concern.",
    conditions: ["Pancreatitis", "T1DM", "Cancer", "T2DM impact", "Exocrine failure", "Cysts", "Gallstone pancreatitis", "Insulinoma"],
    structures: ["Head", "Body", "Tail", "Main duct", "Islets", "Acini", "Ampulla interface"],
    vitals: [
      { label: "Enzyme juice", value: "~1.5", unit: "L/day" },
      { label: "Islet mass", value: "~2", unit: "%" },
      { label: "Length", value: "~15", unit: "cm" },
      { label: "Insulin role", value: "↓ glucose", unit: "" },
    ],
    pathway: [
      { title: "Sense glucose", detail: "Islet β-cells detect rising blood sugar." },
      { title: "Release insulin", detail: "Insulin drives cellular glucose uptake." },
      { title: "Digest", detail: "Acinar enzymes enter duodenum with meals." },
      { title: "Balance", detail: "Glucagon raises glucose when levels fall." },
    ],
    timeline: [
      { stage: "Week 5", detail: "Pancreatic buds appear." },
      { stage: "Week 6–7", detail: "Buds fuse; duct systems connect." },
      { stage: "Fetal", detail: "Islets begin hormone production." },
      { stage: "Adult", detail: "Dual exocrine/endocrine workload continues." },
    ],
    myths: [
      { myth: "Sugar alone causes all diabetes.", fact: "Autoimmunity, insulin resistance, genetics, and lifestyle interact." },
      { myth: "The pancreas only makes insulin.", fact: "Most of it makes digestive enzymes." },
    ],
    quiz: [
      { prompt: "Insulin-making cells?", choices: ["Acinar", "Islets", "Kupffer", "Goblet"], answer: 1, explain: "Islets of Langerhans." },
      { prompt: "Most pancreatic tissue makes…", choices: ["Hormones", "Digestive enzymes", "Bile", "Urine"], answer: 1, explain: "Exocrine majority." },
      { prompt: "Head nestles against…", choices: ["Spleen", "Duodenum", "Trachea", "Bladder"], answer: 1, explain: "Duodenal C-loop." },
      { prompt: "Glucagon mainly…", choices: ["Lowers glucose", "Raises glucose", "Makes bile", "Forms urine"], answer: 1, explain: "Opposes insulin." },
    ],
    flashcards: [
      { front: "Islets", back: "Endocrine clusters (insulin, glucagon…)." },
      { front: "Acini", back: "Exocrine enzyme factories." },
      { front: "Main duct", back: "Delivers juice to the duodenum." },
      { front: "Insulin", back: "Hormone lowering blood glucose." },
    ],
    illustrated: true,
    hasModel: true,
    hotspots: [
      { id: "head", label: "Head", detail: "By duodenum", position: [-1.32, -0.36, 0.55], color: "#ee7c6a" },
      { id: "body", label: "Body", detail: "Crosses spine", position: [0.05, 0.25, 0.45], color: "#f2a33b" },
      { id: "tail", label: "Tail", detail: "Toward spleen", position: [1.55, 0.3, 0.35], color: "#6393d8" },
      { id: "duct", label: "Pancreatic Duct", detail: "Enzyme drain", position: [-0.61, 0.39, 0.5], color: "#d89bc4" },
    ],
  },
  {
    id: "skin",
    name: "Skin",
    scientificName: "Integumentum",
    system: "Integumentary System",
    model: "/models/skin.glb",
    icon: "▦",
    accent: "#c99277",
    description: "The largest organ — barrier, sensor, water retainer, and temperature regulator.",
    overview:
      "Epidermis protects; dermis hosts vessels, nerves, and glands; hypodermis cushions with fat. Melanin, immune cells, and microbiome add defense layers.",
    poetic: "The living boundary",
    size: "~1.5–2 m²",
    weight: "3.5–5 kg",
    location: "Entire body surface",
    function: "Protect, sense, thermoregulate",
    dailyFact: "Sheds ~500 million cells",
    medical: "First-line immune and sensory interface with the world.",
    bloodSupply: "Dermal plexuses",
    innervation: "Dense sensory endings + autonomic to glands/vessels",
    lymphatics: "Superficial and deep dermal nets",
    funFact: "A square centimetre can hold metres of vessels and many sweat glands.",
    mnemonic: "Come Let’s Get Sun Burned — epidermal layers (deep→superficial variants taught in class).",
    tissue: "Keratinized stratified epithelium",
    comparison: "Skin vs. intestine",
    embryology: "Surface ectoderm + mesenchyme build epidermis and dermis.",
    clinicalPearl: "ABCDE helps flag suspicious pigmented lesions.",
    conditions: ["Eczema", "Psoriasis", "Melanoma", "Acne", "Cellulitis", "Dermatitis", "Rosacea", "Vitiligo"],
    structures: ["Epidermis", "Dermis", "Hypodermis", "Follicle", "Sweat gland", "Sebaceous gland", "Receptors"],
    vitals: [
      { label: "Area", value: "~2", unit: "m²" },
      { label: "Weight share", value: "~15", unit: "% body" },
      { label: "Renewal", value: "~28", unit: "days" },
      { label: "Sweat glands", value: "2–4", unit: "million" },
    ],
    pathway: [
      { title: "Barrier", detail: "Stratum corneum limits water loss and microbes." },
      { title: "Sense", detail: "Mechanoreceptors and free endings report touch/pain." },
      { title: "Cool", detail: "Sweat + vessel dilation dump heat." },
      { title: "Repair", detail: "Inflammation → proliferation → remodeling after injury." },
    ],
    timeline: [
      { stage: "Week 4–5", detail: "Surface ectoderm begins epidermal program." },
      { stage: "Week 11+", detail: "Hair follicles and glands develop." },
      { stage: "Late fetus", detail: "Vernix and barrier lipids mature." },
      { stage: "Adult", detail: "Photoaging and repair capacity shift over decades." },
    ],
    myths: [
      { myth: "Tanning beds are a safe tan.", fact: "UV still damages DNA and raises cancer risk." },
      { myth: "Skin drinks moisturizers deep into organs.", fact: "Most products act in superficial layers." },
    ],
    quiz: [
      { prompt: "Outermost layer?", choices: ["Dermis", "Hypodermis", "Epidermis", "Fascia"], answer: 2, explain: "Epidermis is outer." },
      { prompt: "Cooling mainly via…", choices: ["Bile", "Sweat & blood flow", "Filtering", "Glycogen"], answer: 1, explain: "Evaporation + vasodilation." },
      { prompt: "Nerves/glands mostly in…", choices: ["Epidermis", "Dermis", "Nail only", "Enamel"], answer: 1, explain: "Dermis." },
      { prompt: "Melanin primarily…", choices: ["Stores fat", "Absorbs UV", "Makes insulin", "Forms urine"], answer: 1, explain: "UV protection pigment." },
    ],
    flashcards: [
      { front: "Epidermis", back: "Outer barrier continuously renewing." },
      { front: "Dermis", back: "Vessels, nerves, glands, collagen." },
      { front: "Hypodermis", back: "Fat cushion and insulation." },
      { front: "ABCDE", back: "Melanoma watch checklist." },
    ],
    illustrated: true,
    hasModel: true,
    hotspots: [
      { id: "epidermis", label: "Epidermis", detail: "Outer layer", position: [-0.05, 0.88, 1.4], color: "#ee7c6a" },
      { id: "dermis", label: "Dermis", detail: "Nerves & glands", position: [0.29, 0.05, 1.4], color: "#f2a33b" },
      { id: "hypodermis", label: "Hypodermis", detail: "Fat & insulation", position: [-0.39, -1.15, 1.4], color: "#6393d8" },
      { id: "follicle", label: "Hair Follicle", detail: "Anchors hair", position: [0.89, -0.44, 1.4], color: "#d89bc4" },
    ],
  },
  {
    id: "stomach",
    name: "Stomach",
    scientificName: "Ventriculus",
    system: "Digestive System",
    model: "",
    icon: "◎",
    accent: "#e08a5d",
    description: "A muscular sac that churns food, begins protein digestion, and meters chyme into the intestine.",
    overview:
      "Acid, pepsin, and strong muscular walls turn meals into chyme. Intrinsic factor from parietal cells is essential for later B12 absorption.",
    poetic: "The acid forge",
    size: "Empty ~30 cm long; volume expands with meals",
    weight: "Varies",
    location: "Left upper quadrant, under diaphragm",
    function: "Mechanical & chemical digestion",
    dailyFact: "Secretes 1–2 L of gastric juice",
    medical: "Mucus-bicarbonate barrier protects mucosa from its own acid.",
    bloodSupply: "Celiac trunk branches (gastric & gastroepiploic)",
    innervation: "Vagus (parasympathetic) + celiac plexus",
    lymphatics: "Gastric nodes along curvatures",
    funFact: "It can sterilize many microbes with low pH — but H. pylori adapted to live there.",
    mnemonic: "CARDIA → FUNDUS → BODY → PYLORUS along the meal path.",
    tissue: "Gastric glands & mucosa",
    comparison: "Stomach vs. intestine",
    embryology: "Fusiform foregut dilation rotates and creates greater/lesser curvatures.",
    clinicalPearl: "Coffee-ground emesis suggests upper GI bleeding until proven otherwise.",
    conditions: ["Gastritis", "Peptic ulcer", "GERD overlap", "H. pylori", "Gastroparesis", "Cancer", "Bleeding", "Outlet obstruction"],
    structures: ["Cardia", "Fundus", "Body", "Pylorus", "Rugae", "Parietal cells", "Chief cells"],
    vitals: [
      { label: "pH empty", value: "1.5–3.5", unit: "" },
      { label: "Juice/day", value: "1–2", unit: "L" },
      { label: "Emptying", value: "2–4", unit: "hrs mixed" },
      { label: "Capacity", value: "~1–1.5", unit: "L" },
    ],
    pathway: [
      { title: "Receive", detail: "Bolus enters via the cardia." },
      { title: "Acidify", detail: "Parietal cells secrete HCl; chief cells add pepsinogen." },
      { title: "Churn", detail: "Peristaltic waves mix into chyme." },
      { title: "Release", detail: "Pylorus meters chyme into duodenum." },
    ],
    timeline: [
      { stage: "Week 4", detail: "Foregut dilation begins." },
      { stage: "Week 7", detail: "Rotation establishes curvatures." },
      { stage: "Fetal", detail: "Glands differentiate; swallowing practice begins." },
      { stage: "Adult", detail: "Acid barrier and paced emptying continue lifelong." },
    ],
    myths: [
      { myth: "Ulcers come only from stress.", fact: "H. pylori and NSAIDs are leading causes; stress can worsen symptoms." },
      { myth: "Spicy food alone creates ulcers.", fact: "Spice may irritate; it rarely creates classic peptic ulcers alone." },
    ],
    quiz: [
      { prompt: "Intrinsic factor is needed for…", choices: ["Iron only", "B12 absorption", "Vitamin C", "Bile"], answer: 1, explain: "IF + ileum absorb B12." },
      { prompt: "Acid-making cells?", choices: ["Chief", "Parietal", "Goblet", "Islet"], answer: 1, explain: "Parietal cells make HCl." },
      { prompt: "Exit gate to intestine?", choices: ["Cardia", "Fundus", "Pylorus", "Cecum"], answer: 2, explain: "Pyloric sphincter." },
      { prompt: "Primary job of the stomach?", choices: ["Store minerals only", "Mechanical & chemical digestion", "Produce RBCs only", "Filter air only"], answer: 1, explain: "It churns and chemically digests meals into chyme." },
    ],
    flashcards: [
      { front: "Parietal cell", back: "Secretes HCl and intrinsic factor." },
      { front: "Chief cell", back: "Releases pepsinogen for protein digestion." },
      { front: "Pylorus", back: "Controls emptying into duodenum." },
      { front: "Rugae", back: "Folds allowing stomach expansion." },
      { front: "Gastrin", back: "Hormone from G cells that boosts acid secretion." },
      { front: "Mucous neck cells", back: "Help renew the protective mucus coat." },
    ],
    illustrated: true,
    imageExt: "jpg",
    hasModel: false,
    hotspots: [],
    labNotes: "Trace the meal path on the diagram: fundus stores, body mixes, pylorus meters outflow. Rugae flatten as the stomach fills.",
    relations: ["Esophagus (entry)", "Duodenum (exit)", "Liver & pancreas (nearby secretions)", "Left hemidiaphragm", "Splenic flexure region"],
    quickFacts: [
      "Empty resting volume is small; a meal can stretch it past a litre.",
      "Gastric lipase starts fat digestion even before the intestine.",
      "Vagus nerve boosts acid and motility during the cephalic phase.",
      "Retropulsion mixes chyme against a partially closed pylorus.",
    ],
    structuresExtra: {
      Cardia: "Entry zone where esophagus meets stomach; limits reflux.",
      Fundus: "Dome that stores gas and early meal portions.",
      Body: "Main mixing chamber with thick acid-producing mucosa.",
      Pylorus: "Gateway that times chyme release into the duodenum.",
      Rugae: "Mucosal folds that expand as volume rises.",
      "Parietal cells": "Make HCl and intrinsic factor for B12 later.",
      "Chief cells": "Release pepsinogen for protein breakdown.",
    },
    diagramCallouts: [
      { id: "st-fundus", label: "Fundus", detail: "Superior dome — stores swallowed air and early bolus." },
      { id: "st-body", label: "Body", detail: "Largest region; vigorous mixing and acid secretion." },
      { id: "st-pylorus", label: "Pylorus", detail: "Sphincter that meters acidic chyme into the duodenum." },
      { id: "st-lesser", label: "Lesser curvature", detail: "Shorter medial border facing the liver." },
      { id: "st-greater", label: "Greater curvature", detail: "Longer lateral border; gastroepiploic vessels run here." },
    ],
  },
  {
    id: "spleen",
    name: "Spleen",
    scientificName: "Lien",
    system: "Lymphatic System",
    model: "",
    icon: "⬡",
    accent: "#b4556d",
    description: "A soft lymphoid filter that recycles red cells, stores platelets, and mounts immune responses.",
    overview:
      "White pulp samples blood-borne antigens; red pulp removes aging erythrocytes. It is fragile but highly vascular — trauma can bleed dramatically.",
    poetic: "The blood librarian",
    size: "Fist-sized; ~12 cm long",
    weight: "150–200 g",
    location: "Left upper quadrant, under ribs 9–11",
    function: "Blood filter & immunity",
    dailyFact: "Surveys the entire blood volume repeatedly",
    medical: "Asplenia raises risk from encapsulated bacteria — vaccination matters.",
    bloodSupply: "Splenic artery (celiac)",
    innervation: "Celiac plexus fibers",
    lymphatics: "Splenic nodes → celiac nodes",
    funFact: "It can hold a reserve of platelets ready for bleeding emergencies.",
    mnemonic: "1,3,5,7,9,11 — odd numbers for size/weight/ribs mnemonic variants.",
    tissue: "Red & white pulp",
    comparison: "Spleen vs. lymph node",
    embryology: "Mesenchymal condensation in dorsal mesogastrium.",
    clinicalPearl: "Kehr’s sign: left shoulder pain can flag splenic rupture.",
    conditions: ["Splenomegaly", "Trauma rupture", "Infarct", "ITP involvement", "Portal HTN spleen", "Abscess", "Cysts", "Lymphoma staging"],
    structures: ["Hilum", "White pulp", "Red pulp", "Capsule", "Trabeculae", "Splenic artery"],
    vitals: [
      { label: "Length", value: "~12", unit: "cm" },
      { label: "Weight", value: "~150–200", unit: "g" },
      { label: "Blood flow", value: "high", unit: "" },
      { label: "Platelet store", value: "~30", unit: "% body" },
    ],
    pathway: [
      { title: "Enter", detail: "Arterial blood reaches white pulp follicles." },
      { title: "Screen", detail: "Immune cells inspect antigens in blood." },
      { title: "Cull", detail: "Red pulp macrophages clear aged RBCs." },
      { title: "Return", detail: "Cleaned blood exits via splenic vein to portal system." },
    ],
    timeline: [
      { stage: "Week 5", detail: "Splenic primordium appears." },
      { stage: "Fetal", detail: "Hematopoietic role is prominent early." },
      { stage: "Childhood", detail: "Immune filtering becomes dominant." },
      { stage: "Adult", detail: "Blood quality control continues quietly." },
    ],
    myths: [
      { myth: "You can live without immune protection after splenectomy.", fact: "Life continues, but encapsulated-bacteria risk rises — vaccines/education are key." },
      { myth: "The spleen only stores blood.", fact: "It also drives adaptive immune responses." },
    ],
    quiz: [
      { prompt: "Spleen primarily filters…", choices: ["Lymph only", "Blood", "Bile", "CSF"], answer: 1, explain: "It is a blood filter." },
      { prompt: "White pulp is for…", choices: ["RBC storage only", "Immune surveillance", "Bile", "Urine"], answer: 1, explain: "Lymphoid immune tissue." },
      { prompt: "Splenic vein drains toward…", choices: ["IVC directly", "Portal vein", "Aorta", "Renal pelvis"], answer: 1, explain: "Portal circulation." },
      { prompt: "Asplenia increases risk from…", choices: ["Encapsulated bacteria", "Only viruses", "Only fungi", "Prions only"], answer: 0, explain: "Classic encapsulated organism risk." },
    ],
    flashcards: [
      { front: "White pulp", back: "Lymphoid immune sampling of blood." },
      { front: "Red pulp", back: "Removes old red cells; platelet reservoir." },
      { front: "Hilum", back: "Gateway for vessels and nerves." },
      { front: "Kehr’s sign", back: "Shoulder tip pain from diaphragmatic irritation." },
      { front: "Splenic artery", back: "Tortuous celiac branch feeding the spleen." },
      { front: "PALS", back: "Periarteriolar lymphoid sheath in white pulp." },
    ],
    illustrated: true,
    imageExt: "jpg",
    hasModel: false,
    hotspots: [],
    labNotes: "On the diagram, vessels enter at the hilum. White pulp is immune sampling; red pulp recycles aged red cells.",
    relations: ["Stomach (gastrosplenic ligament)", "Tail of pancreas", "Left kidney / adrenal", "Diaphragm", "Colon (splenic flexure)"],
    quickFacts: [
      "Protected by ribs 9–11 on the left — trauma still risks rupture.",
      "About one-third of body platelets can sequester here.",
      "Removes inclusions from RBCs (pitting function).",
      "After splenectomy, Howell–Jolly bodies may appear on smear.",
    ],
    structuresExtra: {
      Hilum: "Medial gateway for splenic artery, vein, and nerves.",
      "White pulp": "Lymphoid sleeves that survey antigens in blood.",
      "Red pulp": "Cords and sinuses that cull worn erythrocytes.",
      Capsule: "Thin connective shell; tears easily in blunt trauma.",
      Trabeculae: "Internal struts carrying vessels into the parenchyma.",
      "Splenic artery": "High-flow vessel from the celiac trunk.",
    },
    diagramCallouts: [
      { id: "sp-capsule", label: "Capsule", detail: "Thin outer shell — fragile in trauma." },
      { id: "sp-white", label: "White pulp", detail: "Immune sampling tissue around central arterioles." },
      { id: "sp-red", label: "Red pulp", detail: "Filters and recycles aging red blood cells." },
      { id: "sp-hilum", label: "Hilum", detail: "Entry/exit for splenic vessels on the medial face." },
    ],
  },
  {
    id: "thyroid",
    name: "Thyroid",
    scientificName: "Glandula thyroidea",
    system: "Endocrine System",
    model: "",
    icon: "♢",
    accent: "#6ea8a0",
    description: "A butterfly-shaped gland that sets metabolic pace via T3/T4 hormones.",
    overview:
      "Follicles store thyroglobulin colloid. TSH from the pituitary drives hormone release. Parafollicular C cells secrete calcitonin, a calcium-related hormone.",
    poetic: "The metabolic metronome",
    size: "Each lobe ~4–5 cm",
    weight: "15–20 g",
    location: "Anterior neck, below laryngeal prominence",
    function: "Regulate metabolism",
    dailyFact: "Influences nearly every tissue’s energy use",
    medical: "Iodine is required to build thyroid hormones.",
    bloodSupply: "Superior & inferior thyroid arteries",
    innervation: "Autonomic + nearby recurrent laryngeal nerves (surgical relevance)",
    lymphatics: "Prelaryngeal, pretracheal, paratracheal nodes",
    funFact: "It stores weeks of hormone precursor in colloid — unusual for an endocrine gland.",
    mnemonic: "T3 is active; T4 is abundant precursor/prohormone partner.",
    tissue: "Thyroid follicles",
    comparison: "Thyroid vs. pancreas",
    embryology: "Descends from tongue base foramen cecum along thyroglossal path.",
    clinicalPearl: "Hoarseness after neck surgery may signal recurrent laryngeal nerve injury.",
    conditions: ["Hypothyroidism", "Hyperthyroidism", "Hashimoto’s", "Graves’", "Nodules", "Goiter", "Thyroiditis", "Cancer"],
    structures: ["Right lobe", "Left lobe", "Isthmus", "Follicles", "C cells", "Pyramidal lobe"],
    vitals: [
      { label: "Weight", value: "15–20", unit: "g" },
      { label: "Hormones", value: "T3/T4", unit: "" },
      { label: "Driver", value: "TSH", unit: "" },
      { label: "Iodine need", value: "essential", unit: "" },
    ],
    pathway: [
      { title: "TSH signal", detail: "Pituitary TSH stimulates follicular cells." },
      { title: "Build", detail: "Iodine + thyroglobulin create T3/T4." },
      { title: "Release", detail: "Hormones enter blood on binding proteins." },
      { title: "Act", detail: "Target cells adjust metabolic rate and growth signals." },
    ],
    timeline: [
      { stage: "Week 3–4", detail: "Thyroid diverticulum forms at tongue base." },
      { stage: "Week 7", detail: "Reaches neck destination." },
      { stage: "Fetal", detail: "Independent hormone synthesis begins." },
      { stage: "Adult", detail: "HPT axis fine-tunes output continuously." },
    ],
    myths: [
      { myth: "All weight change is thyroid disease.", fact: "Lifestyle, meds, and other endocrine axes matter — test, don’t assume." },
      { myth: "Neck lumps are always cancer.", fact: "Many nodules are benign; ultrasound risk features guide workup." },
    ],
    quiz: [
      { prompt: "Thyroid hormones mainly regulate…", choices: ["Vision", "Metabolism", "Hearing", "Balance only"], answer: 1, explain: "Metabolic rate control." },
      { prompt: "Element needed to build T3/T4?", choices: ["Iron", "Iodine", "Calcium", "Sodium only"], answer: 1, explain: "Dietary iodine." },
      { prompt: "TSH comes from the…", choices: ["Thyroid", "Pituitary", "Adrenal", "Pancreas"], answer: 1, explain: "Anterior pituitary." },
      { prompt: "C cells secrete…", choices: ["Insulin", "Calcitonin", "Pepsin", "ADH"], answer: 1, explain: "Calcitonin." },
    ],
    flashcards: [
      { front: "T3", back: "More active thyroid hormone." },
      { front: "T4", back: "More abundant circulating thyroid hormone." },
      { front: "TSH", back: "Pituitary signal driving thyroid output." },
      { front: "Isthmus", back: "Bridge connecting the two lobes." },
      { front: "Follicular cell", back: "Builds and releases T3/T4 from colloid." },
      { front: "Thyroglobulin", back: "Storage protein holding iodine-rich hormone precursor." },
    ],
    illustrated: true,
    imageExt: "jpg",
    hasModel: false,
    hotspots: [],
    labNotes: "Butterfly shape: two lobes joined by the isthmus over the trachea. Follicles store colloid until TSH signals release.",
    relations: ["Trachea", "Larynx / cricoid", "Parathyroid glands (posterior)", "Recurrent laryngeal nerves", "Carotid sheath laterally"],
    quickFacts: [
      "Needs dietary iodine to assemble thyroid hormones.",
      "Stores weeks of hormone precursor in follicular colloid.",
      "HPT axis: hypothalamus → pituitary TSH → thyroid T3/T4.",
      "A pyramidal lobe may persist along the thyroglossal path.",
    ],
    structuresExtra: {
      "Right lobe": "Larger lateral wing wrapping the trachea.",
      "Left lobe": "Mirror wing on the opposite side.",
      Isthmus: "Narrow bridge usually over tracheal rings 2–4.",
      Follicles: "Spheres of epithelial cells around colloid stores.",
      "C cells": "Parafollicular cells secreting calcitonin.",
      "Pyramidal lobe": "Optional midline remnant from embryonic descent.",
    },
    diagramCallouts: [
      { id: "th-left", label: "Left lobe", detail: "Lateral wing of endocrine tissue." },
      { id: "th-right", label: "Right lobe", detail: "Counterpart wing wrapping the airway." },
      { id: "th-isthmus", label: "Isthmus", detail: "Bridge linking the lobes across the trachea." },
      { id: "th-trachea", label: "Trachea", detail: "Airway guide behind/under the gland." },
    ],
  },
  {
    id: "bladder",
    name: "Bladder",
    scientificName: "Vesica urinaria",
    system: "Urinary System",
    model: "",
    icon: "◯",
    accent: "#7aa2c4",
    description: "A stretchy muscular reservoir that stores urine and empties under voluntary–involuntary teamwork.",
    overview:
      "Ureters fill the bladder; detrusor contracts to void while sphincters coordinate continence. Transitional epithelium (urothelium) tolerates stretch and urine chemistry.",
    poetic: "The patient reservoir",
    size: "Capacity often 400–600 mL",
    weight: "Empty ~50 g",
    location: "True pelvis, behind pubic symphysis",
    function: "Store & void urine",
    dailyFact: "Fills and empties multiple times per day",
    medical: "Continence needs brain, spinal, and peripheral nerve cooperation.",
    bloodSupply: "Superior & inferior vesical arteries",
    innervation: "Pelvic splanchnics (parasymp), hypogastric (symp), pudendal (somatic)",
    lymphatics: "External/internal iliac nodes",
    funFact: "Urothelium can unfold dramatically as volume rises without leaking.",
    mnemonic: "Fill quietly (sympathetic storage), empty on cue (parasympathetic voiding).",
    tissue: "Urothelium + detrusor",
    comparison: "Bladder vs. kidneys",
    embryology: "Cloaca partitions into urogenital sinus contributions.",
    clinicalPearl: "Painless hematuria needs evaluation for malignancy risk factors.",
    conditions: ["UTI", "Overactive bladder", "Retention", "Stones", "Interstitial cystitis", "Cancer", "Incontinence", "Neurogenic bladder"],
    structures: ["Detrusor", "Trigone", "Ureteric orifices", "Internal sphincter region", "Urethra start", "Urothelium"],
    vitals: [
      { label: "Capacity", value: "400–600", unit: "mL" },
      { label: "First urge", value: "~150–200", unit: "mL" },
      { label: "Voids/day", value: "4–7", unit: "" },
      { label: "Wall", value: "detrusor", unit: "" },
    ],
    pathway: [
      { title: "Fill", detail: "Ureters deliver urine in spurts." },
      { title: "Sense", detail: "Stretch receptors signal filling to the CNS." },
      { title: "Decide", detail: "Brain permits voiding when socially appropriate." },
      { title: "Empty", detail: "Detrusor contracts; sphincters relax." },
    ],
    timeline: [
      { stage: "Embryo", detail: "Urogenital sinus contributes bladder scaffold." },
      { stage: "Fetal", detail: "Kidneys produce urine that fills amniotic fluid cycle." },
      { stage: "Childhood", detail: "Continence pathways mature." },
      { stage: "Adult", detail: "Storage/voiding reflexes remain plastic with training." },
    ],
    myths: [
      { myth: "Holding urine always damages kidneys immediately.", fact: "Occasional delay is common; chronic retention or obstruction is the real danger." },
      { myth: "Cranberry cures every UTI.", fact: "Evidence is mixed; medical assessment still matters." },
    ],
    quiz: [
      { prompt: "Bladder muscle name?", choices: ["Myocardium", "Detrusor", "Diaphragm", "Masseter"], answer: 1, explain: "Detrusor urinates." },
      { prompt: "Typical adult capacity?", choices: ["50 mL", "150 mL", "400–600 mL", "2 L"], answer: 2, explain: "Hundreds of milliliters." },
      { prompt: "Trigone is…", choices: ["A lobe of liver", "Triangle between ureter orifices & urethra", "A lung fissure", "A bone"], answer: 1, explain: "Smooth trigone region." },
      { prompt: "Parasympathetic role in voiding?", choices: ["Store only", "Contract detrusor", "Make bile", "Filter plasma"], answer: 1, explain: "Pelvic parasympathetics drive voiding." },
    ],
    flashcards: [
      { front: "Detrusor", back: "Smooth muscle that contracts to void." },
      { front: "Trigone", back: "Stable triangular region of the bladder floor." },
      { front: "Urothelium", back: "Stretch-tolerant lining of the urinary tract." },
      { front: "Continence", back: "Sphincter + neural control keeping urine in." },
      { front: "Internal sphincter", back: "Smooth-muscle tone at bladder neck (involuntary)." },
      { front: "External sphincter", back: "Skeletal muscle under pudendal control (voluntary)." },
    ],
    illustrated: true,
    imageExt: "jpg",
    hasModel: false,
    hotspots: [],
    labNotes: "Ureters enter the trigone; detrusor forms the wall; urethra exits inferiorly. Stretch receptors report filling to the CNS.",
    relations: ["Ureters", "Urethra", "Pubic symphysis", "Prostate (male) / pelvic floor (female)", "Rectum (posterior relations vary)"],
    quickFacts: [
      "First desire to void often appears around 150–200 mL.",
      "Urothelium unfolds instead of tearing as volume rises.",
      "Storage is mainly sympathetic; voiding is parasympathetic + sphincter relaxation.",
      "Painless visible blood in urine always deserves clinical evaluation.",
    ],
    structuresExtra: {
      Detrusor: "Smooth-muscle wall that contracts to empty.",
      Trigone: "Fixed triangle between ureter orifices and urethral opening.",
      "Ureteric orifices": "Slit-like entries that help prevent reflux.",
      "Internal sphincter region": "Bladder-neck tone aiding storage.",
      "Urethra start": "Outlet channel beginning at the bladder neck.",
      Urothelium: "Specialized lining tolerant of stretch and urine.",
    },
    diagramCallouts: [
      { id: "bl-ureter", label: "Ureter", detail: "Delivers urine in peristaltic spurts." },
      { id: "bl-detrusor", label: "Detrusor", detail: "Muscular wall that contracts during voiding." },
      { id: "bl-trigone", label: "Trigone", detail: "Stable floor triangle — infection often symptomatic here." },
      { id: "bl-urethra", label: "Urethra", detail: "Exit pathway controlled by sphincters." },
    ],
  },
  {
    id: "gallbladder",
    name: "Gallbladder",
    scientificName: "Vesica biliaris",
    system: "Digestive System",
    model: "",
    icon: "◐",
    accent: "#c4a35a",
    description: "A small sac that stores and concentrates bile, releasing it when fatty meals arrive.",
    overview:
      "Hepatic bile fills the gallbladder between meals. CCK triggers contraction so bile flows through the cystic duct into the common bile duct and duodenum.",
    poetic: "The bile vault",
    size: "7–10 cm long pear shape",
    weight: "~30–50 g when full-ish",
    location: "Undersurface of the liver",
    function: "Store & concentrate bile",
    dailyFact: "Can concentrate bile 5–10×",
    medical: "Not essential for life — bile can flow directly from liver if removed.",
    bloodSupply: "Cystic artery (usually from right hepatic)",
    innervation: "Celiac plexus; phrenic referred pain possible",
    lymphatics: "Cystic node at Calot’s triangle region",
    funFact: "After cholecystectomy, many people digest well with steadier hepatic bile drip.",
    mnemonic: "Calot’s triangle — know cystic duct, common hepatic duct, liver edge landmarks.",
    tissue: "Mucosal folds & muscularis",
    comparison: "Gallbladder vs. liver",
    embryology: "Hepatic diverticulum caudal part forms gallbladder and cystic duct.",
    clinicalPearl: "Fatty-meal RUQ pain radiating to scapula is a classic biliary colic story.",
    conditions: ["Cholelithiasis", "Cholecystitis", "Biliary colic", "Choledocholithiasis", "Polyps", "Empyema", "Cancer rare", "Post-cholecystectomy syndrome"],
    structures: ["Fundus", "Body", "Neck", "Cystic duct", "Hartmann’s pouch", "Mucosal folds"],
    vitals: [
      { label: "Capacity", value: "30–50", unit: "mL" },
      { label: "Concentrate", value: "5–10×", unit: "" },
      { label: "Trigger", value: "CCK", unit: "" },
      { label: "Length", value: "7–10", unit: "cm" },
    ],
    pathway: [
      { title: "Fill", detail: "Hepatic bile enters via cystic duct between meals." },
      { title: "Concentrate", detail: "Water/electrolytes absorbed; bile salts densify." },
      { title: "Signal", detail: "Fatty chyme → CCK release." },
      { title: "Eject", detail: "Gallbladder contracts; bile reaches duodenum." },
    ],
    timeline: [
      { stage: "Week 4", detail: "Hepatic diverticulum appears." },
      { stage: "Later embryo", detail: "Cystic duct/gallbladder bud distinct." },
      { stage: "Fetal", detail: "Biliary tree canalizes." },
      { stage: "Adult", detail: "Meal-timed bile release continues." },
    ],
    myths: [
      { myth: "Everyone with stones needs emergency surgery.", fact: "Asymptomatic stones are often observed; symptomatic disease is treated selectively." },
      { myth: "No gallbladder means no digestion.", fact: "Most adapt; bile still reaches the gut from the liver." },
    ],
    quiz: [
      { prompt: "Gallbladder stores…", choices: ["Insulin", "Bile", "Urine", "CSF"], answer: 1, explain: "Bile reservoir." },
      { prompt: "Hormone triggering contraction?", choices: ["TSH", "CCK", "EPO", "ADH"], answer: 1, explain: "Cholecystokinin." },
      { prompt: "Connects gallbladder to bile duct?", choices: ["Ureter", "Cystic duct", "Bronchus", "Portal vein"], answer: 1, explain: "Cystic duct." },
      { prompt: "Classic pain location?", choices: ["Left calf", "RUQ", "Forehead", "Big toe only"], answer: 1, explain: "Right upper quadrant." },
    ],
    flashcards: [
      { front: "CCK", back: "Hormone that contracts the gallbladder." },
      { front: "Cystic duct", back: "Gateway between gallbladder and common duct." },
      { front: "Bile salts", back: "Emulsify dietary fats." },
      { front: "Cholelithiasis", back: "Gallstones within the gallbladder." },
      { front: "Hartmann’s pouch", back: "Infundibulum where stones often lodge." },
      { front: "Calot’s triangle", back: "Surgical landmark bounded by cystic duct, common hepatic duct, and liver." },
    ],
    illustrated: true,
    imageExt: "jpg",
    hasModel: false,
    hotspots: [],
    labNotes: "Pear-shaped sac under the liver: fundus, body, neck → cystic duct. Concentrates bile between meals; CCK triggers ejection.",
    relations: ["Liver visceral surface", "Common hepatic / bile duct", "Duodenum nearby", "Transverse colon below", "Cystic artery"],
    quickFacts: [
      "Concentrates bile 5–10× by absorbing water and electrolytes.",
      "Not required for life — hepatic bile can drip continuously after removal.",
      "Cholesterol stones are the most common type in many populations.",
      "Fatty meals are classic triggers for biliary colic.",
    ],
    structuresExtra: {
      Fundus: "Rounded tip that may project below the liver edge.",
      Body: "Main storage chamber against the liver bed.",
      Neck: "Tapers toward the cystic duct; stones lodge here.",
      "Cystic duct": "Spiral valve pathway into the common bile duct.",
      "Hartmann’s pouch": "Infundibular outpouching — stone hotspot.",
      "Mucosal folds": "Help absorb water while storing bile.",
    },
    diagramCallouts: [
      { id: "gb-fundus", label: "Fundus", detail: "Blind tip of the pear — often where imaging finds stones." },
      { id: "gb-body", label: "Body", detail: "Main reservoir against the liver undersurface." },
      { id: "gb-neck", label: "Neck", detail: "Narrowing toward the cystic duct." },
      { id: "gb-duct", label: "Cystic duct", detail: "Outbound path joining the bile duct system." },
    ],
  },
  {
    id: "ear",
    name: "Ear",
    scientificName: "Auris",
    system: "Sensory System",
    model: "",
    icon: "☽",
    accent: "#8b7ec8",
    description: "A hearing and balance organ that turns air vibration and head motion into neural signals.",
    overview:
      "Outer ear funnels sound; middle ear ossicles amplify; inner ear cochlea transduces frequency. Semicircular canals and otolith organs sense rotation and gravity.",
    poetic: "The chamber of echoes",
    size: "Cochlea ~pea-sized spiral",
    weight: "Tiny ossicles weigh milligrams",
    location: "Temporal bone + auricle on the side of the head",
    function: "Hearing & equilibrium",
    dailyFact: "Detects frequencies from ~20 Hz to 20 kHz (youthful range)",
    medical: "Hair cells do not robustly regenerate in humans — protect from loud noise.",
    bloodSupply: "Labyrinthine artery (usually AICA branch)",
    innervation: "CN VIII (vestibulocochlear); CN VII travels nearby",
    lymphatics: "Limited; middle ear relates to mastoid air cells",
    funFact: "The stapes is the smallest bone in the human body.",
    mnemonic: "MIS — Malleus, Incus, Stapes ossicle order.",
    tissue: "Hair cells & endolymphatic spaces",
    comparison: "Ear vs. eye",
    embryology: "Pharyngeal arches contribute ossicles; otic placode forms inner ear.",
    clinicalPearl: "Sudden sensorineural hearing loss is an otologic emergency.",
    conditions: ["Otitis media", "Otitis externa", "Noise damage", "Meniere’s", "BPPV", "Otosclerosis", "Tinnitus", "Cholesteatoma"],
    structures: ["Auricle", "Canal", "Tympanic membrane", "Ossicles", "Cochlea", "Semicircular canals", "Vestibule"],
    vitals: [
      { label: "Hearing range", value: "20–20k", unit: "Hz" },
      { label: "Ossicles", value: "3", unit: "" },
      { label: "Canals", value: "3", unit: "each side" },
      { label: "CN", value: "VIII", unit: "" },
    ],
    pathway: [
      { title: "Capture", detail: "Auricle and canal guide sound waves." },
      { title: "Amplify", detail: "Tympanic membrane + ossicles boost vibration." },
      { title: "Transduce", detail: "Cochlear hair cells fire on basilar-membrane motion." },
      { title: "Balance", detail: "Vestibular organs report head acceleration." },
    ],
    timeline: [
      { stage: "Week 4", detail: "Otic placode invaginates." },
      { stage: "Week 6–8", detail: "Ossicle cartilages form from arches." },
      { stage: "Fetal", detail: "Inner ear reaches near-adult size early." },
      { stage: "Childhood", detail: "Auditory cortex tunes to language." },
    ],
    myths: [
      { myth: "Cotton swabs clean ears safely.", fact: "They often push wax deeper and risk canal/drum injury." },
      { myth: "Hearing always recovers after loud concerts.", fact: "Temporary threshold shift can become permanent damage." },
    ],
    quiz: [
      { prompt: "Smallest ossicle?", choices: ["Malleus", "Incus", "Stapes", "Hyoid"], answer: 2, explain: "Stapes." },
      { prompt: "Hearing nerve?", choices: ["CN II", "CN V", "CN VII", "CN VIII"], answer: 3, explain: "Vestibulocochlear." },
      { prompt: "Cochlea is for…", choices: ["Balance only", "Hearing transduction", "Smell", "Taste"], answer: 1, explain: "Auditory transduction." },
      { prompt: "BPPV involves…", choices: ["Liver stones", "Otoconia in canals", "Gastric acid", "Skin melanin"], answer: 1, explain: "Displaced crystals." },
    ],
    flashcards: [
      { front: "Malleus", back: "Hammer ossicle on the eardrum." },
      { front: "Cochlea", back: "Spiral organ of hearing." },
      { front: "Semicircular canals", back: "Sense rotational head movement." },
      { front: "CN VIII", back: "Carries hearing and balance signals." },
      { front: "Incus", back: "Anvil ossicle between malleus and stapes." },
      { front: "Eustachian tube", back: "Equalizes middle-ear pressure with the nasopharynx." },
    ],
    illustrated: true,
    imageExt: "jpg",
    hasModel: false,
    hotspots: [],
    labNotes: "Outer ear captures sound → canal → drum → ossicles amplify → cochlea transduces. Semicircular canals handle rotation sense.",
    relations: ["Temporal bone", "CN VII (nearby facial nerve)", "Nasopharynx via Eustachian tube", "Mastoid air cells", "TMJ region externally"],
    quickFacts: [
      "Youthful hearing roughly spans 20 Hz–20 kHz.",
      "Stapes is the smallest bone in the human body.",
      "Hair cells do not robustly regenerate — protect from loud noise.",
      "BPPV comes from displaced otoconia in a semicircular canal.",
    ],
    structuresExtra: {
      Auricle: "Cartilage funnel that collects and shapes sound.",
      Canal: "Skin-lined tube directing waves to the drum.",
      "Tympanic membrane": "Eardrum converting air waves to mechanical motion.",
      Ossicles: "Malleus–incus–stapes chain amplifying vibration.",
      Cochlea: "Fluid spiral where hair cells encode pitch.",
      "Semicircular canals": "Three loops sensing head rotation.",
      Vestibule: "Otolith organs sensing gravity and linear accel.",
    },
    diagramCallouts: [
      { id: "ear-auricle", label: "Auricle", detail: "Outer funnel collecting sound waves." },
      { id: "ear-canal", label: "Canal", detail: "Passage to the tympanic membrane." },
      { id: "ear-drum", label: "Drum", detail: "Tympanic membrane starting mechanical transduction." },
      { id: "ear-cochlea", label: "Cochlea", detail: "Spiral organ turning vibration into nerve signals." },
      { id: "ear-canals", label: "Canals", detail: "Semicircular canals for rotational balance." },
    ],
  },
];

export const organById = Object.fromEntries(organs.map((organ) => [organ.id, organ])) as Record<OrganId, Organ>;

export const glossary: GlossaryTerm[] = [
  { term: "Anterior", definition: "Toward the front of the body." },
  { term: "Posterior", definition: "Toward the back of the body." },
  { term: "Medial", definition: "Closer to the midline." },
  { term: "Lateral", definition: "Farther from the midline." },
  { term: "Superior", definition: "Above / toward the head." },
  { term: "Inferior", definition: "Below / toward the feet." },
  { term: "Proximal", definition: "Closer to the trunk or origin." },
  { term: "Distal", definition: "Farther from the trunk or origin." },
  { term: "Lumen", definition: "Open channel inside a tube or vessel." },
  { term: "Homeostasis", definition: "Keeping internal conditions stable." },
  { term: "Perfusion", definition: "Blood delivery to tissue capillaries.", organId: "heart" },
  { term: "Synapse", definition: "Neuron-to-cell communication junction.", organId: "brain" },
  { term: "Alveolus", definition: "Lung air sac for gas exchange.", organId: "lungs" },
  { term: "Hepatocyte", definition: "Primary liver cell.", organId: "liver" },
  { term: "Nephron", definition: "Kidney filtering unit.", organId: "kidneys" },
  { term: "Retina", definition: "Light-sensing lining of the eye.", organId: "eyeball" },
  { term: "Villus", definition: "Intestinal absorptive projection.", organId: "intestine" },
  { term: "Insulin", definition: "Pancreatic hormone lowering glucose.", organId: "pancreas" },
  { term: "Epidermis", definition: "Outer skin layer.", organId: "skin" },
  { term: "Pepsin", definition: "Gastric enzyme that digests protein.", organId: "stomach" },
  { term: "White pulp", definition: "Immune tissue inside the spleen.", organId: "spleen" },
  { term: "TSH", definition: "Pituitary hormone driving the thyroid.", organId: "thyroid" },
  { term: "Detrusor", definition: "Bladder muscle for voiding.", organId: "bladder" },
  { term: "CCK", definition: "Hormone contracting the gallbladder.", organId: "gallbladder" },
  { term: "Stapes", definition: "Smallest ossicle of the middle ear.", organId: "ear" },
  { term: "Chyme", definition: "Acidic food mixture leaving the stomach.", organId: "stomach" },
  { term: "Surfactant", definition: "Alveolar secretion reducing surface tension.", organId: "lungs" },
  { term: "Circle of Willis", definition: "Arterial ring at the brain base.", organId: "brain" },
];

/** Original educational copy — anatomical facts are public knowledge; wording is unique to Lumen. */
export const lumenManifesto =
  "Lumen is an interactive anatomy studio built for curious learners — original interface, original explanations, and study tools designed to make form-and-function memorable.";
