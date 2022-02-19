/// <reference path="firebase/auth" />

interface BaseCollection {
  id: string;
}

interface RecordCollection extends BaseCollection {
  createdAt: Date;
  updatedAt: Date;
}

///ref
interface UserCol extends RecordCollection {
  isPremium: boolean;
  lcName: string;
  name: string;
  note: string;
  paymentId: string;
  sei: string;
  mei: string;
  birth: Date;
}

interface PlanCol extends RecordCollection {
  name: string;
  note: string;
  owner: string;
  price: number;
}

interface AuthUser extends UserCol {
  uid: string;
  picture?: string;
  phone_number?: string;
  email_verified?: boolean;
  email?: string;
}

type State<T> = [T, React.Dispatch<React.SetStateAction<T>>];
type AuthFC = React.FC<{ user: AuthUser }>;
type UserInfoFC = React.FC<{ user: UserCol }>;

interface AppProp {
  bodyId?: string;
  title: string;
  userName: string;
  headerClass?: string;
  onSubscribeOpen?: () => void;
}
