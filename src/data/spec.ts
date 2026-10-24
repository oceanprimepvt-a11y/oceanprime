// Spec builder rules: which choices each species offers and how a finished spec reads.
// No imports, so the logic can be tested on its own with plain Node.
// Count grades are industry conventions (pieces per lb or per kg). They are offered only where
// products.ts states a range for that species and form; everything else stays free text.

export const LB_GRADES = ['U/8', 'U/10', 'U/12', 'U/15', '16/20', '21/25', '26/30', '31/40', '41/50', '51/60', '61/70', '71/90', '91/110'];
export const KG_GRADES = ['10/20', '20/30', '30/40', '40/50', '50/60', '60/70', '70/80', '80/100', '100/120'];
const span = (list: string[], from: string, to: string) => list.slice(list.indexOf(from), list.indexOf(to) + 1);

export interface GradeSet { unit: 'per lb' | 'per kg'; grades: string[] }

const gradeRules: Record<string, (form: string) => GradeSet | null> = {
  'vannamei-shrimp': (f) =>
    f === 'HOSO' ? { unit: 'per kg', grades: span(KG_GRADES, '20/30', '100/120') }
    : f === 'HLSO' ? { unit: 'per lb', grades: span(LB_GRADES, '16/20', '91/110') }
    : null,
  'black-tiger-shrimp': (f) => (f === 'HLSO' ? { unit: 'per lb', grades: span(LB_GRADES, 'U/8', '41/50') } : null),
};
export const gradesFor = (slug: string, form: string): GradeSet | null => gradeRules[slug]?.(form) ?? null;

// Glaze is an ice coat on individually frozen pieces; blocks, live and dry goods have none.
export const GLAZES = ['No glaze', '5%', '10%', '15%', '20%', '25%', '30%'];
export const needsGlaze = (freezing: string) => freezing === 'IQF' || freezing === 'Semi-IQF';

// Inner packs and how many go in one master carton.
export interface Inner { label: string; kg?: number; lb?: number; counts: number[] }
const BLOCKS: Inner[] = [
  { label: '2 kg block', kg: 2, counts: [6, 10] },
  { label: '1.8 kg block', kg: 1.8, counts: [6, 10] },
  { label: '4 lb block', lb: 4, counts: [6, 10] },
];
const BAGS: Inner[] = [
  { label: '250 g bag', kg: 0.25, counts: [20, 40] },
  { label: '500 g bag', kg: 0.5, counts: [10, 20] },
  { label: '1 kg bag', kg: 1, counts: [6, 10, 12] },
  { label: '2 lb bag', lb: 2, counts: [5, 10, 12] },
  { label: '5 kg bulk bag', kg: 5, counts: [2] },
];
export const innersFor = (freezing: string): Inner[] | null =>
  freezing === 'Block frozen' ? BLOCKS : needsGlaze(freezing) ? BAGS : null;

const num = (n: number) => String(Math.round(n * 100) / 100);
export const masterLabel = (inner: Inner, count: number) =>
  `${count} x ${inner.label} (${inner.kg ? `${num(inner.kg * count)} kg` : `${num(inner.lb! * count)} lb`})`;

export const LABELS = ['Ocean Prime label', 'Your private label', 'Plain, unbranded'];

export const QTY_UNITS: { id: string; label: string; show: (n: string) => string }[] = [
  { id: 'mt', label: 'MT', show: (n) => `${n} MT` },
  { id: 'kg', label: 'kg', show: (n) => `${n} kg` },
  { id: 'cartons', label: 'Cartons', show: (n) => `${n} master carton${n === '1' ? '' : 's'}` },
  { id: '20ft', label: '20 ft reefer', show: (n) => `${n} x 20 ft reefer` },
  { id: '40ft', label: '40 ft reefer', show: (n) => `${n} x 40 ft reefer` },
];

export const INCOTERMS = ['FOB Visakhapatnam', 'CFR', 'CIF', 'Not sure yet'];

// Common seafood import ports, offered as typing suggestions only.
export const PORTS = [
  'Los Angeles, USA', 'Long Beach, USA', 'New York / New Jersey, USA', 'Savannah, USA', 'Houston, USA',
  'Rotterdam, Netherlands', 'Antwerp, Belgium', 'Hamburg, Germany', 'Vigo, Spain', 'Felixstowe, UK',
  'Jebel Ali, UAE', 'Dammam, Saudi Arabia', 'Shanghai, China', 'Qingdao, China', 'Tokyo, Japan',
  'Yokohama, Japan', 'Busan, South Korea', 'Ho Chi Minh City, Vietnam', 'Haiphong, Vietnam',
  'Port Klang, Malaysia', 'Singapore',
];

export interface Species { slug: string; name: string; scientific: string; forms: string[]; freezing: string[]; grading?: string }

export interface Spec {
  slug: string; form: string; grade: string; freezing: string; glaze: string;
  inner: string; master: string; label: string; packNote: string;
  qty: string; unit: string; port: string; incoterm: string;
  name: string; company: string; notes: string;
}
export const KEYS: (keyof Spec)[] = ['slug', 'form', 'grade', 'freezing', 'glaze', 'inner', 'master', 'label', 'packNote', 'qty', 'unit', 'port', 'incoterm', 'name', 'company', 'notes'];
export const emptySpec = (): Spec => Object.fromEntries(KEYS.map((k) => [k, k === 'unit' ? 'mt' : ''])) as unknown as Spec;

