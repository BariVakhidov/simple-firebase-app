export const filterNonNull = (obj: Record<string, unknown>) => {
  return Object.fromEntries(Object.entries(obj).filter(([k, v]) => v));
};