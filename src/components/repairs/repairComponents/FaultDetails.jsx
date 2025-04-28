import React from "react";

const FaultDetails = ({ formData, setFormData, handleChange,}) => {

  const handleAddRepair = (e) => {
    e.preventDefault();
  
    const { type, mobile, brand, brandName, modelNumber, emeiNumber, emeiNumberSecond, lockOrPassword, email, anyDamage,  otherDetails, problem, sinceLong, repairPrice, repairDescription, repairItem, } = formData;

    if (!type || !problem || !repairPrice) {
      alert("Please fill in all required fields before adding repair.");
      return;
    }

    const newRepair = {type, mobile, brand, brandName, modelNumber, emeiNumber, emeiNumberSecond, lockOrPassword, email, anyDamage,  otherDetails, problem, sinceLong, repairPrice, repairDescription, repairItem,};
  
    setFormData((prev) => ({
        ...prev,
        repairing: [...prev.repairing, newRepair],
        type: "mobile",
        mobile: "",
        brand: "",
        brandName: "",
        modelNumber: "",
        emeiNumber: "",
        emeiNumberSecond: "",
        lockOrPassword: "",
        email: "",
        anyDamage: "",
        otherDetails: "",
        problem: "",
        sinceLong: "",
        repairPrice: "",
        repairDescription: "",
        repairItem: "",
    }));
  };
  
  return (
    <>
        {/* since long */}
        <div className="form-control w-full">
            <label className="label">
                <span className="label-text text-xs">Problem</span>
            </label>
            <input
                type="textarea"
                name="problem"
                className="input input-bordered input-sm text-xs"
                value={formData.problem}
                onChange={handleChange}
            />
        </div>

        {/* since long */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-xs">Since long</span>
          </label>
            <input
              type="text"
              name="sinceLong"
              value={formData.sinceLong}
              onChange={handleChange}
              className="input input-bordered input-sm text-xs"
              placeholder="Since Long"
              />
        </div>

        {/* Repair Price */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-xs">Repair Price</span>
          </label>
            <input
              type="number"
              name="repairPrice"
              value={formData.repairPrice ?? ""}
              onChange={handleChange}
              className="input input-bordered input-sm text-xs"
              placeholder="Sale Price"
            />
        </div>

        {/* expectedRepairingDate */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-xs">Expected Repair Date</span>
          </label>
            <input
              type="date"
              name="expectedRepairingDate"
              value={formData.expectedRepairingDate}
              onChange={handleChange}
              className="input input-bordered input-sm text-xs"
            />
        </div>

        {/* expectedRepairingTime */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-xs">Expected Repair Time</span>
          </label>
            <input
              type="time"
              name="expectedRepairingTime"
              value={formData.expectedRepairingTime}
              onChange={handleChange}
              className="input input-bordered input-sm text-xs"
            />
        </div>

        {/* repairDescription */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-xs">Repair Description</span>
          </label>
            <input
              type="text"
              name="repairDescription"
              value={formData.repairDescription}
              onChange={handleChange}
              className="input input-bordered input-sm text-xs"
            />
        </div>

        <div className="col-span-1 flex flex-col">
          <button
            type="button"
            onClick={handleAddRepair}
            className="bg-blue-500 text-white text-xs font-medium px-3 py-1 rounded hover:bg-blue-600 transition"
          >
            Add
          </button>
        </div>
    </>
  )
}

export default FaultDetails;