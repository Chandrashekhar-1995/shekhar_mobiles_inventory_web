import React from "react";
import ShortStats from "./ShortStats";
import ActionButton from "./ActionButton";
import BusinessInsightsPieChart from "../charts/BusinessInsightsPieChart";

const ButtonSection = ({ totalSales, totalPurchase, totalExpense }) => {
  return (
    <div>
      <ShortStats />
      <ActionButton />
      <BusinessInsightsPieChart sales={totalSales} purchase={totalPurchase} expense={totalExpense} />
    </div>
  )
}

export default ButtonSection;