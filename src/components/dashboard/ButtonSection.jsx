import React from "react";
import ShortStats from "./ShortStats";
import ActionButton from "./ActionButton";
import BusinessInsightsPieChart from "../charts/BusinessInsightsPieChart";
import RepairSaleRatioPieChart from "../charts/RepairSaleRatioPieChart";

const ButtonSection = ({ totalSales, totalPurchase, totalExpense, totalRepairs }) => {
  return (
    <div>
      <ShortStats />
      <ActionButton />
      <BusinessInsightsPieChart sales={totalSales} purchase={totalPurchase} expense={totalExpense} />
      <RepairSaleRatioPieChart sales={totalSales} repairs={totalRepairs} />
    </div>
  )
}

export default ButtonSection;