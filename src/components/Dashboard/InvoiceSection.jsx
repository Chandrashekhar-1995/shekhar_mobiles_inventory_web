import React from "react";

const InvoiceSection = () => {
    return (
        <div className="invoice-section">
            <h3>New Invoice</h3>
            <button>Add Purchase</button>
            <button>Add Cashness</button>
            <h3>Add Expense</h3>
            <button>Add Reminder</button>
            <h3>Payment In</h3>
            <button>Payment Out</button>
        </div>
    );
};

export default InvoiceSection;