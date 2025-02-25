import UserRoutes from "./UserRoutes";
import SalesRoutes from "./SalesRoutes";
const PrivateRoutes = [
  ...UserRoutes,
  ...SalesRoutes
  
];

export default PrivateRoutes;
