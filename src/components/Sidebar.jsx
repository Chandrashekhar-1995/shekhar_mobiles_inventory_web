import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText,  Popover, Typography, Box } from "@mui/material";
import { ShoppingCart, Inventory, People,  BarChart,  Settings,  AccountBalance,  AssignmentLate,  InterpreterMode,  AutoFixHigh,  AllInclusive} from "@mui/icons-material";


const Sidebar = () => {
  const [anchorEl, setAnchorEl] = useState(null); // Track which menu is hovered
  const [submenuItems, setSubmenuItems] = useState([]); // Submenu to display
  const [popoverOpen, setPopoverOpen] = useState(false); // Control submenu visibility

  // Sidebar menu structure
  const menuItems = [
    {
      text: "Sale",
      icon: <BarChart />,
      subMenu: [
        { text: "Invoice", link: "/sale/invoice" },
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
      { text: "Add Customer", link: "/Customer/add" },
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
      { text: "Add Staff", link: "/user/create" },
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
      { text: "Indirect Expense", link: "/expense/direct" },
    ]
    },
    { text: "Settings", icon: <Settings />, link: "/settings" },
  ];

  // Handle menu hover to show submenus
  const handleMouseEnter = (event, subMenu, miniSubMenu) => {
    if (subMenu.length > 0) {
      setAnchorEl(event.currentTarget); // Set anchor for popover
      setSubmenuItems(subMenu); // Update submenu items
      setPopoverOpen(true); // Keep the popover open
      // }
      setPopoverOpen(true); // Keep the popover open
    } else {
      setPopoverOpen(false); // No submenu to show
    }
  };

  // Handle submenu leaving the popover
  const handleMouseLeave = () => {
    setPopoverOpen(false); // Close the popover
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#0B72B9",
          color: "#fff",
        },
      }}
    >
      {/* Sidebar Header */}
      <Box
        sx={{
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <Typography variant="h6" noWrap>
          Admin Panel
        </Typography>
      </Box>

      {/* Sidebar Menu */}
      <List>
        {menuItems.map((menuItem, index) => (
          <ListItem
            key={index}
            button
            onMouseEnter={(e) => handleMouseEnter(e, menuItem.subMenu)}
            onMouseLeave={handleMouseLeave}
            sx={{
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
            }}
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
        disableRestoreFocus // Prevent focus issues when clicking on submenus
        onMouseEnter={() => setPopoverOpen(true)} // Keep the submenu open
        onMouseLeave={handleMouseLeave} // Close on leave
      >
        <List>
          {submenuItems.map((subItem, subIndex) => (
            <ListItem
              key={subIndex}
              button
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
    </Drawer>
  );
};

export default Sidebar;
