import { useState } from "react";
import { Combobox } from "@headlessui/react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createFault, createSubFault } from "../../../../service/faultApi";
import useFetchFaults from "../../../hooks/useFetchFaults";

const FaultDropdown = ({ formData, setFormData }) => {
  const [query, setQuery] = useState("");
  const [subFaultInput, setSubFaultInput] = useState("");
  const [selectedFault, setSelectedFault] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newFault, setNewFault] = useState("");

  useFetchFaults();
  const allFaults = useSelector((store) => store.faults.allFaults);

  const filteredFaults = query === "" ? allFaults : allFaults.filter((f) =>
        f.fault?.toLowerCase().includes(query.toLowerCase())
      );

  const handleSelect = (fObj) => {
    setSelectedFault(fObj);
    setQuery(fObj.fault);
    setFormData(prev => ({
      ...prev,
      fault: fObj._id,
      faultName: fObj.fault.fault,
      }));
  };

  const handleBlur = () => {
    const faultExists = allFaults?.some(
      (f) => f.fault?.toLowerCase() === query.toLowerCase()
    );
    if (query && !faultExists) {
      setNewFault(query);
      setShowModal(true);
    }
  };

  const addFault = async (e) => {
    e.preventDefault();
    try {
      const data = await createFault({
        fault: newFault,
      });

      if (data.success) {
        toast.success(`✅ ${data.message}`);
        setFormData(pre => ({ ...formData, 
          fault: data.data._id,
          faultName:newFault, 
          subFaults: "" }));
        setSelectedFault(data.data);
      } else {
        toast.error(`❌ ${data.message}`);
      }
    } catch (error) {
  
    } finally {
      setShowModal(false);
    }
  };

  const cancelCreate = () => {
    setFormData(prev => ({
      ...prev,
      fault:"",
      faultName: "",
      subFaults: ""
    }));
    setQuery("");
    setSelectedFault(null);
    setShowModal(false);
  };

  const handleAddSubFaults = async () => {

    if (!subFaultInput.trim() || !selectedFault?._id) return;

    try {
      const data = await createSubFault({
        fault: selectedFault._id,
        subFaults: subFaultInput,
      });

      if (data.success) {
        toast.success(`✅ ${data.message}`);
        setFormData({ ...formData, subFaults: subFaultInput });
        setSubFaultInput("");
      } else {
        toast.error(`❌ ${data.message}`);
      }
    } catch (error) {

    }
  };

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text text-xs">Problem *</span>
      </label>
      <Combobox value={query} onChange={handleSelect}>
        <div className="relative">
          <Combobox.Input
            className="input input-bordered input-sm text-xs w-full"
            onChange={(e) => setQuery(e.target.value)}
            onBlur={handleBlur}
            displayValue={() => query}
            placeholder="Type Problem For search or create"
          />
          {filteredFaults?.length > 0 && (
            <Combobox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
              {filteredFaults.map((f) => (
                <Combobox.Option
                  key={f._id}
                  value={f}
                  className={({ active }) =>
                    `cursor-pointer px-4 py-2 ${
                      active ? "bg-blue-500 text-white" : "text-black"
                    }`
                  }
                >
                  {f.fault}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}
        </div>
      </Combobox>

      {/* subFaults Section */}
      {selectedFault && (
        <div className="mt-4">
          {selectedFault.subFaults?.length > 0 && (
            <>
              <label className="label">
                <span className="label-text text-xs">Sub Faults</span>
              </label>
              <select
                className="select select-bordered select-sm text-xs w-full"
                onChange={(e) =>
                  setFormData({ ...formData, subFaults: e.target.value })
                }
                value={formData.subFaults || ""}
              >
                <option value="">Select Sub Fault</option>
                {selectedFault.subFaults.map((sub, i) => (
                  <option key={i} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </>
          )}

          {/* Add new subFaults */}
          <div className="mt-3">
            <input
              type="text"
              value={subFaultInput}
              onChange={(e) => setSubFaultInput(e.target.value)}
              placeholder="Add new sub faults"
              className="input input-bordered input-sm text-xs w-full"
            />
            <button
              type="button"
              onClick={handleAddSubFaults}
              className="btn btn-primary btn-sm mt-2 w-full"
            >
              Add sub fault
            </button>
          </div>
        </div>
      )}

      {/* Modal for new category */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center opacity-80 bg-black z-20">
          <div className="bg-white p-6 rounded-lg shadow-md w-[90%] max-w-md text-center space-y-4">
            <h2 className="text-lg font-semibold">
              Create new Problem "{newFault}"?
            </h2>
            <div className="flex justify-center gap-4">
              <button className="btn btn-success btn-sm" onClick={addFault}>
                Yes
              </button>
              <button className="btn btn-error btn-sm" onClick={cancelCreate}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FaultDropdown;
