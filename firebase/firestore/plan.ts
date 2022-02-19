import { collection, doc, getDoc, getDocs, getFirestore, query, QueryDocumentSnapshot, where } from "firebase/firestore";
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

/**プラン */
export default class Plan implements PlanCol {
  name: string;
  note: string;
  owner: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  id: string;

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

  static colRef = collection(getFirestore(), "plans").withConverter(converter);

  /**販売者のIDから取得 */
  static async getFromUid(uid: string) {
    const q = query(this.colRef, where("owner", "==", uid));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((x) => x.data());
  }
}
