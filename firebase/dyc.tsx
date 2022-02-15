import { useEffect } from "react";

const FirestoreDynamicProvider: React.FC = ({ children }) => {
  let test = 123123;
  console.log(test);
  useEffect(() => {
    test = 12455;
  }, []);
  return <>{children}</>;
};

export default FirestoreDynamicProvider;
