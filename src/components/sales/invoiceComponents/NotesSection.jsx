import React from "react";

const NotesSection = ({
  formData,
  handleChange
}) => {
  return (
    <>
        {/* Delivery Terms */}
        <div className="col-span-1 flex flex-col">
        <label className="text-xs font-medium text-gray-600 mt-2 md:mt-0">Delivery Terms</label>
            <textarea 
              name="deliveryTerm"
              value={formData.deliveryTerm}
              onChange={handleChange}
              className="border border-gray-300"
              placeholder='Delivery Terms'
              />
                  {/* </textarea> */}
        </div>

        {/* Remarks (Private use) */}
        <div className="col-span-1 flex flex-col">
          <label className="text-xs font-medium text-gray-600 mt-2">Remarks</label>
            <textarea 
              name="privateNote"
              value={formData.privateNote}
              onChange={handleChange}
              className="border border-gray-300"
              placeholder="Private use"
              />
                  {/* </textarea> */}
        </div>

    </>
  )
}

export default NotesSection