import ExpenseRoutes from "./ExpenseRoutes";
import InvoiceRoutes from "./InvoiceRoutes";
import ProductRoutes from "./ProductRoutes";
import PurchaseRoutes from "./PurchaseRoutes";
import RepairRoutes from "./RepairRoutes";
import SettingRoutes from "./SettingRoutes";
import UserRoutes from "./UserRoutes";

const PrivateRoutes = [
    ...UserRoutes,
    ...InvoiceRoutes,
    ...RepairRoutes,
    ...PurchaseRoutes,
    ...ExpenseRoutes,
    ...ProductRoutes,
    ...SettingRoutes,
  ];

  export default PrivateRoutes;