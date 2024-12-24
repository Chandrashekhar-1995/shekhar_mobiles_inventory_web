import useAuth from "./useAuth";

const useAuthWithRoles = (requiredRoles = []) => {
  const { user, isAuthenticated } = useAuth();
  const hasAccess = isAuthenticated && requiredRoles.includes(user?.designation);
  return { user, isAuthenticated, hasAccess };
};

export default useAuthWithRoles;
