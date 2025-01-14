import React, { useState } from "react";
import { List, ListItem, ListItemIcon, ListItemText,  Popover, } from "@mui/material";
import { ShoppingCart, Inventory, People,  BarChart,  Settings,  AccountBalance,  AssignmentLate,  InterpreterMode,  AutoFixHigh,  AllInclusive,} from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';

const Sidebar = () => {
  const [open,setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
    const [submenuItems, setSubmenuItems] = useState([]);
    const [popoverOpen, setPopoverOpen] = useState(false);

  // Sidebar menu structure
  const menuItems = [
    {
      text: "Sale",
      icon: <BarChart />,
      subMenu: [
        { text: "New Invoice", link: "/sales/invoice/create" },
        { text: "Search Invoice", link: "/sale/invoice/search" },
        { text: "Sale Return", link: "/sale/return" },
        { text: "Quotation", link: "/sale/quotation" },
        { text: "Delivery Note", link: "/sale/delivery_note" },
        { text: "Proforma Invoice", link: "/sale/proforma_invoice" },
        { text: "Sale Order", link: "/sale/order" },
        { text: "Credit Note", link: "/sale/credit_note" },
        { text: "Debit Note", link: "/sale/debit_note" },
      ],
    },
    {
      text: "Purchase",
      icon: <ShoppingCart />,
      subMenu: [
        { text: "Purchase Bill", link: "/purchase/invoice" },
        { text: "Purchase Order", link: "/purchase/order" },
        { text: "Purchase Return", link: "/purchase/return" },
        { text: "Debit Note", link: "/purchase/debit_note" },
        { text: "Credit Note", link: "/purchase/credit_note" },
        { text: "Supplier", link: "/purchase/supplier" },
      ],
    },
    {
      text: "Inventory",
      icon: <Inventory />,
      subMenu: [
        { text: "Add Stock Adjustment", link: "/inventory/add_stock_adjustment" },
        { text: "Search and Manage Stock Adjustment", link: "/inventory/search_stock_adjustment" },
        { text: "Physical Stock Reconciliation", link: "/inventory/stock_reconciliation" },
        { text: "Low Stock", link: "/inventory/low-stock" },
      ],
    },
    { text: "Accounts", icon: <AccountBalance/>, subMenu: [
      { text: "Bank Account", link: "/account/bank_account" },
      { text: "Loan Account", link: "/account/loan_account" },
      { text: "Asset Account", link: "/account/asset_account" },
      { text: "Capital Account", link: "/account/capital_account" },
      { text: "Other Incom Account", link: "/account/other_incom_account" },
      { text: "Tax Payment", link: "/account/tax_payment" },
    ] 
    },
    { text: "Expense", icon: <AssignmentLate/>, subMenu: [
      { text: "Direct Expense", link: "/expense/direct" },
      { text: "Indirect Expense", link: "/expense/direct" },      
    ]

    },
    { text: "Customer", icon: <People/>, subMenu: [
      { text: "Add Customer", link: "/auth/user/customer/create" }, 
      { text: "Search and Manage Customers", link: "/Customer/search" },
      { text: "Add Customer Loan", link: "/Customer/loan/add" },
      { text: "Search and Manage Customer Loans", link: "/Customer/loan/manage" },
    ]
    },
    { text: "Reports", icon: <BarChart/>, subMenu: [
      { text: "Accounts", miniSubMenu: [
        { text: "Cash Book", link: "/Reports/cash_book" },
        { text: "Business Book", link: "/Reports/business_book" },
        { text: "Paymeny Paid", link: "/Reports/payment_paid" },
        { text: "Paymeny Recived", link: "/Reports/payment_recived" },
        { text: "Daily Summery", link: "/Reports/Daily_summery" },
        { text: "Input/Output Tax", link: "/Reports/input_output_tax" },
        { text: "Profit & Loss Summary", link: "/Reports/profit_loss_summery" },
        { text: "Chart of Accounts", link: "/Reports/account_chart" },
        { text: "Balance Sheet", link: "/balance-sheet" },
      ] },
      { text: "Inventory", miniSubMenu: [
        { text: "Cash Book", link: "/Reports/cash_book" },
        { text: "Business Book", link: "/Reports/business_book" },
        { text: "Paymeny Paid", link: "/Reports/payment_paid" },
        { text: "Paymeny Recived", link: "/Reports/payment_recived" },
        { text: "Daily Summery", link: "/Reports/Daily_summery" },
        { text: "Input/Output Tax", link: "/Reports/input_output_tax" },
        { text: "Profit & Loss Summary", link: "/Reports/profit_loss_summery" },
        { text: "Chart of Accounts", link: "/Reports/account_chart" },
        { text: "Balance Sheet", link: "/balance-sheet" },
      ] },
      { text: "Sales", miniSubMenu: [
        { text: "Cash Book", link: "/Reports/cash_book" },
        { text: "Business Book", link: "/Reports/business_book" },
        { text: "Paymeny Paid", link: "/Reports/payment_paid" },
        { text: "Paymeny Recived", link: "/Reports/payment_recived" },
        { text: "Daily Summery", link: "/Reports/Daily_summery" },
        { text: "Input/Output Tax", link: "/Reports/input_output_tax" },
        { text: "Profit & Loss Summary", link: "/Reports/profit_loss_summery" },
        { text: "Chart of Accounts", link: "/Reports/account_chart" },
        { text: "Balance Sheet", link: "/balance-sheet" },
      ] },
      { text: "Customers", miniSubMenu: [
        { text: "Cash Book", link: "/Reports/cash_book" },
        { text: "Business Book", link: "/Reports/business_book" },
        { text: "Paymeny Paid", link: "/Reports/payment_paid" },
        { text: "Paymeny Recived", link: "/Reports/payment_recived" },
        { text: "Daily Summery", link: "/Reports/Daily_summery" },
        { text: "Input/Output Tax", link: "/Reports/input_output_tax" },
        { text: "Profit & Loss Summary", link: "/Reports/profit_loss_summery" },
        { text: "Chart of Accounts", link: "/Reports/account_chart" },
        { text: "Balance Sheet", link: "/balance-sheet" },
      ] },
      { text: "Purchases", miniSubMenu: [
        { text: "Cash Book", link: "/Reports/cash_book" },
        { text: "Business Book", link: "/Reports/business_book" },
        { text: "Paymeny Paid", link: "/Reports/payment_paid" },
        { text: "Paymeny Recived", link: "/Reports/payment_recived" },
        { text: "Daily Summery", link: "/Reports/Daily_summery" },
        { text: "Input/Output Tax", link: "/Reports/input_output_tax" },
        { text: "Profit & Loss Summary", link: "/Reports/profit_loss_summery" },
        { text: "Chart of Accounts", link: "/Reports/account_chart" },
        { text: "Balance Sheet", link: "/balance-sheet" },
      ] },
      { text: "Suppliers", miniSubMenu: [
        { text: "Cash Book", link: "/Reports/cash_book" },
        { text: "Business Book", link: "/Reports/business_book" },
        { text: "Paymeny Paid", link: "/Reports/payment_paid" },
        { text: "Paymeny Recived", link: "/Reports/payment_recived" },
        { text: "Daily Summery", link: "/Reports/Daily_summery" },
        { text: "Input/Output Tax", link: "/Reports/input_output_tax" },
        { text: "Profit & Loss Summary", link: "/Reports/profit_loss_summery" },
        { text: "Chart of Accounts", link: "/Reports/account_chart" },
        { text: "Balance Sheet", link: "/balance-sheet" },
      ] },
      { text: "Expenses", miniSubMenu: [
        { text: "Cash Book", link: "/Reports/cash_book" },
        { text: "Business Book", link: "/Reports/business_book" },
        { text: "Paymeny Paid", link: "/Reports/payment_paid" },
        { text: "Paymeny Recived", link: "/Reports/payment_recived" },
        { text: "Daily Summery", link: "/Reports/Daily_summery" },
        { text: "Input/Output Tax", link: "/Reports/input_output_tax" },
        { text: "Profit & Loss Summary", link: "/Reports/profit_loss_summery" },
        { text: "Chart of Accounts", link: "/Reports/account_chart" },
        { text: "Balance Sheet", link: "/balance-sheet" },
      ] },
      { text: "Staff", miniSubMenu: [
        { text: "Cash Book", link: "/Reports/cash_book" },
        { text: "Business Book", link: "/Reports/business_book" },
        { text: "Paymeny Paid", link: "/Reports/payment_paid" },
        { text: "Paymeny Recived", link: "/Reports/payment_recived" },
        { text: "Daily Summery", link: "/Reports/Daily_summery" },
        { text: "Input/Output Tax", link: "/Reports/input_output_tax" },
        { text: "Profit & Loss Summary", link: "/Reports/profit_loss_summery" },
        { text: "Chart of Accounts", link: "/Reports/account_chart" },
        { text: "Balance Sheet", link: "/balance-sheet" },
      ] },
      { text: "GSTR", miniSubMenu: [
        { text: "Cash Book", link: "/Reports/cash_book" },
        { text: "Business Book", link: "/Reports/business_book" },
        { text: "Paymeny Paid", link: "/Reports/payment_paid" },
        { text: "Paymeny Recived", link: "/Reports/payment_recived" },
        { text: "Daily Summery", link: "/Reports/Daily_summery" },
        { text: "Input/Output Tax", link: "/Reports/input_output_tax" },
        { text: "Profit & Loss Summary", link: "/Reports/profit_loss_summery" },
        { text: "Chart of Accounts", link: "/Reports/account_chart" },
        { text: "Balance Sheet", link: "/balance-sheet" },
      ] },
    ]
    },
    { text: "Staff", icon: <InterpreterMode/>, subMenu: [
      { text: "Add Staff", link: "/auth/user/create" },
      { text: "Search and Manage Staff", link: "/admin/user/update" },
    ] 
      },
    { text: "Tools", icon: <AutoFixHigh/>, subMenu: [
      { text: "Reminders", link: "/tools/reminders" },
      { text: "Send SMS", link: "/tools/send_sms" },
      { text: "Send Gmail", link: "/tools/send_gmail" },
      { text: "GST Calculator", link: "/tools/gst_calculator" },
      { text: "Barcode Generator", link: "/tools/barcode_generator" },
      { text: "Import Item", link: "/tools/product/bulk-upload" },
    ]
     },
    { text: "Master", icon: <AllInclusive/>, subMenu: [
      { text: "Add Product", link: "/product/create" },
      { text: "Add Service", link: "/product/create" },
      { text: "Search and Manage Items", link: "/product/create" },
      { text: "Discount Schemes", link: "/product/create" },
      { text: "Brand Master", link: "/brand/create" },
      { text: "Category Master", link: "/product/create" },
      { text: "Bank Master", link: "/product/create" },
      { text: "Miscellaneous ", link: "/product/create" },
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
      <div className={`fixed left-0 h-full bg-primary w-64 text-white text-xl shadow-md transition-transform transform ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}>
        {/* Sidebar Menu */}
              <List>
                {menuItems.map((menuItem, index) => (
                  <ListItem
                    key={index}
                    type="button"
                    onClick={(e) => handleMouseEnter(e, menuItem.subMenu)}
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
                      component="a"
                      href={subItem.link}
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