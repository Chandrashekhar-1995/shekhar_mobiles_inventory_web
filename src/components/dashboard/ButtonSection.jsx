import React from "react";
import ShortStats from "./ShortStats";
import ActionButton from "./ActionButton";
import CombinedPieChart from "../charts/CombinedPieChart";

const ButtonSection = ({ totalSales, totalPurchase, totalExpense, totalRepairs, isMobile }) => {
  return (
    <div>
      <ShortStats />
      <ActionButton />
      <CombinedPieChart 
        sales={totalSales}
        purchase={totalPurchase}
        expense={totalExpense}
        repairs={totalRepairs}
        isMobile={isMobile}
      />
    </div>
  )
}

export default ButtonSection;