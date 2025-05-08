import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { 
  ShoppingCartIcon, ChartBarIcon, WrenchIcon, ExclamationTriangleIcon,
  UsersIcon, SparklesIcon, ArrowsRightLeftIcon, CogIcon,
  ChevronRightIcon,BanknotesIcon, NewspaperIcon,
} from "@heroicons/react/24/outline";

const SidebarLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const sidebarRef = useRef(null);
  const submenuRef = useRef(null);

  const menuItems = [
      {
        text: "Sale",
        icon: <ChartBarIcon className="h-5 w-5" />,
        subMenu: [
          { text: "Manage Invoice", link: "/sales/invoice" },
          { text: "New Invoice", link: "/sales/invoice/create" },
          // { text: "Sale Return", link: "/sales/return" },
          // { text: "Quotation", link: "/sales/quotation" },
          // { text: "Delivery Note", link: "/sales/delivery_note" },
          { text: "Sale Order", link: "/sales/order" },
          // { text: "Credit Note", link: "/sales/credit_note" },
          // { text: "Debit Note", link: "/sales/debit_note" },
        ],
      },
      {
        text: "Repairs",
        icon: <WrenchIcon className="h-5 w-5" />,
        subMenu: [
          { text: "Manage Repairing", link: "/repair" },
          { text: "Book Repairing", link: "/repair/booking" },
        ],
      },
      {
        text: "Purchase",
        icon: <ShoppingCartIcon className="h-5 w-5" />,
        subMenu: [
          { text: "Manage Purchase", link: "/purchase/invoice" },
          { text: "New Purchase", link: "/purchase/invoice/create" },
          // { text: "Purchase Order", link: "/purchase/order" }, // isi me link rahega create ka
          // { text: "Purchase Return", link: "/purchase/return" },
          // { text: "Debit Note", link: "/purchase/debit_note" },
          // { text: "Credit Note", link: "/purchase/credit_note" },
          { text: "Manage Supplier", link: "/purchase/supplier/manage" },
          { text: "Add Supplier", link: "/purchase/supplier/create" },
        ],
      },
      {
      text: "Inventory",
      icon: <NewspaperIcon className="h-5 w-5" />,
      subMenu: [
        { text: "Manage ", link: "/product" },
        // { text: "Add Stock Adjustment", link: "/inventory/add_stock_adjustment" },
        // { text: "Search and Manage Stock Adjustment", link: "/inventory/search_stock_adjustment" },
        // { text: "Physical Stock Reconciliation", link: "/inventory/stock_reconciliation" },
        // { text: "Low Stock", link: "/inventory/low-stock" },
      ],
    },
    { 
      text: "Accounts", icon: <BanknotesIcon className="h-5 w-5" />, subMenu: [
      { text: "Manage Accounts", link: "/account" },
      { text: "Create Accounts", link: "/account/create" },
      // { text: "Bank Account", link: "/account/bank_account" },
      // { text: "Loan Account", link: "/account/loan_account" },
      // { text: "Asset Account", link: "/account/asset_account" },
      // { text: "Capital Account", link: "/account/capital_account" },
      // { text: "Other Incom Account", link: "/account/other_incom_account" },
      // { text: "Tax Payment", link: "/account/tax_payment" },
    ] 
    },
      {
        text: "Expense", 
        icon: <ExclamationTriangleIcon className="h-5 w-5" />, 
        subMenu: [
          { text: "Direct Expense", link: "/expense/direct" },
          { text: "Indirect Expense", link: "/expense/indirect" },      
        ]
      },
      {
        text: "Customer", 
        icon: <UsersIcon className="h-5 w-5" />, 
        subMenu: [
          { text: "Manage Customers", link: "user/customer/manage" },
          { text: "Add Customer", link: "/user/customer/create" },
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
    { 
      text: "Staff", 
      icon: <UsersIcon className="h-5 w-5" />,
      subMenu: [
        { text: "Manage Staff", link: "/user" },
        { text: "Add Staff", link: "/user/create" },
    ] 
    },
      { 
        text: "Tools", 
        icon: <SparklesIcon className="h-5 w-5" />, 
        subMenu: [
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
        text: "Master", 
        icon: <ArrowsRightLeftIcon className="h-5 w-5" />, 
        subMenu: [
          { text: "Add Product", link: "/product/create" },
          { text: "Add Mobile", link: "/mobile/create" },
          { text: "Repair Process", link: "/repair-process" },
          { text: "Problems", link: "/fault" },
          // { text: "Add Service", link: "/service/create" },
          // { text: "Manage Services", link: "/service/create" },
          // { text: "Discount Schemes", link: "/service/create" },
          // { text: "Brand Master", link: "/service/create" },
          // { text: "Category Master", link: "/service/create" },
          // { text: "Bank Master", link: "/service/create" },
          // { text: "Miscellaneous ", link: "/service/create" },
        ]
      },
      { 
        text: "Settings", 
        icon: <CogIcon className="h-5 w-5" />, 
        link: "/settings" 
      },
    ];

  const handleItemClick = (e, index) => {
    const itemRect = e.currentTarget.getBoundingClientRect();
    setPopupPosition({
      top: itemRect.top + 10,
      left: sidebarOpen ? itemRect.right - 100 : itemRect.right + 70
    });
    setActiveSubmenu(activeSubmenu === index ? null : index);
    };

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target) &&
        (!submenuRef.current || !submenuRef.current.contains(e.target))) {
      setActiveSubmenu(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex h-screen bg-base-100" >
      <div 
      ref={sidebarRef}
        className={`transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20 overflow-hidden"
        }`}
      >
        <div className="h-full flex flex-col bg-primary">

           {/* Sidebar Header */}
           {/* <div className="p-4 border-b border-base-300 flex items-center justify-between">
             <h1 className="text-xl text-white">DASHBOARD</h1>
             <button 
               onClick={() => setSidebarOpen(!sidebarOpen)} 
               className="text-white btn btn-sm btn-circle btn-ghost"
             >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div> */}

          {/* Sidebar Menu */}
          <div className="flex-1 overflow-y-auto ">
            <ul className="p-2">
              {menuItems.map((item, index) => (
                <li key={index}>
                  {item.subMenu ? (
                    <>
                      <button className="w-full text-left text-white hover:text-black hover:bg-base-300 rounded-sm flex items-center p-2 justify-between"
                        onClick={(e) => handleItemClick(e, index)}
                        onMouseEnter={(e) => handleItemClick(e, index)}
                      >
                        <div className="flex items-center ">
                          {item.icon}
                          {sidebarOpen && <span className="ml-2">{item.text}</span>}
                        </div>
                        {sidebarOpen && <ChevronRightIcon className="h-4 w-4" />}
                      </button>
                      {/* popup Submenu */}
                      {activeSubmenu === index && (
                        <div 
                          className={`absolute z-50 bg-base-100 shadow-2xl rounded-box p-2 min-w-[200px] border border-base-300 ${
                            !sidebarOpen ? "ml-4" : ""
                          }`}
                          style={{
                            top: `${popupPosition.top}px`,
                            left: `${popupPosition.left}px`
                          }}
                        >
                          <ul>
                            {item.subMenu.map((subItem, subIndex) => (
                              <li key={subIndex}>
                                <Link
                                  to={subItem.link}
                                  className="hover:bg-primary rounded-lg block p-2"
                                  // onMouseLeave={() => setActiveSubmenu(null)}
                                  onClick={() => setActiveSubmenu(null)}
                                  >
                                    {subItem.text}
                                  </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  ) :(
                    <Link
                      to={item.link || "#"}
                      className="hover:bg-base-300 text-white hover:text-black rounded-sm flex items-center p-2"
                    >
                      {item.icon}
                      {sidebarOpen && <span className="ml-2">{item.text}</span>}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content - takes remaining space */}
      <div className="flex-1 overflow-auto">
        {/* Toggle button when sidebar is closed */}
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="fixed m-4 btn btn-square btn-sm z-10"
          >
            <svg
              className="w-5 h-5"
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

        {/* Page Content */}
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};


export default SidebarLayout;
