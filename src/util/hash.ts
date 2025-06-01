// Simple hash function for React keys
// (djb2 algorithm, suitable for small strings)
export function hashString(str: string): string {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i); // hash * 33 + c
  }
  return 'h' + (hash >>> 0).toString(36); // Unsigned, base36 for compactness
}
