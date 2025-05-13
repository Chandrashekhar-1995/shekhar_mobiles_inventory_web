import React from "react";
import ShortStats from "./ShortStats";
import ActionButton from "./ActionButton";
import BusinessInsightsPieChart from "../charts/BusinessInsightsPieChart";
import RepairSaleRatioPieChart from "../charts/RepairSaleRatioPieChart";

const ButtonSection = ({ totalSales, totalPurchase, totalExpense, totalRepairs, isMobile }) => {
  return (
    <div>
      <ShortStats />
      <ActionButton />
      <BusinessInsightsPieChart sales={totalSales} purchase={totalPurchase} expense={totalExpense} isMobile={isMobile}/>
      <RepairSaleRatioPieChart sales={totalSales} repairs={totalRepairs} isMobile={isMobile}/>
    </div>
  )
}

export default ButtonSection;