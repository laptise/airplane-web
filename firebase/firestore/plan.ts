import { collection, getDoc, getFirestore, QueryDocumentSnapshot } from "firebase/firestore";
import { setCommonRecordProps } from ".";
import { FirestoreConverter } from "./user";

const converter: FirestoreConverter<PlanCol> = {
  toFirestore(data) {
    return {};
  },
  fromFirestore(snapshot) {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      createdAt: data.createdAt?.toJSON?.() || null,
      updatedAt: data.updatedAt?.toJSON?.() || null,
      name: data.name,
      note: data.note,
      price: data.price,
      owner: data.owner,
    };
  },
};

export default class Plan implements PlanCol {
  name: string;
  note: string;
  owner: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  id: string;
  static colRef = collection(getFirestore(), "plans").withConverter(converter);

  constructor();
  constructor(snapshot: QueryDocumentSnapshot);
  constructor(snapshot?: QueryDocumentSnapshot) {
    switch (arguments.length) {
      case 1:
        const data = setCommonRecordProps(snapshot, this);
        this.name = data.name;
        this.note = data.note;
        this.price = data.price;
        this.owner = data.owner;
        break;
    }
  }
  //   static async getFromUid(uid: string) {
  //     return await getDoc(doc(this.colRef, uid));
  //   }
}
