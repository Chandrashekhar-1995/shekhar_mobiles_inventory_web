import SalesRoutes from "./SalesRoutes";
import PurchaseRoutes from "./PurchaseRoutes";
import ReportsRoutes from "./ReportsRoutes";
import UserRoutes from "./UserRoutes";
import CustomerRoutes from "./CustomerRoutes";

const PrivateRoutes = [
  ...SalesRoutes,
  ...PurchaseRoutes,
  ...ReportsRoutes,
  ...UserRoutes,
  ...CustomerRoutes,
];

export default PrivateRoutes;
