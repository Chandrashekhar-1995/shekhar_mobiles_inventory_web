import React from 'react'

const NotesSection = ({
  formData,
  handleChange
}) => {
  return (
    <>
        <div className="border border-gray-300 mb-2 relative">
                <div className="absolute -top-3 left-2 bg-gray-100 px-1 text-sm font-semibold"> Delivery Terms
                </div>
                <div className="mt-3 m-1">
                  <textarea 
                  name="deliveryTerm"
                  value={formData.deliveryTerm}
                  onChange={handleChange}
                  className="bg-white w-full border-b border-gray-400">
                  </textarea>
                </div>
              </div>
              <div className="border border-gray-300 mt-2 relative">
                <div className="absolute -top-3 left-2 bg-gray-100 px-1 text-sm font-semibold"> Remarks (Private use)
                </div>
                <div className="mt-3 m-1">
                  <textarea 
                  name="privateNote"
                  value={formData.privateNote} 
                  onChange={handleChange}
                  className="bg-white w-full border-b border-gray-400">
                  </textarea>
                </div>
              </div>
    </>
  )
}

export default NotesSection