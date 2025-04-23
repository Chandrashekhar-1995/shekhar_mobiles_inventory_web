import React, { useState } from "react";
import { Combobox } from "@headlessui/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MobileDetails = ({ formData, setFormData, handleChange,}) => {
  const [queryModelNo, setQueryModelNo] = useState("");
  const [queryBrandName, setQueryBrandName] = useState("");

  const navigate = useNavigate();

  const allMobiles = useSelector((store) => store.mobiles.allMobiles);

  const filteredByModelNo = queryModelNo
    ? allMobiles.filter((m) =>
        m.modelNo.trim().includes(queryModelNo.trim())
      )
    : [];

  const filteredByBrand = queryBrandName
    ? allMobiles.filter((m) =>
        m.brandName.toLowerCase().includes(queryBrandName.toLowerCase().trim())
      )
    : [];

  const handleSelect = (mobile) => {
      setFormData({
        ...formData,
        mobile: mobile._id,
        brandName: mobile.brandName,
        modelNumber: mobile.modelNumber,
      });
      setQueryModelNo(mobile.modelNo);
      setQueryBrandName(mobile.brandName);
    };
 
  const handleAddRepair = (event) => {
      event.preventDefault();

      if(formData.type==="mobile"){
        const { mobile, brandName, modelNumber, repairPrice, repairDescription} = formData;
  
        if (!brandName || !modelNumber || !repairPrice) {
          alert("Please fill in all required fields before adding repair");
          return;
        }

        const newRepair = {
            mobile,
            brandName,
            modelNumber,
            repairPrice,
            repairDescription,
          };

        setFormData((prev) => ({
            ...prev,
            mobiles: [...prev.mobile, newRepair],
            mobile:"",
            brandName:"",
            modelNumber:"",
            repairPrice:"",
            repairDescription:"",
          }));
      }
    
      const newFault = {
        problem,
        sinceLong,
        repairStatus,
        repairPrice,
      };

      setFormData((prev) => ({
        ...prev,
        fault: [...prev.fault, newFault],
        problem:"",
        sinceLong:"",
        repairStatus:"",
        repairPrice:"",
      }));

      const newRepairing = {
        type,
        mobiles :  mobiles ?  mobiles : [],
        repairItem : repairItem ? repairItem : "",
        fault:fault,
      };

      setFormData((prev) =>({
        ...prev,
        repairing: [...prev.repairing, newRepairing],
        type:"",
        mobiles : [],
        repairItem:"",
        fault:[]
      }));

    };
  
  const handleCreateMobile = (e) =>{
    e.preventDefault()
    navigate("/mobile/create")
  }

//   return allMobiles && (
  return allMobiles && (
    <>
        {/* Brand Name */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-xs">Brand Name</span>
          </label>
          <Combobox value={formData.itemCode} onChange={handleSelect}>
            <div className="relative">
              <Combobox.Input
                className="input input-bordered input-sm text-xs"
                onChange={(e) => setQueryBrandName(e.target.value)}
                displayValue={() => formData.brandName || ""}
                placeholder="Type Brand Name"
              />
              {filteredByBrand.length > 0 && (
                <Combobox.Options 
                  className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                {filteredByBrand.map((brand) => (
                  <Combobox.Option
                    key={brand._id}
                    value={brand}
                    className={({ active }) => `cursor-pointer px-4 py-2 ${ active ? "bg-blue-500 text-white" : "text-black" }`}
                  >
                    {brand.brandName}
                  </Combobox.Option>
                  ))}
                </Combobox.Options>
              )}
            </div>
          </Combobox>
        </div>

        {/* Model No */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-xs">Model No</span>
            <button className=" bg-primary text-white font-bold px-2" onClick={handleAddRepair}>+</button>
          </label>
          <Combobox value={formData.modelNumber} onChange={handleSelect}>
            <div className="relative">
              <Combobox.Input
                className="input input-bordered input-sm text-xs"
                onChange={(e) => setQueryModelNo(e.target.value)}
                displayValue={() => formData.modelNumber || ""}
                placeholder="Type Model no"
              />
              {filteredByModelNo.length > 0 && (
                <Combobox.Options 
                  className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                {filteredByModelNo.map((m) => (
                  <Combobox.Option
                    key={m._id}
                    value={m}
                    className={({ active }) => `cursor-pointer px-4 py-2 ${ active ? "bg-blue-500 text-white" : "text-black" }`}
                  >
                    {m.modelNumber}
                  </Combobox.Option>
                  ))}
                </Combobox.Options>
              )}
            </div>
          </Combobox>
        </div>

        {/* Repair Price */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-xs">Repair Price</span>
          </label>
            <input
              type="text"
              name="repairPrice"
              value={formData.repairPrice ?? ""}
              onChange={handleChange}
              className="input input-bordered input-sm text-xs"
              placeholder="Sale Price"
            />
        </div>


        {/* repair description */}
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
              placeholder="Repair Description"
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
  );
};

export default MobileDetails;