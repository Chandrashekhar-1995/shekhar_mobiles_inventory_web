import React from "react";
import DiscountSection from "./DiscountSection";

const OtherSection = ({
    formData,
    setFormData,
    handleChange,
}) => {
  return (
    <div className="md:grid md:grid-cols-2 lg:grid lg:grid-cols-4 gap-4 mx-2 mt-4 mb-2">
        {/* discount section */}
        <div className="md:col-span-1 md:grid md:grid-cols-2 gap-4">
            <DiscountSection 
            formData={formData}
            setFormData={setFormData}
            handleChange={handleChange}
            />
        </div>
    </div>
  )
}

export default OtherSection;