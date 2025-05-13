import React from "react";
import { useSelector } from "react-redux";

const ShortStats = () => {
  const { todaySaleSummary } = useSelector((state) => state.sales);
  const { todayPurchaseSummary } = useSelector((state) => state.purchases);
  const { todayRepairBookingSummary } = useSelector((state) => state.repairBooking);
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
            <div className="text-gray-600 text-xs">TOTAL SALE</div>
            <div className="font-bold">₹{todaySaleSummary.totalSales}</div>
        </div>
        <div>
          <div className="text-gray-600 text-xs">TOTAL INVOICES</div>
          <div className="font-bold">₹ {todaySaleSummary.invoiceCount}</div>
        </div>


        <div>
          <div className="text-gray-600 text-xs">REPAIR AMOUNT</div>
          <div className="font-bold">₹ {todayRepairBookingSummary.totalRepairPrice}</div>
        </div>
        <div>
          <div className="text-gray-600 text-xs">TOTAL REPAIR</div>
          <div className="font-bold">{todayRepairBookingSummary.bookRepairCount}</div>
      </div>

      <div className="">
          <div className="text-gray-600 text-xs">GROSS PURCHASE</div>
          <div className="font-bold">₹{todayPurchaseSummary.totalPurchases}</div>
      </div>
      <div>
        <div className="text-gray-600 text-xs">NO. OF PURCHASE</div>
        <div className="font-bold">{todayPurchaseSummary.invoiceCount}</div>
      </div>
    </div>
  )
}

export default ShortStats