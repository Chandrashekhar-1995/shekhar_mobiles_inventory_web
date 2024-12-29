import React, { useState } from "react";
import { Box, Button, Grid, Dialog } from "@mui/material";
import CreateCustomer from "./customer/CreateCustomer";

const ActionButtons = () => {
  const [isCustomerPopupOpen, setCustomerPopupOpen] = useState(false);

  const buttons = [
    { label: "New Invoice", link: "/new-invoice" },
    { label: "New Quotation", link: "/new-quotation" },
    { label: "Add Purchase", link: "/add-purchase" },
    { label: "Add Expense", link: "/add-expense" },
    {
      label: "Add Customer",
      action: () => setCustomerPopupOpen(true),
    },
    { label: "Add Reminder", link: "/add-reminder" },
    { label: "Payment In", link: "/payment-in" },
    { label: "Payment Out", link: "/payment-out" },
  ];

  const handleNavigate = (link) => {
    navigate(link);
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

      {/* Popup for Create Customer */}
      <Dialog open={isCustomerPopupOpen} onClose={() => setCustomerPopupOpen(false)} maxWidth="sm" fullWidth>
        <CreateCustomer onClose={() => setCustomerPopupOpen(false)} />
      </Dialog>
    </>
  );
};

export default ActionButtons;