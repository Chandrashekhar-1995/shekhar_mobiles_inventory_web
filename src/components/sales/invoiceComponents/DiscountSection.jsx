import React from "react";
import { useSelector } from "react-redux";

const DiscountSection = ({
    formData,
    setFormData,
    handleChange,
}) => {
    const allUsers = useSelector((store) => store.allUsers.allUsers);
    const totalItemQuantity = formData.items.reduce((total, item) => total + item.quantity, 0);

    const handlefinalDiscountChange = (e) => {
        const value = e.target.value === "" ? "" : parseFloat(e.target.value);
        setFormData((prev) => ({
            ...prev,
            discountAmount: value >= 0 ? value : 0,
        }));
    };

    return (
        <div className="bg-base-100 border border-base-300 rounded-md shadow-sm p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                {/* Total Quantity */}
                <div>
                    <label className="block text-xs font-medium text-gray-600">Total Quantity</label>
                    <input
                        type="text"
                        className="mt-1 block w-full border bg-yellow-100 border-gray-300 rounded-md shadow-sm py-1.5 px-2 text-xs focus:ring-indigo-500 focus:border-indigo-500"
                        value={totalItemQuantity}
                        readOnly
                    />
                </div>

                {/* Sold By */}
                <div>
                    <label className="block text-xs font-medium text-gray-600">Sold By</label>
                    <select
                        name="soldBy"
                        value={formData.soldBy}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1.5 px-2 text-xs focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="">Select User</option>
                        {allUsers && allUsers.map((user) => (
                            <option key={user._id} value={user._id}>{user.name}</option>
                        ))}
                    </select>
                </div>

                {/* Discount Label */}
                <div>
                    <label className="block text-xs font-medium text-gray-600">Discount Rs</label>
                </div>

                {/* Discount Input */}
                <div>
                    <input
                        type="number"
                        value={formData.discountAmount ?? ""}
                        onChange={handlefinalDiscountChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1.5 px-2 text-xs focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Discount in Rs"
                    />
                </div>

                {/* Add Refrance Label (Placeholder - You might want to add actual input) */}
                <div>
                    <label className="block text-xs font-medium text-gray-600">Add Refrance</label>
                </div>
                <div>
                    {/* Placeholder for Refrance Input */}
                </div>

                {/* Add Shipping Label (Placeholder - You might want to add actual input) */}
                <div>
                    <label className="block text-xs font-medium text-gray-600">Add Shipping</label>
                </div>
                <div>
                    {/* Placeholder for Shipping Input */}
                </div>
            </div>
        </div>
    )
}

export default DiscountSection;