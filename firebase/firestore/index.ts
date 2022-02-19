import { QueryDocumentSnapshot } from "firebase/firestore";

export function cloneWithNew<T>(src: any) {
  const newRef = Array.isArray(src) ? [] : {};
  clone(src, newRef);
  return newRef as T;
}
export function clone(src: any, target: any) {
  for (const [key] of Object.entries(src)) {
    setValue(key, src, target);
  }
}
function setValue(key: any, src: any, target: any) {
  if (Array.isArray(src[key])) {
    target[key] = new Array(src[key].length).fill(undefined);
    target[key].forEach((_: unknown, index: number, list: any) => setValue(index, src[key], list));
  } else if (typeof src[key] === "object") {
    target[key] = {};
    clone(src[key], target[key]);
  } else if (isJsonTime(src[key])) target[key] = new Date(src[key]);
  else target[key] = src[key];
}

function isJsonTime(value: any) {
  const isString = typeof value === "string";
  const lengthSafe = value.length === 24;
  const spliterSafe = value[10] === "T" && value[23] === "Z";
  return isString && lengthSafe && spliterSafe;
}

export function setCommonRecordProps(snapshot: QueryDocumentSnapshot, dest: RecordCollection) {
  const data = snapshot.data();
  dest.id = snapshot.id;
  dest.createdAt = data.createdAt?.toJSON?.() || null;
  dest.updatedAt = data.updatedAt?.toJSON?.() || null;
  return data;
}

export class BaseEntity {
  /**docId */
  id?: string;
  constructor(data?: object) {
    switch (arguments.length) {
      case 1:
        clone(data, this);
        break;
    }
  }
}
