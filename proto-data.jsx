// proto-data.jsx — content for the game-UI portfolio prototype.
// Fictional studios/titles — placeholder content, no real IP.

const RV = {
  name: 'Frank Jalufka',
  role: 'Producer · Narrative Designer',
  level: 1,
  location: 'Texas, US',
  email: 'fljalufka@gmail.com',
  handles: [
    { l: 'LinkedIn', v: 'linkedin.com/in/frank-jalufka' },
    { l: 'Itch.io', v: 'TBD' },
    { l: 'Bluesky', v: '@depraved-phd' },
  ],
  availability: 'Open to junior / associate production roles — May 2027',
  tagline: 'I ship narrative games on time.',
  stats: [
    { k: '6', l: 'Titles shipped' },
    { k: '40+', l: 'Largest team led' },
    { k: '94%', l: 'Milestones on time' },
    { k: '12 yr', l: 'In production' },
  ],
};

// ── Quests = shipped titles (SELECTED WORK / Quest Log) ──
const QUESTS = [
  {
    id: 'hollow-tide', title: 'Hollow Tide', tag: 'Narrative Adventure', kind: 'Main Quest',
    studio: 'Lantern Bay Games', year: '2024', role: 'Lead Producer & Narrative Designer',
    platforms: 'PC · PS5 · Switch', team: 'Team of 40+', duration: '2.5 yr', diff: 4, hue: 200, reward: 'Metacritic 87 · 1.2M sold',
    blurb: 'Rebuilt the milestone pipeline mid-production and recovered a 9-week slip — shipped on date with zero must-fix narrative bugs.',
    objectives: [
      'Re-cut the milestone plan across 4 strike teams',
      'Owned branching-dialogue review gates end-to-end',
      'Hit cert with zero must-fix narrative bugs',
      'Wrote the final act + 3 companion arcs',
    ],
    caseFile: 'recovery',
  },
  {
    id: 'ironroot', title: 'Ironroot Saga', tag: 'Dark Fantasy RPG', kind: 'Main Quest',
    studio: 'Driftwood Interactive', year: '2022', role: 'Producer · Branching Dialogue',
    platforms: 'PC · Xbox', team: 'Team of 30+ · 11 writers', duration: '18 mo', diff: 5, hue: 28, reward: 'Steam 96% · Nebula Award nom.',
    blurb: 'Owned the quest pipeline across 3 strike teams and 11 writers — 240k words of branching dialogue shipped without a content freeze.',
    objectives: [
      'Built the dialogue pipeline: tooling, ownership, review gates',
      'Coordinated 11 writers + 3 strike teams',
      'Shipped 240k words of branching dialogue',
      'Designed companion trust arcs (47 companions)',
    ],
    caseFile: 'branching',
  },
  {
    id: 'neon-vesper', title: 'Neon Vesper', tag: 'Cyberpunk Thriller', kind: 'Side Quest',
    studio: 'Lantern Bay Games', year: '2021', role: 'Associate Producer',
    platforms: 'PC', team: 'Team of 22', duration: '14 mo', diff: 3, hue: 320, reward: 'TGA “Best Narrative” finalist',
    blurb: 'Stood up the studio’s first remote-first production process during the pivot — kept a 22-person team in sync across 6 time zones.',
    objectives: [
      'Stood up remote-first production from scratch',
      'Synced a 22-person team across 6 time zones',
      'Ran the narrative-beat review cadence',
    ],
    caseFile: 'roadmap',
  },
  {
    id: 'long-quiet', title: 'The Long Quiet', tag: 'Cozy Sim', kind: 'Origin Quest',
    studio: 'Solo / Self-published', year: '2019', role: 'Solo — everything',
    platforms: 'PC · Mobile', team: 'Solo', duration: '8 mo', diff: 2, hue: 145, reward: '500k downloads',
    blurb: 'Designed, wrote, produced and shipped solo. My crash course in the whole pipeline — and the reason I respect every discipline.',
    objectives: [
      'Designed, wrote & produced solo',
      'Shipped to PC + mobile self-published',
      'Reached 500k downloads with $0 marketing',
    ],
    caseFile: null,
  },
];

// ── Production Board (CONTINUE) — timeline rows over 2018→2026 ──
const BOARD = [
  { id: 'long-quiet', t: 'The Long Quiet', left: 1, w: 14, pct: 100, status: 'Shipped', hue: 145 },
  { id: 'neon-vesper', t: 'Neon Vesper', left: 18, w: 18, pct: 100, status: 'Shipped', hue: 320 },
  { id: 'ironroot', t: 'Ironroot Saga', left: 33, w: 21, pct: 100, status: 'Shipped', hue: 28 },
  { id: 'hollow-tide', t: 'Hollow Tide', left: 49, w: 27, pct: 100, status: 'Shipped', hue: 200 },
  { id: 'halcyon', t: 'Project Halcyon', left: 73, w: 25, pct: 62, status: 'In production', hue: 280, nda: true },
];

