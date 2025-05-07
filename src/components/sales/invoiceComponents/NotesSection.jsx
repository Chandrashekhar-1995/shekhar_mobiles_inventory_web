import React from "react";

const NotesSection = ({
    formData,
    handleChange
}) => {
    return (
        <div className="bg-base-100 border border-base-300 rounded-md shadow-sm p-4">
            <div className="grid grid-cols-1 gap-y-2">
                {/* Delivery Terms */}
                <div>
                    <label className="block text-xs font-medium text-gray-600">Delivery Terms</label>
                    <textarea
                        name="deliveryTerm"
                        value={formData.deliveryTerm}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1.5 px-2 text-xs focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder='Delivery Terms'
                        rows={2}
                    />
                </div>

                {/* Remarks (Private use) */}
                <div>
                    <label className="block text-xs font-medium text-gray-600">Remarks</label>
                    <textarea
                        name="privateNote"
                        value={formData.privateNote}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1.5 px-2 text-xs focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Private use"
                        rows={2}
                    />
                </div>
            </div>
        </div>
    )
}

export default NotesSection