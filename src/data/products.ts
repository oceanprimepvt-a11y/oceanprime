// Indicative catalogue of what India exports most, until the client sends their own list.
// Forms and grades are common trade specifications, not promises: final specs are agreed per order.

export type CategoryId = 'shrimp' | 'fish' | 'cephalopods' | 'crab-lobster' | 'freshwater' | 'value-added';

export interface Category {
  id: CategoryId;
  name: string;
  short: string;
  blurb: string;
  image: string;
}

export interface Product {
  slug: string;
  name: string;
  scientific: string;
  category: CategoryId;
  source: string;
  summary: string;
  description: string;
  forms: string[];
  freezing: string[];
  grading?: string;
  image: string;
  featured?: boolean;
}

export const categories: Category[] = [
  { id: 'shrimp', name: 'Shrimp & Prawns', short: 'Shrimp', blurb: 'Farmed vannamei and black tiger from Andhra Pradesh, plus wild sea shrimp.', image: 'vannamei' },
  { id: 'fish', name: 'Sea Fish', short: 'Sea fish', blurb: 'Bay of Bengal catch: ribbonfish, pomfret, seer, mackerel, tuna and reef fish.', image: 'pomfret' },
  { id: 'cephalopods', name: 'Squid, Cuttlefish & Octopus', short: 'Cephalopods', blurb: 'Whole, cleaned, tubes, rings and fillets, frozen to order.', image: 'squid' },
  { id: 'crab-lobster', name: 'Crab & Lobster', short: 'Crab & lobster', blurb: 'Mud crab, blue swimming crab and spiny lobster.', image: 'mud-crab' },
  { id: 'freshwater', name: 'Freshwater Fish', short: 'Freshwater', blurb: 'Rohu and scampi from the aquaculture belt of the Godavari delta.', image: 'rohu' },
  { id: 'value-added', name: 'Surimi & Dried Fish', short: 'Surimi & dried', blurb: 'Frozen surimi blocks and traditionally sun-dried fish.', image: 'surimi' },
];

const WILD = 'Wild-caught, Bay of Bengal (FAO Area 57)';
const FARMED = 'Farmed, Andhra Pradesh';

