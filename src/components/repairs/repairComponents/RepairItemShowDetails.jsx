import React from "react"

const RepairItemShowDetails = ({formData, handleChange}) => {
    const formatToIndianDate = (isoDate) => {
        if (!isoDate) return '';
        const date = new Date(isoDate);
        return date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
      };
  return (
    <div className="border border-base-300 rounded-md shadow-sm p-4 bg-base-100">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">

        {/* Repair Number */}
        <div className="form-control w-full">
            <label className="label">
                <span className="label-text text-xs">Repair Number</span>
            </label>
            <input
                type="text"
                name="repairNumber"
                className="input input-bordered input-sm text-xs"
                defaultValue={formData.repairNumber}
                onChange={handleChange}
            />
        </div>
            
        {/* Booking Date */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-xs">Booking Date</span>
          </label>
          <input
            type="text"
            name="bookingDate"
            className="input input-bordered input-sm text-xs"
            value={formatToIndianDate(formData.bookingDate) || ""}
            onChange={handleChange}
          />
        </div>

        {/* Customer Name */}
        <div className="form-control w-full">
            <label className="label">
                <span className="label-text text-xs">Customer Name</span>
            </label>
            <input
                type="text"
                name="customerName"
                className="input input-bordered input-sm text-xs"
                defaultValue={formData.customerName}
                onChange={handleChange}
            />
        </div>

        {/* Customer Name */}
        <div className="form-control w-full">
            <label className="label">
                <span className="label-text text-xs">Mobile</span>
            </label>
            <input
                type="text"
                name="customerName"
                className="input input-bordered input-sm text-xs"
                defaultValue={formData.customerName}
                onChange={handleChange}
            />
        </div>

        {/* Problem */}
        <div className="form-control w-full">
            <label className="label">
                <span className="label-text text-xs">Problem</span>
            </label>
            <input
                type="text"
                name="problem"
                className="input input-bordered input-sm text-xs"
                defaultValue={formData.problem}
                onChange={handleChange}
            />
        </div>

        {/* Price */}
        <div className="form-control w-full">
            <label className="label">
                <span className="label-text text-xs">Price</span>
            </label>
            <input
                type="text"
                name="repairPrice"
                className="input input-bordered input-sm text-xs"
                defaultValue={formData.repairPrice}
                onChange={handleChange}
            />
        </div>

        </div>
    </div>
  )
}

export default RepairItemShowDetails;