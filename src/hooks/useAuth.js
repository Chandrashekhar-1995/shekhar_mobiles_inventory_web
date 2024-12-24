import { useSelector } from "react-redux";
import { useMemo } from "react";

const useAuth = () => {
  const user = useSelector((store)=> store.user);
  const isAuthenticated = useMemo(() => !!user, [user]); // Memoize authentication status
  return { user, isAuthenticated };
};

export default useAuth;