export const products: Product[] = [
  {
    slug: 'vannamei-shrimp', name: 'Vannamei Shrimp', scientific: 'Litopenaeus vannamei', category: 'shrimp', source: FARMED, image: 'vannamei', featured: true,
    summary: "India's largest seafood export, farmed along the Andhra coast.",
    description: 'Whiteleg shrimp with a mild, sweet flavour and firm bite. Andhra Pradesh is the centre of Indian vannamei farming, which keeps the time from pond to processing plant short.',
    forms: ['HOSO', 'HLSO', 'PD', 'PDTO', 'PUD', 'EZ Peel', 'Cooked PD / PDTO'],
    freezing: ['IQF', 'Semi-IQF', 'Block frozen'],
    grading: 'HLSO 16/20 to 91/110 per lb; HOSO 20/30 to 100/120 per kg',
  },
  {
    slug: 'black-tiger-shrimp', name: 'Black Tiger Shrimp', scientific: 'Penaeus monodon', category: 'shrimp', source: 'Farmed and wild-caught, Andhra Pradesh', image: 'black-tiger', featured: true,
    summary: 'Large, banded prawns prized for size and a rich, sweet taste.',
    description: 'The largest of the commercial penaeid shrimps. Black tiger holds its shape and colour when cooked, which makes it a favourite for grills, sushi toppings and premium retail packs.',
    forms: ['HOSO', 'HLSO', 'PD', 'PDTO', 'PUD', 'Nobashi'],
    freezing: ['IQF', 'Semi-IQF', 'Block frozen'],
    grading: 'HLSO U/8 to 41/50 per lb',
  },
  {
    slug: 'scampi', name: 'Scampi (Freshwater Prawn)', scientific: 'Macrobrachium rosenbergii', category: 'freshwater', source: FARMED, image: 'scampi',
    summary: 'Giant freshwater prawn with long blue claws and delicate meat.',
    description: 'Grown in freshwater ponds of coastal Andhra Pradesh. Scampi has a soft, lobster-like texture and is sold whole for presentation or as tails.',
    forms: ['HOSO', 'HLSO', 'Whole cooked'],
    freezing: ['IQF', 'Block frozen'],
  },
  {
    slug: 'wild-sea-shrimp', name: 'Wild Sea Shrimp', scientific: 'Parapenaeopsis and Metapenaeus spp.', category: 'shrimp', source: WILD, image: 'sea-shrimp',
    summary: 'Small, naturally sweet shrimp from the Bay of Bengal.',
    description: 'Wild species such as flower shrimp and pink shrimp, landed by trawlers along the east coast. Ideal for peeled meat, ready meals and food service.',
    forms: ['HOSO', 'HLSO', 'PUD', 'PD'],
    freezing: ['Block frozen', 'IQF'],
  },
  {
    slug: 'squid', name: 'Indian Squid', scientific: 'Uroteuthis duvaucelii', category: 'cephalopods', source: WILD, image: 'squid', featured: true,
    summary: 'Tender squid sold whole, as tubes or as rings.',
    description: 'The main squid of Indian waters, with thin walls and a clean white flesh when cleaned. A large share of Indian squid goes to Europe and East Asia.',
    forms: ['Whole round', 'Whole cleaned', 'Tubes', 'Tubes & tentacles', 'Rings'],
    freezing: ['IQF', 'Semi-IQF', 'Block frozen'],
    grading: 'Sized by mantle length or pieces per kg',
  },
  {
    slug: 'cuttlefish', name: 'Cuttlefish', scientific: 'Sepia pharaonis', category: 'cephalopods', source: WILD, image: 'cuttlefish',
    summary: 'Thick, sweet cuttlefish meat for fillets and whole cleaned packs.',
    description: 'Pharaoh cuttlefish has a dense, slightly chewy texture that stays tender when cooked quickly. Exported whole, cleaned, or as skinless fillets.',
    forms: ['Whole round', 'Whole cleaned', 'Fillets', 'Flower cut'],
    freezing: ['IQF', 'Block frozen'],
  },
  {
    slug: 'octopus', name: 'Octopus', scientific: 'Amphioctopus spp.', category: 'cephalopods', source: WILD, image: 'octopus',
    summary: 'Whole octopus, cleaned and frozen at its natural curl.',
    description: 'Caught along the east coast and frozen whole or cleaned. Popular for grilling, salads and Mediterranean cooking.',
    forms: ['Whole round', 'Whole cleaned', 'Flower type'],
    freezing: ['IQF', 'Block frozen'],
  },
  {
    slug: 'ribbonfish', name: 'Ribbonfish', scientific: 'Trichiurus lepturus', category: 'fish', source: WILD, image: 'ribbonfish', featured: true,
    summary: 'Silver ribbonfish, one of the east coast’s biggest export catches.',
    description: 'Long, mirror-silver fish with soft, flaky white meat. Visakhapatnam is one of the main landing centres for ribbonfish shipped to East Asian markets.',
    forms: ['Whole round'],
    freezing: ['Block frozen', 'IQF'],
    grading: 'By weight per piece, from 100 g to 500 g and up',
  },
  {
    slug: 'indian-mackerel', name: 'Indian Mackerel', scientific: 'Rastrelliger kanagurta', category: 'fish', source: WILD, image: 'mackerel',
    summary: 'Rich, oily mackerel frozen whole within hours of landing.',
    description: 'A staple across Asia and the Middle East. Oily, full-flavoured and high in omega-3, best frozen quickly to keep its colour.',
    forms: ['Whole round', 'Gutted'],
    freezing: ['Block frozen', 'IQF'],
    grading: 'By pieces per kg',
  },
  {
    slug: 'seer-fish', name: 'Seer Fish (King Mackerel)', scientific: 'Scomberomorus commerson', category: 'fish', source: WILD, image: 'seer-fish', featured: true,
    summary: 'Firm, mild steaks from one of India’s most loved table fish.',
    description: 'Narrow-barred Spanish mackerel with dense white flesh and few bones. Exported whole, gutted, or cut into steaks and fillets.',
    forms: ['Whole round', 'Gutted', 'Steaks', 'Fillets'],
    freezing: ['IQF', 'Block frozen'],
  },
  {
    slug: 'silver-pomfret', name: 'Silver Pomfret', scientific: 'Pampus argenteus', category: 'fish', source: WILD, image: 'pomfret', featured: true,
    summary: 'Pearly, flat pomfret with fine white meat.',
    description: 'A premium fish across Asia and the Gulf, valued for its delicate taste and clean presentation. Packed whole and graded by size.',
    forms: ['Whole round', 'Gutted'],
    freezing: ['IQF', 'Block frozen'],
    grading: 'By pieces per kg',
  },
  {
    slug: 'yellowfin-tuna', name: 'Yellowfin Tuna', scientific: 'Thunnus albacares', category: 'fish', source: WILD, image: 'tuna',
    summary: 'Deep-red tuna as whole fish, loins and steaks.',
    description: 'Lean, meaty tuna caught in the Bay of Bengal. Supplied whole, gutted, or processed into loins and steaks for retail and food service.',
    forms: ['Whole round', 'Gutted & gilled', 'Loins', 'Steaks'],
    freezing: ['IQF', 'Block frozen'],
  },
  {
    slug: 'croaker', name: 'Croaker', scientific: 'Otolithes and Johnius spp.', category: 'fish', source: WILD, image: 'croaker',
    summary: 'Versatile white fish for whole, gutted and fillet packs.',
    description: 'Croakers are an everyday fish with mild, moist meat. They suit frying, curries and fillet processing.',
    forms: ['Whole round', 'Gutted', 'Fillets'],
    freezing: ['Block frozen', 'IQF'],
  },
  {
    slug: 'red-snapper', name: 'Red Snapper', scientific: 'Lutjanus spp.', category: 'fish', source: WILD, image: 'snapper',
    summary: 'Rose-red reef fish with firm, sweet flesh.',
    description: 'A premium reef fish for whole-fish presentation and skin-on fillets. Popular in the Middle East, Europe and the US.',
    forms: ['Whole round', 'Gutted & scaled', 'Fillets'],
    freezing: ['IQF'],
  },
  {
    slug: 'grouper', name: 'Grouper (Reef Cod)', scientific: 'Epinephelus spp.', category: 'fish', source: WILD, image: 'grouper',
    summary: 'Thick white fillets from a prized reef fish.',
    description: 'Groupers have large, moist flakes and very few bones. Exported whole, gutted or as fillets.',
    forms: ['Whole round', 'Gutted', 'Fillets'],
    freezing: ['IQF'],
  },
  {
    slug: 'indian-oil-sardine', name: 'Indian Oil Sardine', scientific: 'Sardinella longiceps', category: 'fish', source: WILD, image: 'sardine',
    summary: 'Small, oily sardines frozen whole in blocks.',
    description: 'Sardines are rich in oil and omega-3. They are block-frozen whole for canning, food service and bait.',
    forms: ['Whole round'],
    freezing: ['Block frozen'],
  },
  {
    slug: 'threadfin-bream', name: 'Threadfin Bream', scientific: 'Nemipterus japonicus', category: 'fish', source: WILD, image: 'threadfin-bream',
    summary: 'Pink-and-yellow bream, the classic surimi fish.',
    description: 'A lean white fish with a mild flavour. Sold whole frozen and widely used as the raw material for surimi.',
    forms: ['Whole round'],
    freezing: ['Block frozen', 'IQF'],
  },
  {
    slug: 'mud-crab', name: 'Mud Crab', scientific: 'Scylla serrata', category: 'crab-lobster', source: 'Farmed and wild-caught, Andhra Pradesh', image: 'mud-crab',
    summary: 'Heavy, meaty mud crabs, live or frozen.',
    description: 'Mud crabs from the brackish waters and mangroves of the east coast. Prized in Southeast Asia and China for their sweet claw meat.',
    forms: ['Live', 'Whole frozen'],
    freezing: ['Live (chilled)', 'IQF'],
    grading: 'By weight per crab',
  },
  {
    slug: 'blue-swimming-crab', name: 'Blue Swimming Crab', scientific: 'Portunus pelagicus', category: 'crab-lobster', source: WILD, image: 'blue-crab',
    summary: 'Sweet crab for whole, cut and crab meat products.',
    description: 'The source of most of the world’s premium crab meat. Exported whole frozen or as cut crab.',
    forms: ['Whole round', 'Cut crab'],
    freezing: ['IQF', 'Block frozen'],
  },
  {
    slug: 'spiny-lobster', name: 'Spiny Lobster', scientific: 'Panulirus spp.', category: 'crab-lobster', source: WILD, image: 'lobster',
    summary: 'Rock lobster, whole or as tails.',
    description: 'Spiny lobsters have no large claws; the value is in the dense, sweet tail meat. Supplied whole or as tails, raw or cooked.',
    forms: ['Whole raw', 'Whole cooked', 'Tails'],
    freezing: ['IQF'],
    grading: 'By weight per piece',
  },
  {
    slug: 'rohu', name: 'Rohu', scientific: 'Labeo rohita', category: 'freshwater', source: FARMED, image: 'rohu',
    summary: 'The best-known Indian carp, from Andhra’s fish farms.',
    description: 'Andhra Pradesh is a major producer of farmed carp. Rohu has a firm texture and mild taste, and is supplied whole, gutted or as steaks.',
    forms: ['Whole round', 'Gutted', 'Steaks'],
    freezing: ['IQF', 'Block frozen'],
  },
  {
    slug: 'surimi', name: 'Surimi', scientific: 'From threadfin bream and other white fish', category: 'value-added', source: 'Processed in India from Bay of Bengal catch', image: 'surimi',
    summary: 'Frozen fish paste blocks for kamaboko, crab sticks and fish balls.',
    description: 'Surimi is minced, washed and refined white fish, frozen in blocks. It is graded by gel strength to suit each product.',
    forms: ['Frozen blocks'],
    freezing: ['Block frozen'],
    grading: 'By gel strength grade',
  },
  {
    slug: 'dried-fish', name: 'Dried Fish', scientific: 'Ribbonfish, anchovy and other species', category: 'value-added', source: 'Sun-dried, Andhra coast', image: 'dried-fish',
    summary: 'Traditionally dried fish with a long shelf life.',
    description: 'Fish dried in the sun along the coast, sorted and packed for markets in Asia and for the Indian diaspora.',
    forms: ['Whole dried', 'Split dried'],
    freezing: ['Ambient, dry packed'],
  },
];

export const productsBy = (id: CategoryId) => products.filter((p) => p.category === id);
export const categoryOf = (id: CategoryId) => categories.find((c) => c.id === id)!;

// Trade terms shown on product pages, so buyers can read the forms list.
export const glossary: Record<string, string> = {
  HOSO: 'Head-on, shell-on',
  HLSO: 'Headless, shell-on',
  PD: 'Peeled, deveined',
  PDTO: 'Peeled, deveined, tail-on',
  PUD: 'Peeled, undeveined',
  'EZ Peel': 'Shell cut and deveined for easy peeling',
  Nobashi: 'Stretched, peeled tail-on shrimp for tempura',
  IQF: 'Individually quick frozen',
  'Semi-IQF': 'Quick frozen in loose layers',
  'Block frozen': 'Frozen in solid blocks, usually 2\u00a0kg',
};
