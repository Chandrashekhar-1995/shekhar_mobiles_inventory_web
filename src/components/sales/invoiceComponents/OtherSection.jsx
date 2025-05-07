import React from "react";
import DiscountSection from "./DiscountSection";
import NotesSection from "./NotesSection";
import PaymentDetails from "./PaymentDetails";
import InvoiceSummary from "./InvoiceSummary";

const OtherSection = ({
    formData,
    setFormData,
    totalItemPrice,
    handleChange,
}) => {
    return (
        <div className="mt-4 mb-2 px-2">
            <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Discount and Sold By Section */}
                <div className="grid grid-cols-1 gap-4">
                    <DiscountSection
                        formData={formData}
                        setFormData={setFormData}
                        handleChange={handleChange}
                    />
                </div>

                {/* Notes Section */}
                <div className="grid grid-cols-1 gap-4">
                    <NotesSection
                        formData={formData}
                        setFormData={setFormData}
                        handleChange={handleChange}
                    />
                </div>
            </div>

            {/* Payment Details and Invoice Summary */}
            <div className="mt-4 space-y-4 md:space-y-0 md:grid md:grid-cols-1 lg:grid-cols-2 gap-4">
                <PaymentDetails
                    formData={formData}
                    setFormData={setFormData}
                    totalItemPrice={totalItemPrice}
                    handleChange={handleChange}
                />
                <InvoiceSummary formData={formData} totalItemPrice={totalItemPrice} />
            </div>
        </div>
    )
}

export default OtherSection;