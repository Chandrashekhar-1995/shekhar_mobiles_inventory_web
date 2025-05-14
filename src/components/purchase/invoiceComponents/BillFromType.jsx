import React from "react";
import { useNavigate } from "react-router-dom";
import SupplierDropdown from "../../supplier/SupplierDropdown";

const BillFromType = ({ formData, setFormData, handleChange }) => {
    const navigate = useNavigate();

    const handleCreateCustomer = (e) => {
        e.preventDefault();
        navigate("/supplier/create")
    }

    return (
        <div className="border border-base-300 rounded-md shadow-sm p-4 bg-base-100">

            <div className="form-control w-full mt-4">
                <label className="label">
                    <span className="label-text text-xs">Bill From</span>
                </label>

                <div>
                    <label className="mr-4">
                        <input
                            type="radio"
                            value="Cash"
                            name="billFrom" // Changed name to "billFrom" to match checked and formData
                            className="mx-2"
                            checked={formData.billFrom === "Cash"}
                            onChange={handleChange}
                        />
                        Cash
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Supplier"
                            name="billFrom" // Kept name as "billFrom" to match the other radio button
                            className="mx-2"
                            checked={formData.billFrom === "Supplier"}
                            onChange={handleChange}
                        />
                        Supplier
                    </label>

                    {formData.billFrom === "Supplier" && (
                        <button
                            className="bg-primary text-white font-bold px-2"
                            onClick={handleCreateCustomer}
                        >
                            +
                        </button>
                    )}
                </div>
            </div>

            {formData.billFrom === "Supplier" &&
                <SupplierDropdown
                    formData={formData}
                    setFormData={setFormData}
                    handleChange={handleChange}
                />
            }


            {/* Ek inpute placeOfSupply */}

        </div>
    );
};

export default BillFromType;