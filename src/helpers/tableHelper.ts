import { ux } from "@oclif/core";

export function logAsTable<T extends Record<string, unknown>>(
  collection: T[]
): void {
  const columns = createEmptyObject(collection);
  ux.table(collection, columns);
}

// Input:
// [
//  { foo: 'baz', bar: 22 },
//  { foo: 'bazbar', bar: 44}
// ]
// Output: { foo: {}, bar: {} }
function createEmptyObject<T>(arr: T[]): { [K in keyof T]: {} } {
  return arr.reduce((acc, obj) => {
    for (const key in obj) {
      // check if the key is prop of the object prototype
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        acc[key] = {};
      }
    }
    return acc;
  }, {} as { [K in keyof T]: {} });
}
