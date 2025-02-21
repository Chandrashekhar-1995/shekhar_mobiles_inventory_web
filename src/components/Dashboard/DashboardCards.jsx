import React from "react";

const DashboardCards = () => {
    return (
        <div className="dashboard-cards">
            <div className="card">
                <h3>GROSS SALE</h3>
                <p>1,460</p>
            </div>
            <div className="card">
                <h3>AUDIT RECEIVED</h3>
                <p>1,350</p>
            </div>
            <div className="card">
                <h3>NO. OF INVOICES</h3>
                <p>4</p>
            </div>
            <div className="card">
                <h3>AROOM PRO</h3>
                <p>5,550</p>
            </div>
        </div>
    );
};

export default DashboardCards;