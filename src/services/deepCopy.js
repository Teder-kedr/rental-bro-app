export default function deepCopy(obj, cache = new WeakMap()) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (cache.has(obj)) {
    return cache.get(obj);
  }

  let copy;
  if (obj instanceof Date) {
    copy = new Date(obj);
  } else if (obj instanceof RegExp) {
    copy = new RegExp(obj);
  } else {
    copy = Array.isArray(obj) ? [] : {};

    cache.set(obj, copy);

    for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        copy[key] = deepCopy(obj[key], cache);
      }
    }
  }

  return copy;
}
