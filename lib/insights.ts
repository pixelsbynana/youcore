/** Deterministic index into a list, based on the current UTC calendar day —
 * so everyone gets the same "today's question" on the same day. */
export function dayOfYearIndex(length: number, date = new Date()): number {
  const start = Date.UTC(date.getUTCFullYear(), 0, 0);
  const diff = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) - start;
  const day = Math.floor(diff / 86_400_000);
  return day % length;
}
