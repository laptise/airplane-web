import "reflect-metadata";
import { collection, doc, DocumentData, getDoc, getFirestore, QueryDocumentSnapshot, SnapshotOptions, Timestamp } from "firebase/firestore";
function firestoreField(target: any, member: string) {
  console.log(target, member);
}

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
export const userConverter = {
  toFirestore(post: UserEntity): DocumentData {
    return { createdAt: post.createdAt, isPremium: post.isPremium };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): UserEntity {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      createdAt: data.createdAt?.toJSON?.() || null,
      isPremium: data.isPremium,
      lcName: data.lcName,
      name: data.name,
      note: data.note,
      paymentId: data.paymentId,
      updatedAt: data.updatedAt?.toJSON?.() || null,
      sei: data.sei,
      mei: data.mei,
      birth: data.birth?.toJSON?.() || null,
    };
  },
};

export default class Users {
  static colRef = collection(getFirestore(), "users").withConverter(userConverter);

  static async getFromUid(uid: string) {
    return await getDoc(doc(this.colRef, uid));
  }
}
