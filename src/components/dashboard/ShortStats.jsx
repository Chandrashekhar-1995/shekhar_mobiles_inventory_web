import React from "react";
import { useSelector } from "react-redux";

const ShortStats = () => {
  const { todaySaleSummary } = useSelector((state) => state.sales);
  const { todayPurchaseSummary } = useSelector((state) => state.purchases);
  return (
    <div className="container mx-auto grid grid-cols-2 gap-2 bg-white">
        <div>
          Dashboard
        </div>
        <div>
        Today dropdown
        </div>

        {/* Div for show stats */}
        <div className="">
            <div className="text-gray-600">GROSS SALE</div>
            <div className="font-bold">₹{todaySaleSummary.totalSales}</div>
        </div>
        <div>
          <div className="text-gray-600">NO. OF INVOICES</div>
          <div className="font-bold">{todaySaleSummary.invoiceCount}</div>
        </div>


        <div>
          <div className="text-gray-600">REPAIR AMOUNT</div>
          <div className="font-bold">₹ 1,350</div>
        </div>
        <div>
          <div className="text-gray-600">REPAIR COUNT</div>
          <div className="font-bold">₹ 1</div>
      </div>

      <div className="">
          <div className="text-gray-600">GROSS PURCHASE</div>
          <div className="font-bold">₹{todayPurchaseSummary.totalPurchases}</div>
      </div>
      <div>
        <div className="text-gray-600">NO. OF PURCHASE</div>
        <div className="font-bold">{todayPurchaseSummary.invoiceCount}</div>
      </div>
    </div>
  )
}

export default ShortStats