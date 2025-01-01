import React, { useState } from "react";
import { Box, Button, Grid, Dialog } from "@mui/material";
import CreateInvoice from "./sale/CreateInvoice";
import CreateQuotation from "./sale/CreateQuotation";
import CreateCustomer from "./dextop/customer/CreateCustomer";
import Purchase from "./purchase/Purchase";
import AddExpense from "./account/AddExpense";
import ComingSoon from "./reminder/comingsoon";
import PaymentIn from "./account/PaumentIn";
import PaymentOut from "./account/PaymenyOut";


const ActionButtons = () => {
  const [activeForm, setActiveForm] = useState(null); // Tracks the active form

  const buttons = [
    { label: "New Invoice", action: () => setActiveForm("NewInvoice") },
    { label: "New Quotation", action: () => setActiveForm("NewQuotation") },
    { label: "Add Purchase", action: () => setActiveForm("AddPurchase") },
    { label: "Add Expense", action: () => setActiveForm("AddExpense") },
    { label: "Add Customer", action: () => setActiveForm("AddCustomer") },
    { label: "Add Reminder", action: () => setActiveForm("AddReminder") },
    { label: "Payment In", action: () => setActiveForm("PaymentIn") },
    { label: "Payment Out", action: () => setActiveForm("PaymentOut") },
  ];

  const closeForm = () => setActiveForm(null); // Closes the active form

  const renderForm = () => {
    switch (activeForm) {
      case "NewInvoice":
        return <CreateInvoice onClose={closeForm} />;
      case "NewQuotation":
        return <CreateQuotation onClose={closeForm} />;
      case "AddPurchase":
        return <Purchase onClose={closeForm} />;
      case "AddExpense":
        return <AddExpense onClose={closeForm} />;
      case "AddCustomer":
        return <CreateCustomer onClose={closeForm} />;
      case "AddReminder":
        return <ComingSoon onClose={closeForm} />;
      case "PaymentIn":
        return <PaymentIn onClose={closeForm} />;
      case "PaymentOut":
        return <PaymentOut onClose={closeForm} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#ffffff",
          padding: "16px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          maxWidth: "400px",
          margin: "0 auto",
        }}
      >
        <Grid container spacing={2}>
          {buttons.map((button, index) => (
            <Grid item xs={6} key={index}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  height: "60px",
                  backgroundColor: "#0B72B9",
                  color: "#ffffff",
                  "&:hover": { backgroundColor: "#0A68A5" },
                  fontWeight: "bold",
                  textTransform: "none",
                  fontSize: "14px",
                }}
                onClick={button.action}
              >
                {button.label}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Popup for Active Form */}
      <Dialog open={Boolean(activeForm)} onClose={closeForm} maxWidth="sm" fullWidth>
        {renderForm()}
      </Dialog>
    </>
  );
};

export default ActionButtons;
