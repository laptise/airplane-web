import { collection, doc, DocumentData, getDoc, getFirestore, QueryDocumentSnapshot, SnapshotOptions, Timestamp } from "firebase/firestore";
import { setCommonRecordProps } from ".";

export type FirestoreConverter<T> = {
  toFirestore(data: T): DocumentData;
  fromFirestore(snapshot: QueryDocumentSnapshot): T;
};

export const converter: FirestoreConverter<Users> = {
  toFirestore(post: UserCol) {
    return { createdAt: post.createdAt, isPremium: post.isPremium };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot) {
    return new Users(snapshot);
  },
};

export default class Users implements UserCol {
  isPremium!: boolean;
  lcName!: string;
  name!: string;
  note!: string;
  paymentId!: string;
  sei!: string;
  mei!: string;
  birth!: Date;
  createdAt!: Date;
  updatedAt!: Date;
  id!: string;
  constructor();
  constructor(snapshot: QueryDocumentSnapshot);
  constructor(snapshot?: QueryDocumentSnapshot) {
    switch (arguments.length) {
      case 1:
        if (!snapshot) throw "there is no snapshot";
        const data = setCommonRecordProps(snapshot, this);
        this.isPremium = data.isPremium;
        this.lcName = data.lcName;
        this.name = data.name;
        this.note = data.note;
        this.paymentId = data.paymentId;
        this.sei = data.sei;
        this.mei = data.mei;
        this.birth = data.birth?.toJSON?.() || null;
        break;
    }
  }

  static colRef = collection(getFirestore(), "users").withConverter(converter);

  static async getFromUid(uid: string) {
    const snapshot = await getDoc(doc(this.colRef, uid));
    return snapshot.data();
  }
}
