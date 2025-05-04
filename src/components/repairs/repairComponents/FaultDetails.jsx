import React from "react";
import FaultDropdown from "../fault/FaultDropdown";

const FaultDetails = ({ formData, setFormData, handleChange,}) => {

  const handleAddRepair = (e) => {
    e.preventDefault();
    
    const { deviceType, mobile, brand, brandName, modelNo, emeiNumber, emeiNumberSecond, lockOrPassword, email, anyDamage,  otherDetails, fault, subFaults, sinceLong, repairPrice, repairDescription, repairItem, expectedRepairingDate, expectedRepairingTime } = formData;

    if (!deviceType || !fault || !repairPrice) {
      alert("Please fill in all required fields before adding repair.");
      return;
    }

    const newRepair = {deviceType, mobile, brand, brandName, modelNo, emeiNumber, emeiNumberSecond, lockOrPassword, email, anyDamage,  otherDetails, fault, subFaults, sinceLong, repairPrice, repairDescription, repairItem, expectedRepairingDate, expectedRepairingTime};
  
    setFormData((prev) => ({
        ...prev,
        repairing: [...prev.repairing, newRepair],
        deviceType: "",
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
        fault: "",
        faultName:"",
        subFaults: "",
        sinceLong: "",
        repairPrice: "",
        expectedRepairingDate:"",
        expectedRepairingTime:"",
        repairDescription: "",
        repairItem: "",
    }));
  };
  
  return (
    <>
        <FaultDropdown formData={formData} setFormData={setFormData} />
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
              placeholder="Repair Price"
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