// Drop choices that no longer fit after an earlier answer changes (a new species, form or freezing).
export const tidy = (s: Spec, sp: Species | undefined): Spec => {
  const t = { ...s };
  if (!sp) return { ...emptySpec(), name: s.name, company: s.company, notes: s.notes };
  if (!sp.forms.includes(t.form)) t.form = '';
  if (!sp.freezing.includes(t.freezing)) t.freezing = '';
  if (!t.form) t.grade = ''; // a grade only means something for a chosen form (the UI also clears it when the form changes)
  if (!needsGlaze(t.freezing)) t.glaze = '';
  const inners = innersFor(t.freezing);
  const inner = inners?.find((i) => i.label === t.inner);
  if (!inner) { t.inner = ''; t.master = ''; }
  else if (!inner.counts.some((c) => masterLabel(inner, c) === t.master)) t.master = '';
  if (!QTY_UNITS.some((u) => u.id === t.unit)) t.unit = 'mt';
  return t;
};

export const STEPS = ['Species', 'Form', 'Size grade', 'Freezing', 'Glaze', 'Packing', 'Quantity', 'Port', 'Send'] as const;
export type Step = (typeof STEPS)[number];
export const stepApplies = (step: Step, s: Spec) => step !== 'Glaze' || needsGlaze(s.freezing);

export const packing = (s: Spec) => [s.master || s.inner, s.label, s.packNote.trim()].filter(Boolean).join(', ');
export const quantity = (s: Spec) => {
  const q = s.qty.trim();
  return q ? QTY_UNITS.find((u) => u.id === s.unit)!.show(q) : '';
};
export const destination = (s: Spec) => [s.port.trim(), s.incoterm && s.incoterm !== 'Not sure yet' ? `(${s.incoterm})` : ''].filter(Boolean).join(' ');

// Which steps have an answer, for the progress count and the step rail ticks.
export const answered = (s: Spec): Record<Step, boolean> => ({
  Species: !!s.slug, Form: !!s.form, 'Size grade': !!s.grade.trim(), Freezing: !!s.freezing, Glaze: !!s.glaze,
  Packing: !!packing(s), Quantity: !!quantity(s), Port: !!destination(s), Send: false,
});

export const TBA = 'To be agreed';

// The spec as label/value rows: the live card, the print sheet and the message all read from this.
export const rows = (s: Spec, sp: Species | undefined, glossary: Record<string, string>): [string, string][] => {
  const term = (v: string) => (v && glossary[v] ? `${v} (${glossary[v]})` : v);
  return [
    ['Species', sp ? `${sp.name} (${sp.scientific})` : ''],
    ['Form', term(s.form)],
    ['Size grade', s.grade.trim()],
    ['Freezing', term(s.freezing)],
    ...(needsGlaze(s.freezing) || !s.freezing ? [['Glaze', s.glaze] as [string, string]] : []),
    ['Packing', packing(s)],
    ['Quantity', quantity(s)],
    ['Destination', destination(s)],
  ];
};

// A short handle both sides can quote: OP-yymmdd-VAN (date + species code).
export const specRef = (slug: string, d: Date) => {
  const p = (n: number) => String(n).padStart(2, '0');
  const code = slug.slice(0, 3).toUpperCase();
  return `OP-${String(d.getFullYear()).slice(2)}${p(d.getMonth() + 1)}${p(d.getDate())}-${code}`;
};

export const message = (s: Spec, sp: Species | undefined, glossary: Record<string, string>, ref: string) => [
  'Spec request from the Ocean Prime website',
  `Ref: ${ref}`,
  '',
  ...rows(s, sp, glossary).map(([k, v]) => `${k}: ${v || TBA}`),
  s.notes.trim() ? `Notes: ${s.notes.trim()}` : null,
  '',
  s.name.trim() ? `Name: ${s.name.trim()}` : null,
  s.company.trim() ? `Company: ${s.company.trim()}` : null,
  'Please send your price and availability for this spec.',
].filter((l) => l !== null).join('\n');

// One line for the enquiry list: everything after the species name.
export const summary = (s: Spec) =>
  [s.form, s.grade.trim(), s.freezing, s.glaze && s.glaze !== 'No glaze' ? `${s.glaze} glaze` : s.glaze, packing(s), quantity(s), destination(s)]
    .filter(Boolean).join(', ');

// Shareable link state: only the order fields, never the buyer's name or notes.
const SHARE: (keyof Spec)[] = ['slug', 'form', 'grade', 'freezing', 'glaze', 'inner', 'master', 'label', 'packNote', 'qty', 'unit', 'port', 'incoterm'];
const PARAM: Partial<Record<keyof Spec, string>> = { slug: 'species' };
export const toQuery = (s: Spec) => {
  const q = new URLSearchParams();
  SHARE.forEach((k) => { if (s[k] && !(k === 'unit' && s.unit === 'mt')) q.set(PARAM[k] ?? k, s[k]); });
  return q.toString();
};
export const fromQuery = (qs: string): Partial<Spec> => {
  const q = new URLSearchParams(qs);
  const out: Partial<Spec> = {};
  SHARE.forEach((k) => { const v = q.get(PARAM[k] ?? k); if (v) out[k] = v.slice(0, 200); });
  return out;
};
