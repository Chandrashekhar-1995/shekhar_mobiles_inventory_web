import React, { useState } from 'react';
import { ShoppingCart, Inventory, People,  BarChart,  Settings,  AccountBalance,  AssignmentLate,  InterpreterMode,  AutoFixHigh,  AllInclusive} from "@mui/icons-material";
import {List, ListItem, ListItemIcon, ListItemText, Popover, } from '@mui/material';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [submenuItems, setSubmenuItems] = useState([]);
  const [popoverOpen, setPopoverOpen] = useState(false)

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
        { text: "Indirect Expense", link: "/expense/direct" },
      ]
      },
      { text: "Settings", icon: <Settings />, link: "/settings" },
    ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMouseEnter = (event, subMenu) =>{
    if(subMenu.length>0){
      setAnchorEl(event.curentTarget);
      setSubmenuItems(subMenu);
      setPopoverOpen(true)
    } else{
      setPopoverOpen(false)
    }
  };

  const handleMouseLeave = () => {
    setPopoverOpen(false); 
  };

  return (
    <div>
      {/* Hamburger Menu */}
      {!isSidebarOpen && (
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

      {/* Sidebar */}
      <div
        className={`fixed left-0 h-full bg-primary w-64 text-white text-xl shadow-md transition-transform transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col pt-4">
          <List>
            {menuItems.map((menuItem, index)=>(
              <ListItem
              key={index}
              type="button"
              onMouseEnter={(e) => handleMouseEnter(e, menuItem.subMenu)}
              onMouseLeave={handleMouseLeave}
              >
                <ListItemIcon>
                  {menuItem.icon}
                </ListItemIcon>
                <ListItemText primary={menuItem.text}/>
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
          onMouseEnter={()=>setPopoverOpen(true)}
          onMouseLeave={handleMouseLeave}
          >
            {submenuItems.map((subItem, subIndex)=>(
              <ListItem
              key={subIndex}
              type="button"
              component="a"
              href={subItem.Link}>
                <ListItemText primary={subItem.text}/>
              </ListItem>
            ))}
          </Popover>

          {/* Sidebar Content */}
          {/* <div className="flex-grow">
            <button className="w-full p-2 text-left hover:bg-blue-950 hover:bg-opacity-50">
              Sale
            </button>
            <button className="w-full p-2 text-left hover:bg-blue-950 hover:bg-opacity-50">
              Purchase
            </button>
            <button className="w-full p-2 text-left hover:bg-blue-950 hover:bg-opacity-50">
              Account
            </button>
            <button className="w-full p-2 text-left hover:bg-blue-950 hover:bg-opacity-50">
              Reports
            </button>
            <button className="w-full p-2 text-left hover:bg-blue-950 hover:bg-opacity-50">
              Customer
            </button>
          </div> */}

          {/* Cancel Button */}
          <button
            onClick={toggleSidebar}
            className=" w-full p-2 bottom-0 text-left mt-12 bg-red-600 hover:bg-red-700 hover:bg-opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
