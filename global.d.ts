/// <reference path="firebase/auth" />

///ref
interface UserEntity {
  id: string;
  createdAt: Date;
  isPremium: boolean;
  lcName: string;
  name: string;
  note: string;
  paymentId: string;
  updatedAt: Date;
  sei: string;
  mei: string;
  birth: Date;
}

interface AuthUser extends UserEntity {
  uid: string;
  picture?: string;
  phone_number?: string;
  email_verified?: boolean;
  email?: string;
}

type State<T> = [T, React.Dispatch<React.SetStateAction<T>>];
type AuthFC = React.FC<{ user: AuthUser }>;

interface AppProp {
  bodyId?: string;
  title: string;
  userName: string;
  headerClass?: string;
  onSubscribeOpen?: () => void;
}
