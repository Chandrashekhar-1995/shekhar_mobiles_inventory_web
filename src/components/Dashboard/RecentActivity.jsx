import React from "react";

const RecentActivity = () => {
    return (
        <div className="recent-activity">
            <h3>Recent Activity</h3>
            <ul>
                <li>Customer Due</li>
                <li>Supplier Due</li>
                <li>Amount Received</li>
                <li>Amount Paid</li>
                <li>Last 30 days</li>
            </ul>
        </div>
    );
};

export default RecentActivity;