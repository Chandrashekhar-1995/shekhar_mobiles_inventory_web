import { useMemo } from "react";
import { useSelector } from "react-redux";


const useAuth = () => {
  const user = useSelector((store)=> store.user);
  const isAuthenticated = useMemo(() => !!user, [user]);

  return {user, isAuthenticated};
};

export default useAuth;