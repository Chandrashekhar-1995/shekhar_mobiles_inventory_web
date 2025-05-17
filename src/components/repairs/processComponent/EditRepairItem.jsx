import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getRepairProcessById, updateRepairItem, updateRepairProcessWithSteps, updateRepairStepCompletion} from "../../../../service/repairApi";
import { setAllRepairs } from "../../../store/repairSlice";
import RepairHeaderDetails from "./RepairHeaderDetails";
import RepairProcessSteps from "./RepairProcessSteps";
import { toast } from "react-toastify";
import UsedItems from "./UsedItems";

const EditRepairItem = () => {
  const [repairProcess, setRepairProcess] = useState(null);
  const [showProcessSelection, setShowProcessSelection] = useState(false);
  const [availableProcesses, setAvailableProcesses] = useState([]);
  const [loading, setLoading] = useState(false);
  const { repairId, itemIndex } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const repairs = useSelector((store) => store.repairs.allRepairs);
  const repair = repairs?.find((r) => r._id === repairId);
  const item = repair?.repairing?.[itemIndex];

  const [formData, setFormData] = useState({
        deviceType: item?.deviceType || "",
        repairItem: item?.repairItem || "",
        brandName: item?.brandName || "",
        modelNo: item?.modelNo || "",
        emeiNumber: item?.emeiNumber || "",
        emeiNumberSecond: item?.emeiNumberSecond || "",
        lockOrPassword: item?.lockOrPassword || "",
        email: item?.email || "",
        anyDamage: item?.anyDamage || "",
        otherDetails: item?.otherDetails || "",
        fault: item?.fault || "",
        sinceLong: item?.sinceLong || "",
        repairPrice: item?.repairPrice || "",
        expectedRepairingDate: item?.expectedRepairingDate || "",
        expectedRepairingTime: item?.expectedRepairingTime || "",
        repairDescription: item?.repairDescription || "",
        usedItems: item?.usedItems || [],
        item: item?.item || "",
        productName: item?.productName || "",
        itemCode: item?.itemCode || "",
        itemSalePrice: item?.itemSalePrice || "",
        itemQuantity: item?.itemQuantity || "",
        itemDescription: item?.itemDescription || "",
        repairStatus: item?.repairStatus || "",
        repairUnder: item?.repairUnder || "",
        repairBy: item?.repairBy || "",
        repairProcessName:item?.repairProcess?.processName || "Not Selected",
        repairProcess: item?.repairProcess || null,
        repairProcessStatus: item?.repairProcessStatus || null,
        
        // some details for only show 
        repairNumber: repair?.repairNumber || "",
        bookingDate: repair?.bookingDate || "",
        customerName: repair?.customerName || "",
        mobileNumber: repair?.mobileNumber || "",
        address: repair?.address || "",
        privateNote: repair?.privateNote || "",
        customerNote: repair?.customerNote || "",
        bookBy: repair?.bookBy.name || "",
  });
 
  useEffect(() => {
    if (item) {
      setFormData({
        deviceType: item.deviceType || "",
        repairItem: item.repairItem || "",
        brandName: item.brandName || "",
        modelNo: item.modelNo || "",
        emeiNumber: item.emeiNumber || "",
        emeiNumberSecond: item.emeiNumberSecond || "",
        lockOrPassword: item.lockOrPassword || "",
        email: item.email || "",
        anyDamage: item.anyDamage || "",
        otherDetails: item.otherDetails || "",
        fault: item.fault || "",
        sinceLong: item.sinceLong || "",
        repairPrice: item.repairPrice || "",
        expectedRepairingDate: item.expectedRepairingDate || "",
        expectedRepairingTime: item.expectedRepairingTime || "",
        repairDescription: item.repairDescription || "",
        usedItems: item.usedItems || [],
        item: item.item || "",
        productName: item.productName || "",
        itemCode: item.itemCode || "",
        itemSalePrice: item.itemSalePrice || "",
        itemQuantity: item.itemQuantity || "",
        itemDescription: item.itemDescription || "",
        repairStatus: item.repairStatus || "",
        repairUnder: item.repairUnder || "",
        repairBy: item.repairBy || "",
        repairNumber: repair.repairNumber || "",
        bookingDate: repair.bookingDate || "",
        customerName: repair.customer.name || "",
        mobileNumber: repair.customer.mobileNumber || "",
        address: repair.customer.address || "",
        privateNote: repair.privateNote || "",
        customerNote: repair.customerNote || "",
        bookBy: repair?.bookBy.name || "",
        repairProcessName:item?.repairProcess?.processName || "Not Selected",
        repairProcess: item.repairProcess || null,
        repairProcessStatus: item.repairProcessStatus || null
      });

      // Fetch repair process details if assigned
      if (item.repairProcess) {
        fetchRepairProcessDetails(item.repairProcess._id);
      } else {
        setShowProcessSelection(true);
        fetchAvailableProcesses(item.fault);
      }

    }
  }, [item]);
  
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


  const fetchRepairProcessDetails = async (processId) => {
    try {

      const data = await getRepairProcessById(processId);
      if (data.success) {
        setRepairProcess(data.data);
        setShowProcessSelection(false);
      }
    } catch (error) {
      console.error("Error fetching repair process:", error);
    }
  };

  const fetchAvailableProcesses = async (faultId) => {
    try {
      const response = await fetch(`/api/repair-processes?fault=${faultId}`);
      const data = await response.json();
      if (data.success) {
        setAvailableProcesses(data.data);
      }
    } catch (error) {
      console.error("Error fetching available processes:", error);
    }
  };

  const handleProcessSelect = async (processId) => {
    try {
      setLoading(true);
      const response = await updateRepairProcessWithSteps({
        repairId,
        repairingIndex: itemIndex,
        repairProcessId: processId
      });

      if (response.success) {
        // Update local state
        const updatedRepairs = repairs.map(r => 
          r._id === repairId ? {
            ...r,
            repairing: r.repairing.map((it, i) => 
              i == itemIndex ? { ...it, ...response.data.updatedItem } : it
            )
          } : r
        );
        
        dispatch(setAllRepairs(updatedRepairs));
        setRepairProcess(response.data.repairProcess);
        setShowProcessSelection(false);
        toast.success("Repair process assigned successfully");
      }
    } catch (error) {
      toast.error(error.message || "Failed to assign repair process");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = async (stepId, itemId, isChecked) => {
    try {
      setLoading(true);
      const response = await updateRepairStepCompletion({
        repairId,
        repairingIndex: itemIndex,
        stepId,
        itemId,
        isChecked
      });

      if (response.success) {
        // Update local state
        const updatedRepairs = repairs.map(r => 
          r._id === repairId ? {
            ...r,
            repairing: r.repairing.map((it, i) => 
              i == itemIndex ? { ...it, ...response.data.updatedItem } : it
            )
          } : r
        );
        
        dispatch(setAllRepairs(updatedRepairs));
        toast.success("Step completion updated successfully");
      }
    } catch (error) {
      toast.error(error.message || "Failed to update step completion");
    } finally {
      setLoading(false);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await updateRepairItem(repairId, {
        itemIndex,
        ...formData,
      });

      if (data.success) {
        const updatedRepairs = repairs.map((r) =>
          r._id === repairId
            ? {
                ...r,
                repairing: r.repairing.map((it, i) =>
                  i == itemIndex ? { ...it, ...formData } : it
                ),
              }
            : r
        );
        dispatch(setAllRepairs(updatedRepairs));
        toast.success("Repair item updated successfully");
        navigate(-1);
      }
    } catch (error) {
      toast.error(error.message || "Failed to update repair item");
    } finally {
      setLoading(false);
    }
  };

  if (loading || !item) return <div>Loading...</div>;

  return (
    <div className="flex items-center justify-center mb-8 pt-4 bg-gray-100 ">
      <div className="bg-white mb-8 rounded-lg shadow-md w-[80%] max-w-4xl pt-0 p-6 overflow-y-auto ">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold mb-4 text-sm">Edit Repair Item</h2>
          <button className="hover:bg-red-600 rounded-lg p-2"  onClick={() => navigate(-1)}
          > X </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 bg-gray-100">
          <RepairHeaderDetails data={formData} />

          {showProcessSelection ? (
          <div className="border border-gray-300 rounded-md shadow-sm p-4 bg-white mb-4">
            <h3 className="text-sm font-semibold mb-3">Select Repair Process</h3>
            {availableProcesses.length > 0 ? (
              <div className="space-y-2">
                {availableProcesses.map(process => (
                  <div 
                    key={process._id} 
                    className="p-3 border rounded-md hover:bg-blue-50 cursor-pointer"
                    onClick={() => handleProcessSelect(process._id)}
                  >
                    <h4 className="font-medium">{process.processName}</h4>
                    <p className="text-sm text-gray-600">{process.steps.length} steps</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-600">No processes available for this fault type</p>
            )}
          </div>
        ) : repairProcess ? (
          <RepairProcessSteps 
            process={repairProcess} 
            currentStatus={formData.repairProcessStatus}
            onCheckboxChange={handleCheckboxChange}
          />
        ) : null}

          <UsedItems formData={formData} setFormData={setFormData} handleChange={handleChange} />
          {/* <RepairingProgress formData={formData} setFormData={setFormData} handleChange={handleChange} /> */}

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Repair"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditRepairItem;
