import SalesRoutes from "./SalesRoutes";
import PurchaseRoutes from "./PurchaseRoutes";
import ReportsRoutes from "./ReportsRoutes";
import UserRoutes from "./UserRoutes";
import CustomerRoutes from "./CustomerRoutes";
import ProductRoutes from "./Product";

const PrivateRoutes = [
  ...SalesRoutes,
  ...PurchaseRoutes,
  ...ReportsRoutes,
  ...UserRoutes,
  ...CustomerRoutes,
  ...ProductRoutes,
];

export default PrivateRoutes;
