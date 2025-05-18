import React, { useState } from "react";
import BookingRepair from "../../repairs/BookingRepair";
import CreateInvoice from "../../sales/invoiceComponents/CreateInvoice";
import CreatePurchaseInvoice from "../../purchase/CreatePurchaseInvoice";

const MobileActionButtons = () => {
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showRepairModal, setShowRepairModal] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  return(
  <div className="col-span-12 flex justify-around p-2 bg-white shadow-md">
    
    <button
      className="p-2 bg-blue-500 text-white rounded"
      onClick={() =>{setShowInvoiceModal(true)}}
      >
      New Sale
    </button>
    <button
      className="p-2 bg-green-500 text-white rounded"
      onClick={() =>{setShowRepairModal(true)}}
    >
      Book Repair
    </button>

    <button
      className="p-2 bg-green-500 text-white rounded"
      onClick={() =>{setShowPurchaseModal(true)}}
    >
      New Purchase
    </button>

    <BookingRepair
        showRepairModal={showRepairModal}
        setShowRepairModal={setShowRepairModal}
        onClose={() => setShowRepairModal(false)}
      />
    
    <CreateInvoice
        showInvoiceModal={showInvoiceModal}
        setShowInvoiceModal={setShowInvoiceModal}
        onClose={() => setShowInvoiceModal(false)}
      />
    
    <CreatePurchaseInvoice
        showPurchaseModal={showPurchaseModal}
        setShowPurchaseModal={setShowPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
      />

  </div>
)
};

export default MobileActionButtons;
