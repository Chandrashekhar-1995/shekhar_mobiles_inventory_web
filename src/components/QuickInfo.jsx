import React from "react";
import { Box, Typography } from "@mui/material";

const QuickInfo = ({ grossSale, amountReceived, amountDue }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        padding: "16px",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        marginBottom: "16px",
      }}
    >
      <Typography
        variant="h6"
        sx={{ textAlign: "center", fontWeight: "bold", color: "#0B72B9", marginBottom: "8px" }}
      >
        Quick Info
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: "8px", fontSize: "18px" }}>
        Gross Sale: <strong>₹{grossSale || 0}</strong>
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: "8px", fontSize: "18px" }}>
        Amount Received: <strong>₹{amountReceived || 0}</strong>
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "18px" }}>
        Amount Due: <strong>₹{amountDue || 0}</strong>
      </Typography>
    </Box>
  );
};

export default QuickInfo;
