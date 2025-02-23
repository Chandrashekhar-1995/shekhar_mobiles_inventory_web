import SalesRoutes from "./SalesRoutes";
import PurchaseRoutes from "./PurchaseRoutes";
import ReportRoutes from "./ReportRoutes";
import UserRoutes from "./UserRoutes";
import CustomerRoutes from "./CustomerRoutes";
import ProductRoutes from "./ProductRoutes";
import InventoryRoutes from "./InventoryRoutes";
import AccountRoutes from "./AccountRoutes";
import ExpenseRoutes from "./ExpenseRoutes";
import ToolsRoutes from "./ToolsRoutes";
import SettingRoutes from "./SettingRoutes";
import RepairingRoutes from "./RepairingRoutes";

const PrivateRoutes = [
  ...SalesRoutes,
  ...PurchaseRoutes,
  ...ReportRoutes,
  ...UserRoutes,
  ...CustomerRoutes,
  ...ProductRoutes,
  ...InventoryRoutes,
  ...AccountRoutes,
  ...ExpenseRoutes,
  ...ToolsRoutes,
  ...SettingRoutes,
  ...RepairingRoutes,
];

export default PrivateRoutes;
