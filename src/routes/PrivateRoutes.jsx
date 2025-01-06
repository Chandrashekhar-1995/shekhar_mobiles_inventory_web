import SalesRoutes from "./SalesRoutes";
import PurchaseRoutes from "./PurchaseRoutes";
import ReportsRoutes from "./ReportsRoutes";
import UserRoutes from "./UserRoutes";

const PrivateRoutes = [
  ...SalesRoutes,
  ...PurchaseRoutes,
  ...ReportsRoutes,
  ...UserRoutes,
];

export default PrivateRoutes;
