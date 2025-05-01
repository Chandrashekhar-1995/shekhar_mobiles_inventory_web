import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateRepairItem, getAllRepairs } from "../../../../service/repairApi";
import { setAllRepairs } from "../../../store/repairSlice";
import RepairItemShowDetails from "./RepairItemShowDetails";
import UsedItems from "./UsedItems";
import RepairingProcess from "./RepairingProcess";

const EditRepairItem = () => {
  const { repairId, itemIndex } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const repairs = useSelector((store) => store.repairs.allRepairs);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (!repairs || repairs.length === 0) {
      setLoading(true);
      getAllRepairs().then((res) => {
        dispatch(setAllRepairs(res.data));
        setLoading(false);
      });
    }
  }, [repairs, dispatch]);
  
  const repair = repairs.invoices.find((r) => r._id === repairId);
  const item = repair?.repairing?.[itemIndex];
  // console.log("item", item);

  const [formData, setFormData] = useState({
        type: item?.type || "",
        repairItem: item?.repairItem || "",
        brandName: item?.brandName || "",
        modelNo: item?.modelNo || "",
        emeiNumber: item?.emeiNumber || "",
        emeiNumberSecond: item?.emeiNumberSecond || "",
        lockOrPassword: item?.lockOrPassword || "",
        email: item?.email || "",
        anyDamage: item?.anyDamage || "",
        otherDetails: item?.otherDetails || "",
        problem: item?.problem || "",
        sinceLong: item?.sinceLong || "",
        repairPrice: item?.repairPrice || "",
        expectedRepairingDate: item?.expectedRepairingDate || "",
        expectedRepairingTime: item?.expectedRepairingTime || "",
        repairDescription: item?.repairDescription || "",
        usedItem: item?.usedItem || [],
        item: item?.item || "",
        productName: item?.productName || "",
        itemCode: item?.itemCode || "",
        itemSalePrice: item?.itemSalePrice || "",
        itemQuantity: item?.itemQuantity || "",
        itemDescription: item?.itemDescription || "",
        repairStatus: item?.repairStatus || "",
        repairUnder: item?.repairUnder || "",
        repairBy: item?.repairBy || "",
        
        // some details for only show 
        repairNumber: repair?.repairNumber || "",
        bookingDate: repair?.bookingDate || "",
        customerName: repair?.customerName || "",
        mobileNumber: repair?.mobileNumber || "",
        address: repair?.address || "",
        privateNote: repair?.privateNote || "",
        customerNote: repair?.customerNote || "",
        bookBy: repair?.bookBy || "",
  });
 
  useEffect(() => {
    if (item) {
      setFormData({
        type: item.type || "",
        repairItem: item.repairItem || "",
        brandName: item.brandName || "",
        modelNo: item.modelNo || "",
        emeiNumber: item.emeiNumber || "",
        emeiNumberSecond: item.emeiNumberSecond || "",
        lockOrPassword: item.lockOrPassword || "",
        email: item.email || "",
        anyDamage: item.anyDamage || "",
        otherDetails: item.otherDetails || "",
        problem: item.problem || "",
        sinceLong: item.sinceLong || "",
        repairPrice: item.repairPrice || "",
        expectedRepairingDate: item.expectedRepairingDate || "",
        expectedRepairingTime: item.expectedRepairingTime || "",
        repairDescription: item.repairDescription || "",
        usedItem: item.usedItem || [],
        item: item.item || "",
        ProductName: item.ProductName || "",
        ItemCode: item.ItemCode || "",
        ItemSalePrice: item.ItemSalePrice || "",
        ItemQuantity: item.ItemQuantity || "",
        ItemDescription: item.ItemDescription || "",
        repairStatus: item.repairStatus || "",
        repairUnder: item.repairUnder || "",
        repairBy: item.repairBy || "",
        repairNumber: repair.repairNumber || "",
        bookingDate: repair.bookingDate || "",
        customerName: repair.customerName || "",
        mobileNumber: repair.mobileNumber || "",
        address: repair.address || "",
        privateNote: repair.privateNote || "",
        customerNote: repair.customerNote || "",
        bookBy: repair.bookBy || "",
      });
    }
  }, [item]);
  
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    const result = await updateRepairItem(repairId, {
      itemIndex,
      ...formData,
    });

    if (result.success) {
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
      navigate(-1);
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
          {/* Repair Invoice Details */}
          <RepairItemShowDetails formData={formData} />
          <UsedItems formData={formData} setFormData={setFormData} handleChange={handleChange} />
          <RepairingProcess formData={formData} setFormData={setFormData} handleChange={handleChange} />


          <button
            type="submit"
            className="btn btn-primary w-full"
          >
            Update Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditRepairItem;
