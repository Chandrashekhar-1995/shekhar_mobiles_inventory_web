import AccountRoutes from "./AccountRoutes";
import ExpenseRoutes from "./ExpenseRoutes";
import InvoiceRoutes from "./InvoiceRoutes";
import MobileRoutes from "./MobileRoutes";
import ProductRoutes from "./ProductRoutes";
import PurchaseRoutes from "./PurchaseRoutes";
import RepairRoutes from "./RepairRoutes";
import SettingRoutes from "./SettingRoutes";
import UserRoutes from "./UserRoutes";

const PrivateRoutes = [
    ...UserRoutes,
    ...InvoiceRoutes,
    ...RepairRoutes,
    ...MobileRoutes,
    ...PurchaseRoutes,
    ...ExpenseRoutes,
    ...ProductRoutes,
    ...SettingRoutes,
    ...AccountRoutes,
  ];

  export default PrivateRoutes;