const HALCYON = {
  title: 'Project Halcyon', tag: 'Unannounced RPG · [NDA]', pct: 62,
  phase: 'Vertical slice locked', next: 'Alpha — Sep 2026', cert: 'Q1 2027',
  milestones: [
    { l: 'Greenlight', done: true }, { l: 'Pre-production', done: true },
    { l: 'Vertical slice', done: true }, { l: 'Alpha', done: false }, { l: 'Cert', done: false },
  ],
  risks: [
    { l: 'Dialogue tooling migration', level: 'low' },
    { l: 'Voice-over vendor schedule', level: 'med' },
  ],
};

// ── Case Files (CASE FILES / codex) ──
const FILES = [
  {
    id: 'recovery', kind: 'Postmortem', title: 'The 9-Week Recovery', status: 'Declassified',
    quest: 'Hollow Tide · 2024', read: '6 min',
    summary: 'How we re-cut the Hollow Tide milestone plan after a 9-week slip and still hit cert — without cutting the third act.',
    points: [
      'Diagnosed the slip: scope crept in branching VO, not in code',
      'Re-baselined milestones around a protected “narrative-lock” gate',
      'Traded breadth for depth: 2 side-quests cut, 0 main-story cuts',
      'Result: shipped on the original date, 87 Metacritic',
    ],
    artifact: 'burndown chart + milestone re-cut',
  },
  {
    id: 'branching', kind: 'Pipeline', title: 'Branching at Scale', status: 'Declassified',
    quest: 'Ironroot Saga · 2022', read: '8 min',
    summary: 'The Ironroot dialogue pipeline — how 11 writers shipped 240k branching words with clear ownership and tight review gates.',
    points: [
      'Single source of truth in Articy:draft → engine export',
      'Per-arc ownership with a weekly cross-writer continuity pass',
      'Two review gates: narrative-lock, then VO-lock',
      'Zero content freezes across an 18-month production',
    ],
    artifact: 'pipeline diagram + review-gate flow',
  },
  {
    id: 'roadmap', kind: 'Roadmap', title: 'Greenlight → Slice in 14 Months', status: 'Declassified',
    quest: 'Neon Vesper · 2021', read: '5 min',
    summary: 'An annotated 14-month plan from greenlight to a playable vertical slice, built remote-first across 6 time zones.',
    points: [
      'Remote-first cadence: async by default, 2 sync beats/week',
      'Slice scoped to one fully-finished hour, not a broad demo',
      'Risk burndown reviewed every milestone, not at the end',
      'Delivered the slice 1 week early',
    ],
    artifact: '14-month roadmap (annotated)',
  },
  {
    id: 'halcyon-plan', kind: 'Roadmap', title: 'Project Halcyon — Live Plan', status: 'Restricted',
    quest: 'In production · 2026', read: 'NDA',
    summary: 'The current production plan. Details are under NDA — available to talk through in an interview.',
    points: [
      'Vertical slice locked; alpha scoping in progress',
      'Specifics redacted under NDA',
    ],
    artifact: '[redacted]',
    locked: true,
  },
];

// ── Character Sheet (NEW GAME / about) ──
const CHAR = {
  class: 'Producer', subclass: 'Narrative Designer',
  bio: [
    'Twelve years turning ambitious story worlds into delivery plans a team can actually execute — and writing the moments players remember long after the credits.',
    'My work lives at the seam between the spreadsheet and the script: milestone plans that protect the writing, and writing that respects the schedule. I’ve shipped solo, in 22-person remote teams, and across 40-plus on the floor.',
  ],
  specializations: [
    { k: 'Production Planning', proof: '6 titles shipped · 94% of milestones on time' },
    { k: 'Narrative Design', proof: '240k+ words of branching dialogue shipped' },
    { k: 'Team Leadership', proof: 'Led cross-discipline teams of up to 40+' },
    { k: 'Pipeline & Tooling', proof: 'Built two studio production pipelines from scratch' },
  ],
  traits: [
    { t: 'Schedule Surgeon', d: 'Recovers slipped milestones without slashing scope.' },
    { t: 'Calm in Cert', d: 'Steady when the build is on fire — kept Hollow Tide on date through a 9-week slip.' },
    { t: 'Remote Anchor', d: 'Async-first; keeps distributed teams in sync across time zones.' },
    { t: 'Risk Radar', d: 'Burns down risk every milestone, never all at the end.' },
  ],
  tools: ['Jira', 'Hansoft', 'Notion', 'Articy:draft', 'Ink', 'Perforce', 'Miro', 'Figma'],
};

Object.assign(window, { RV, QUESTS, BOARD, HALCYON, FILES, CHAR });
