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

type State<T> = [T, React.Dispatch<React.SetStateAction<T>>];
type AuthFC = React.FC<{ user: UserEntity }>;
