import React, { useState } from "react";
import MobileActionButtons from "../dashboard/components/MobileActionButtons";
import CreateInvoice from "./invoiceComponents/CreateInvoice";

const InvoiceContainer = ({open}) => {
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  return (
    <div>
        { !open  &&
            <MobileActionButtons
            onSalesClick={() => setShowInvoiceModal(true)}
            />
        }

      <CreateInvoice
        isEditMode={false}
        showInvoiceModal={showInvoiceModal}
        setShowInvoiceModal={setShowInvoiceModal}
        onClose={() => setShowInvoiceModal(false)}
        open={open}
      />
    </div>
  );
};

export default InvoiceContainer;