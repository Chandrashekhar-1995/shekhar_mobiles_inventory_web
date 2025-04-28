import React from "react";

const NotesSection = ({
  formData,
  handleChange
}) => {
  return (
    <div className="border border-base-300 rounded-md shadow-sm p-4 bg-base-100">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">

        {/* Delivery Terms */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-xs">Delivery Terms</span>
          </label>
            <textarea 
              name="deliveryTerm"
              value={formData.deliveryTerm}
              onChange={handleChange}
              className="textarea input-sm text-xs border-gray-300"
              placeholder='Delivery Terms'
              />
        </div>

        {/* Remarks (Private use) */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-xs">Remarks</span>
          </label>
            <textarea 
               name="privateNote"
               value={formData.privateNote}
               onChange={handleChange}
              className="textarea input-sm text-xs border-gray-300"
              placeholder="Private use"
              />
        </div>

      </div>
    </div>
  )
}

export default NotesSection