import React from "react";
import { Box, Button, Grid } from "@mui/material";

const ActionButtons = () => {
  const buttons = [
    { label: "New Invoice", link: "/new-invoice" },
    { label: "New Quotation", link: "/new-quotation" },
    { label: "Add Purchase", link: "/add-purchase" },
    { label: "Add Expense", link: "/add-expense" },
    { label: "Add Customer", link: "/add-customer" },
    { label: "Add Reminder", link: "/add-reminder" },
    { label: "Payment In", link: "/payment-in" },
    { label: "Payment Out", link: "/payment-out" },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        padding: "16px",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        maxWidth: "400px", // Control container width
        margin: "0 auto", // Center the buttons on the page
      }}
    >
      <Grid container spacing={2}>
        {buttons.map((button, index) => (
          <Grid item xs={6} key={index}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                height: "60px", // Set fixed height
                backgroundColor: "#0B72B9",
                color: "#ffffff",
                "&:hover": { backgroundColor: "#0A68A5" },
                fontWeight: "bold",
                textTransform: "none",
                fontSize: "14px", // Adjust font size
              }}
              href={button.link}
            >
              {button.label}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ActionButtons;
