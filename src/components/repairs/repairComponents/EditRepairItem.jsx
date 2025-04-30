import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateRepairItem, getAllRepairs } from "../../../../service/repairApi";
import { setAllRepairs } from "../../../store/repairSlice";

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
    repairStatus: item?.repairStatus || "",
    problem: item?.problem || "",
    price: item?.price || "",
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
        
        // some details for only show 
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
    <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Edit Repair Item</h2>

      <label className="block mb-2">
        Problem:
        <input
          type="text"
          name="problem"
          value={formData.problem}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </label>

      <label className="block mb-2">
        Repair Status:
        <select
          name="repairStatus"
          value={formData.repairStatus}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="booked">Booked</option>
          <option value="in_progress">In Progress</option>
          <option value="repair_done">Repair Done</option>
          <option value="delivered">Delivered</option>
          <option value="return">Return</option>
        </select>
      </label>

      <label className="block mb-4">
        Price:
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </label>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Update Item
      </button>
    </div>
  );
};

export default EditRepairItem;
