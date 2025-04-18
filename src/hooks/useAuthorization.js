import useAuth from "./useAuth";

const useAuthorization = (roles) => {
    const {isAuthenticated, user} = useAuth();

    const isAuthorized = isAuthenticated && (!roles ||  roles.includes(user?.designation));

  return {isAuthorized, isAuthenticated};
};

export default useAuthorization;