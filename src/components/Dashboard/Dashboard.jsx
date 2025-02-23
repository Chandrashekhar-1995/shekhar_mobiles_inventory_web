import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { Add, AddShoppingCart, AddAlarm } from '@mui/icons-material';
import Charts from './Charts';

const Dashboard = () => {
  // Sample data
  const grossSale = 1480;
  const amountReceived = 1350;
  const amountPaid = 550;
  const outstanding = 3950;
  const unpaidInvoices = 29;
  const unpaidPurchases = 12;
  const overdueInvoices = 29;
  const openQuotations = 1;
  const staffPresent = 1;

  return (
    <div className="p-4">
      <Grid container spacing={2}>
        {/* Gross Sale Card */}
        <Grid item xs={12} sm={3}>
          <Card className="shadow">
            <CardContent>
              <Typography variant="h6">Gross Sale</Typography>
              <Typography variant="h4">₹{grossSale}</Typography>
              <Typography variant="body2">No. of Invoices: 4</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Amount Received/Paid Cards */}
        <Grid item xs={12} sm={3}>
          <Card className="shadow">
            <CardContent>
              <Typography variant="h6">Amount Received</Typography>
              <Typography variant="h4">₹{amountReceived}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card className="shadow">
            <CardContent>
              <Typography variant="h6">Amount Paid</Typography>
              <Typography variant="h4">₹{amountPaid}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Vital Stats */}
        <Grid item xs={12} sm={3}>
          <Card className="shadow">
            <CardContent>
              <Typography variant="h6">Vital Stats</Typography>
              <Typography variant="body2">Amount Outstanding: ₹{outstanding}</Typography>
              <Typography variant="body2">Unpaid Invoices: {unpaidInvoices}</Typography>
              <Typography variant="body2">Unpaid Purchases: {unpaidPurchases}</Typography>
              <Typography variant="body2">Overdue Invoices: {overdueInvoices}</Typography>
              <Typography variant="body2">Open Quotation: {openQuotations}</Typography>
              <Typography variant="body2">Staff Present Today: {staffPresent}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Action Buttons */}
        <Grid item xs={12} sm={3}>
          <Card className="shadow">
            <CardContent>
              <button className="bg-blue-500 text-white p-2 rounded flex items-center mb-2 w-full">
                <Add /> New Invoice
              </button>
              <button className="bg-blue-500 text-white p-2 rounded flex items-center mb-2 w-full">
                <AddShoppingCart /> Add Purchase
              </button>
              <button className="bg-blue-500 text-white p-2 rounded flex items-center w-full">
                <AddAlarm /> Add Reminder
              </button>
            </CardContent>
        </Card>
      </Grid>
    </Grid>

    {/* Charts */}
    <Charts/>
  </div>
  );
};

export default Dashboard;