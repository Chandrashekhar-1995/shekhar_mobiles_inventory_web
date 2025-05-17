// EditRepairItem.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {getRepairProcessById, updateRepairItem,} from "../../../../service/repairApi";
import { setAllRepairs } from "../../../store/repairSlice";
import RepairHeaderDetails from "./RepairHeaderDetails";
import RepairProcessSteps from "./RepairProcessSteps";
import UsedItems from "./UsedItems";
import { toast } from "react-toastify";

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

  const initialRepairProcessStatus = item?.repairProcessStatus || {
    currentStep: 0,
    completedSteps: [],
  };

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
    repairProcessName: item?.repairProcess?.processName || "Not Selected",
    repairProcess: item?.repairProcess || null,
    repairProcessStatus: initialRepairProcessStatus,
    repairNumber: repair?.repairNumber || "",
    bookingDate: repair?.bookingDate || "",
    customerName: repair?.customer?.name || "",
    mobileNumber: repair?.customer?.mobileNumber || "",
    address: repair?.customer?.address || "",
    privateNote: repair?.privateNote || "",
    customerNote: repair?.customerNote || "",
    bookBy: repair?.bookBy?.name || "",
  });

  useEffect(() => {
    if (item) {
      setFormData((prev) => ({
        ...prev,
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
        repairStatus: item.repairStatus || "",
        repairUnder: item.repairUnder || "",
        repairBy: item.repairBy || "",
        repairProcess: item.repairProcess || null,
        repairProcessStatus: item.repairProcessStatus || initialRepairProcessStatus,
      }));

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

  const handleCheckboxChange = (stepId, itemId, isChecked) => {
    setFormData((prev) => {
      const repairStatus = prev.repairProcessStatus || {
        currentStep: 0,
        completedSteps: [],
      };
      const updatedStatus = JSON.parse(JSON.stringify(repairStatus));

      let stepIdx = updatedStatus.completedSteps.findIndex(
        (s) => s.stepId.toString() === stepId.toString()
      );
      if (stepIdx === -1) {
        stepIdx =
          updatedStatus.completedSteps.push({
            stepId,
            checkedItems: [],
          }) - 1;
      }

      const itemIdx = updatedStatus.completedSteps[stepIdx].checkedItems.findIndex(
        (i) => i.itemId.toString() === itemId.toString()
      );
      if (itemIdx === -1) {
        updatedStatus.completedSteps[stepIdx].checkedItems.push({
          itemId,
          isChecked,
        });
      } else {
        updatedStatus.completedSteps[stepIdx].checkedItems[itemIdx].isChecked = isChecked;
      }

      // advance currentStep only when that entire step is now fully checked
      const currentStepIdx = updatedStatus.currentStep;
      if (currentStepIdx === stepIdx) {
        const step = repairProcess.steps[currentStepIdx];
        const statusForThis = updatedStatus.completedSteps[stepIdx];
        if (
          statusForThis.checkedItems.length === step.checklistItems.length &&
          statusForThis.checkedItems.every((i) => i.isChecked)
        ) {
          updatedStatus.currentStep = Math.min(
            currentStepIdx + 1,
            repairProcess.steps.length - 1
          );
        }
      }

      return {
        ...prev,
        repairProcessStatus: updatedStatus,
      };
    });
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
          <button
            className="hover:bg-red-600 rounded-lg p-2"
            onClick={() => navigate(-1)}
          >
            X
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 bg-gray-100">
          <RepairHeaderDetails data={formData} />

          {showProcessSelection ? (
            <div className="border border-gray-300 rounded-md shadow-sm p-4 bg-white mb-4">
              <h3 className="text-sm font-semibold mb-3">Select Repair Process</h3>
              {availableProcesses.length > 0 ? (
                <div className="space-y-2">
                  {availableProcesses.map((process) => (
                    <div
                      key={process._id}
                      className="p-3 border rounded-md hover:bg-blue-50 cursor-pointer"
                    >
                      <h4 className="font-medium">{process.processName}</h4>
                      <p className="text-sm text-gray-600">
                        {process.steps.length} steps
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-600">
                  No processes available for this fault type
                </p>
              )}
            </div>
          ) : repairProcess ? (
            <RepairProcessSteps
              process={repairProcess}
              currentStatus={formData.repairProcessStatus}
              onCheckboxChange={handleCheckboxChange}
            />
          ) : null}

          <UsedItems
            formData={formData}
            setFormData={setFormData}
            handleChange={handleChange}
          />

          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? "Updating..." : "Update Repair"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditRepairItem;
