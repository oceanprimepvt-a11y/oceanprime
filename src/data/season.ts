// Seasonal availability rules (pure, no imports so a node script can test them).
// Only one fact is hard-coded: the annual east coast fishing ban (Bay of Bengal, 15 April to 14 June,
// 61 days, for mechanised and motorised boats). Everything else waits for the client's season data.

export type SourceKind = 'wild' | 'farmed' | 'mixed' | 'processed';

export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Ban dates as [month 1-12, day].
export const BAN = { from: [4, 15] as const, to: [6, 14] as const, label: 'East coast fishing ban' };

const daysIn = (m: number) => [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1];

/** Position on a 12-equal-column strip (0 to 12): month index plus the share of that month gone. */
export const stripPos = (m: number, d: number) => m - 1 + (d - 1) / daysIn(m);

/** The ban as a band on the strip, from the start of the first day to the end of the last. */
export const banBand = () => {
  const start = stripPos(BAN.from[0], BAN.from[1]);
  const end = stripPos(BAN.to[0], BAN.to[1]) + 1 / daysIn(BAN.to[0]);
  return { start, end };
};

/** Ban days falling in month m (1-12). */
export const banDaysIn = (m: number) => {
  const [fm, fd] = BAN.from, [tm, td] = BAN.to;
  if (m < fm || m > tm) return 0;
  const first = m === fm ? fd : 1;
  const last = m === tm ? td : daysIn(m);
  return last - first + 1;
};

/** Farmed, wild, both, or made from catch, read from the products' source lines. */
export const sourceKind = (sources: string[]): SourceKind => {
  const has = (re: RegExp) => sources.some((s) => re.test(s));
  if (has(/processed|dried/i)) return 'processed';
  const wild = has(/wild/i), farmed = has(/farmed/i);
  return wild && farmed ? 'mixed' : wild ? 'wild' : 'farmed';
};

export type MonthStatus = 'ban' | 'partial-ban' | 'ask';

/** What the calendar may say for a source kind in month m. */
export const monthStatus = (kind: SourceKind, m: number): MonthStatus => {
  const days = banDaysIn(m);
  if (!days || kind === 'farmed') return 'ask';
  return days === daysIn(m) ? 'ban' : 'partial-ban';
};

const fmt = (m: number, d: number) => `${d} ${MONTHS[m - 1].slice(0, 3)}`;
export const banRange = `${fmt(...BAN.from)} to ${fmt(...BAN.to)}`;

/** One plain sentence for a category in month m. Never claims availability. */
export const monthNote = (kind: SourceKind, m: number): string => {
  const days = banDaysIn(m);
  if (!days) return 'Ask for this season.';
  const when = days === daysIn(m) ? 'All month' : m === BAN.from[0] ? `From ${fmt(...BAN.from)}` : `Until ${fmt(...BAN.to)}`;
  switch (kind) {
    case 'farmed': return 'Farmed, so the fishing ban does not apply. Ask for this season.';
    case 'mixed': return `${when}: no new wild catch on the east coast. Farmed lines are not affected. Ask for this season.`;
    case 'processed': return `${when}: no fresh raw catch on the east coast. Ask about stock.`;
    default: return `${when}: no new wild catch on the east coast. Ask about frozen stock.`;
  }
};

// [NEED: client season data] Peak months per category id (1-12), e.g. { fish: [10, 11, 12] }.
// Until the client confirms, nothing is marked as in season and every month reads "Ask for this season".
export const peakMonths: Record<string, number[]> = {};
