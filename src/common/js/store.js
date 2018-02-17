export function saveToLocal(id, key, value) {
  let vendor = window.localStorage.__vendor__;
  if (!vendor) {
    vendor = {};
    vendor[id] = {};
  } else {
    vendor = JSON.parse(vendor);
    if (!vendor[id]) {
      vendor[id] = {};
    }
  }
  vendor[id][key] = value;
  window.localStorage.__vendor__ = JSON.stringify(vendor);
}

export function loadFromLocal(id, key, def) {
  let vendor = window.localStorage.__vendor__;
  if (!vendor) {
    return def;
  }
  vendor = JSON.parse(vendor)[id];
  if (!vendor) {
    return def;
  }
  let ret = vendor[key];
  return ret || def;
}
