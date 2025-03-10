import React, { useState } from "react";
import { useNavigate,  Link } from "react-router-dom";
import { List, ListItem, ListItemIcon, ListItemText,  Popover, } from "@mui/material";
import { ShoppingCart, Inventory, People,  BarChart,  Settings,  AccountBalance,  AssignmentLate,  InterpreterMode,  AutoFixHigh,  AllInclusive,} from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';
import ConstructionIcon from '@mui/icons-material/Construction';

const Sidebar = () => {
  const [open,setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [submenuItems, setSubmenuItems] = useState([]);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const navigate = useNavigate();

  // Sidebar menu structure 
  const menuItems = [
    {
      text: "Sale",
      icon: <BarChart />,
      subMenu: [
        { text: "New Invoice", link: "/sales/invoice/create" },
        { text: "Manage Invoice", link: "/sales/invoice" },
        // { text: "Sale Return", link: "/sales/return" },
        // { text: "Quotation", link: "/sales/quotation" },
        // { text: "Delivery Note", link: "/sales/delivery_note" },
        // { text: "Proforma Invoice", link: "/sales/proforma_invoice" },
        { text: "Sale Order", link: "/sales/order" },
        // { text: "Credit Note", link: "/sales/credit_note" },
        // { text: "Debit Note", link: "/sales/debit_note" },
      ],
    },
    {
      text: "Repairs",
      icon: <ConstructionIcon/>,
      subMenu: [
        { text: "Book Repairing", link: "/repair/booking" },
        { text: "Manage Repairing", link: "/repair" },
      ],
    },
    {
      text: "Purchase",
      icon: <ShoppingCart />,
      subMenu: [
        { text: "New Purchase", link: "/purchase/invoice/create" },
        { text: "Manage Purchase", link: "/purchase/invoice" },
        // { text: "Purchase Order", link: "/purchase/order" }, // isi me link rahega create ka
        // { text: "Purchase Return", link: "/purchase/return" },
        // { text: "Debit Note", link: "/purchase/debit_note" },
        // { text: "Credit Note", link: "/purchase/credit_note" },
        { text: "Manage Supplier", link: "/purchase/supplier" },
        { text: "Add Supplier", link: "/purchase/supplier/create" },
      ],
    },
    // {
    //   text: "Inventory",
    //   icon: <Inventory />,
    //   subMenu: [
    //     { text: "Add Stock Adjustment", link: "/inventory/add_stock_adjustment" },
    //     // { text: "Search and Manage Stock Adjustment", link: "/inventory/search_stock_adjustment" },
    //     // { text: "Physical Stock Reconciliation", link: "/inventory/stock_reconciliation" },
    //     // { text: "Low Stock", link: "/inventory/low-stock" },
    //   ],
    // },
    // { 
    //   text: "Accounts", icon: <AccountBalance/>, subMenu: [
    //   { text: "Bank Account", link: "/account/bank_account" },
    //   // { text: "Loan Account", link: "/account/loan_account" },
    //   // { text: "Asset Account", link: "/account/asset_account" },
    //   // { text: "Capital Account", link: "/account/capital_account" },
    //   // { text: "Other Incom Account", link: "/account/other_incom_account" },
    //   // { text: "Tax Payment", link: "/account/tax_payment" },
    // ] 
    // },
    {
      text: "Expense", icon: <AssignmentLate/>, subMenu: [
      { text: "Direct Expense", link: "/expense/direct" },
      { text: "Indirect Expense", link: "/expense/indirect" },      
    ]

    },
    {
      text: "Customer", icon: <People/>, subMenu: [
      
        { text: "Add Customer", link: "/auth/user/customer/create" },
        // { text: "Manage Customers", link: "/auth/user/customer" },       
        // { text: "Manage Customer Loan", link: "/auth/user/customer/loan" },
    ]
    },
    // { 
    //   text: "Reports", icon: <BarChart/>, 
    //   subMenu: [
    //     { text: "Accounts",link: "/reports/account/", miniSubMenu: [
    //       { text: "Cash Book", link: "/reports/account/cash_book" },
    //       { text: "Business Book", link: "/reports/account/business_book" },
    //       { text: "Paymeny Paid", link: "/reports/account/payment_paid" },
    //       { text: "Paymeny Recived", link: "/reports/account/payment_recived" },
    //       { text: "Daily Summery", link: "/reports/account/daily_summery" },
    //       { text: "Input/Output Tax", link: "/reports/account/input_output_tax" },
    //       { text: "Profit & Loss Summary", link: "/reports/account/profit_loss_summery" },
    //       { text: "Chart of Accounts", link: "/reports/account/account_chart" },
    //       { text: "Balance Sheet", link: "/reports/account/balance-sheet" },
    //     ] },
    //     // { text: "Inventory", link: "/reports/inventory/", miniSubMenu: [
    //     //   { text: "Profit & Loss Summary", link: "/Reports/profit_loss_summery" },
    //     //   { text: "Chart of Accounts", link: "/Reports/account_chart" },
    //     //   { text: "Balance Sheet", link: "/balance-sheet" },
    //     // ] },
    //     // { text: "Sales", link: "/reports/sales/", miniSubMenu: [
    //     //   { text: "Cash Book", link: "/Reports/cash_book" },
    //     //   { text: "Business Book", link: "/Reports/business_book" },
    //     //   { text: "Paymeny Paid", link: "/Reports/payment_paid" },
    //     //   { text: "Paymeny Recived", link: "/Reports/payment_recived" },
    //     //   { text: "Daily Summery", link: "/Reports/Daily_summery" },
    //     //   { text: "Input/Output Tax", link: "/Reports/input_output_tax" },
    //     //   { text: "Profit & Loss Summary", link: "/Reports/profit_loss_summery" },
    //     //   { text: "Chart of Accounts", link: "/Reports/account_chart" },
    //     //   { text: "Balance Sheet", link: "/balance-sheet" },
    //     // ] },
    //     // { text: "Purchases", link: "/reports/purchases/", miniSubMenu: [
    //     //   { text: "Cash Book", link: "/Reports/cash_book" },
    //     //   { text: "Business Book", link: "/Reports/business_book" },
    //     //   { text: "Paymeny Paid", link: "/Reports/payment_paid" },
    //     //   { text: "Paymeny Recived", link: "/Reports/payment_recived" },
    //     //   { text: "Daily Summery", link: "/Reports/Daily_summery" },
    //     //   { text: "Input/Output Tax", link: "/Reports/input_output_tax" },
    //     //   { text: "Profit & Loss Summary", link: "/Reports/profit_loss_summery" },
    //     //   { text: "Chart of Accounts", link: "/Reports/account_chart" },
    //     //   { text: "Balance Sheet", link: "/balance-sheet" },
    //     // ] },
    //     // { text: "Customers", link: "/reports/customers/", miniSubMenu: [
    //     //   { text: "Cash Book", link: "/Reports/cash_book" },
    //     //   { text: "Business Book", link: "/Reports/business_book" },
    //     //   { text: "Paymeny Paid", link: "/Reports/payment_paid" },
    //     //   { text: "Paymeny Recived", link: "/Reports/payment_recived" },
    //     //   { text: "Daily Summery", link: "/Reports/Daily_summery" },
    //     //   { text: "Input/Output Tax", link: "/Reports/input_output_tax" },
    //     //   { text: "Profit & Loss Summary", link: "/Reports/profit_loss_summery" },
    //     //   { text: "Chart of Accounts", link: "/Reports/account_chart" },
    //     //   { text: "Balance Sheet", link: "/balance-sheet" },
    //     // ] },
    //     // { text: "Suppliers", link: "/reports/suppliers/", miniSubMenu: [
    //     //   { text: "Cash Book", link: "/Reports/cash_book" },
    //     //   { text: "Business Book", link: "/Reports/business_book" },
    //     //   { text: "Paymeny Paid", link: "/Reports/payment_paid" },
    //     //   { text: "Paymeny Recived", link: "/Reports/payment_recived" },
    //     //   { text: "Daily Summery", link: "/Reports/Daily_summery" },
    //     //   { text: "Input/Output Tax", link: "/Reports/input_output_tax" },
    //     //   { text: "Profit & Loss Summary", link: "/Reports/profit_loss_summery" },
    //     //   { text: "Chart of Accounts", link: "/Reports/account_chart" },
    //     //   { text: "Balance Sheet", link: "/balance-sheet" },
    //     // ] },
    //     // { text: "Expenses", link: "/reports/expenses/", miniSubMenu: [
    //     //   { text: "Cash Book", link: "/Reports/cash_book" },
    //     //   { text: "Business Book", link: "/Reports/business_book" },
    //     //   { text: "Paymeny Paid", link: "/Reports/payment_paid" },
    //     //   { text: "Paymeny Recived", link: "/Reports/payment_recived" },
    //     //   { text: "Daily Summery", link: "/Reports/Daily_summery" },
    //     //   { text: "Input/Output Tax", link: "/Reports/input_output_tax" },
    //     //   { text: "Profit & Loss Summary", link: "/Reports/profit_loss_summery" },
    //     //   { text: "Chart of Accounts", link: "/Reports/account_chart" },
    //     //   { text: "Balance Sheet", link: "/balance-sheet" },
    //     // ] },
    //     // { text: "Staff", link: "/reports/staff/", miniSubMenu: [
    //     //   { text: "Cash Book", link: "/Reports/cash_book" },
    //     //   { text: "Business Book", link: "/Reports/business_book" },
    //     //   { text: "Paymeny Paid", link: "/Reports/payment_paid" },
    //     //   { text: "Paymeny Recived", link: "/Reports/payment_recived" },
    //     //   { text: "Daily Summery", link: "/Reports/Daily_summery" },
    //     //   { text: "Input/Output Tax", link: "/Reports/input_output_tax" },
    //     //   { text: "Profit & Loss Summary", link: "/Reports/profit_loss_summery" },
    //     //   { text: "Chart of Accounts", link: "/Reports/account_chart" },
    //     //   { text: "Balance Sheet", link: "/balance-sheet" },
    //     // ] },
    //     // { text: "GSTR", link: "/reports/gstr/", miniSubMenu: [
    //     //   { text: "Cash Book", link: "/Reports/cash_book" },
    //     //   { text: "Business Book", link: "/Reports/business_book" },
    //     //   { text: "Paymeny Paid", link: "/Reports/payment_paid" },
    //     //   { text: "Paymeny Recived", link: "/Reports/payment_recived" },
    //     //   { text: "Daily Summery", link: "/Reports/Daily_summery" },
    //     //   { text: "Input/Output Tax", link: "/Reports/input_output_tax" },
    //     //   { text: "Profit & Loss Summary", link: "/Reports/profit_loss_summery" },
    //     //   { text: "Chart of Accounts", link: "/Reports/account_chart" },
    //     //   { text: "Balance Sheet", link: "/balance-sheet" },
    //     // ] },
    //   ]
    // },
    // { 
    //   text: "Staff", icon: <InterpreterMode/>, subMenu: [
    //   { text: "Add Staff", link: "/auth/user/create" },
    //   { text: "Search and Manage Staff", link: "/auth/user/manage" },
    // ] 
    // },
    { 
      text: "Tools", icon: <AutoFixHigh/>, subMenu: [
      // { text: "Reminders", link: "/tools/reminders" },
      // { text: "Send SMS", link: "/tools/send_sms" },
      // { text: "Send Gmail", link: "/tools/send_gmail" },
      // { text: "GST Calculator", link: "/tools/gst_calculator" },
      // { text: "Barcode Generator", link: "/tools/barcode_generator" },
      { text: "Import Customer", link: "/auth/user/customer/bulk-upload" },
      { text: "Import Item", link: "/product/bulk-upload" },
    ]
    },
    { 
      text: "Master", icon: <AllInclusive/>, subMenu: [
      { text: "Add Product", link: "/product/create" },
      // { text: "Add Service", link: "/service/create" },
      // { text: "Manage Services", link: "/service/create" },
      // { text: "Discount Schemes", link: "/service/create" },
      // { text: "Brand Master", link: "/service/create" },
      // { text: "Category Master", link: "/service/create" },
      // { text: "Bank Master", link: "/service/create" },
      // { text: "Miscellaneous ", link: "/service/create" },
    ]
    },
    { text: "Settings", icon: <Settings />, link: "/settings" },
  ];

  const toggleSidebar = () => {
    setOpen(!open);   
  }
  
  // Handle menu hover to show submenus
  const handleMouseEnter = (event, subMenu) => {
    if (subMenu.length > 0) {
      setAnchorEl(event.currentTarget); 
      setSubmenuItems(subMenu);
      setPopoverOpen(true);
    } else {
      setPopoverOpen(false);
    }
  };

  // Handle submenu leaving the popover
  const handleMouseLeave = () => {
    setPopoverOpen(false); 
  };
  
  return (
    <>
      {/* Hamburger Menu */}
      {!open && (
        <button
          className="p-2 m-4 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring-2"
          onClick={toggleSidebar}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}
       {/* transition-transform transform ${ open ? 'translate-x-0' : '-translate-x-full'}  ye line niche rahega*/}
      <div className={`fixed left-0 h-full bg-primary w-64 text-white text-xl shadow-md
        `}>
        {/* Sidebar Menu */}
              <List>
                {menuItems.map((menuItem, index) => (
                  <ListItem
                    key={index}
                    type="button"
                    onClick={(e) => {
                      if(menuItem.subMenu?.length){
                      handleMouseEnter(e, menuItem.subMenu);
                    } else if(menuItem.link){
                      navigate(menuItem.link);
                    }
                      }}
                    onMouseLeave={handleMouseLeave}
                    className="w-full p-2 text-left hover:bg-blue-950 hover:bg-opacity-50"
                  >
                    <ListItemIcon sx={{ color: "#fff" }}>{menuItem.icon}</ListItemIcon>
                    <ListItemText primary={menuItem.text} />
                  </ListItem>
                ))}
              </List>
        
              {/* Submenu Popover */}
              <Popover
                open={popoverOpen}
                anchorEl={anchorEl}
                onClose={handleMouseLeave}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                PaperProps={{
                  sx: {
                    backgroundColor: "#fff",
                    color: "#000",
                    width: 200,
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
                  },
                }}
                disableRestoreFocus
                onMouseEnter={() => setPopoverOpen(true)}
                onMouseLeave={handleMouseLeave} // Close on leave
              >
                <List>
                  {submenuItems.map((subItem, subIndex) => (
                    <ListItem
                      key={subIndex}
                      type="button"
                      component={Link}
                      to={subItem.link}
                      sx={{
                        "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.1)" },
                      }}
                    >
                      <ListItemText primary={subItem.text} />
                    </ListItem>
                  ))}
                </List>
              </Popover>
          {/* Cancel Button */}
          <ListItem
          type="button"
          className=" w-full bottom-0 text-left bg-red-600 hover:bg-red-700 hover:bg-opacity-50"
          onClick={toggleSidebar}>
            <CloseIcon/> 
            <ListItemText className="px-8"> Close</ListItemText>
          </ListItem>
      </div>
    </>
  )
};
export default Sidebar