import { useState } from "react";
import { Combobox } from "@headlessui/react";
import { useSelector } from "react-redux";
import useFetchFaults from "../../../hooks/useFetchFaults";
import { toast } from "react-toastify";
import { createFault } from "../../../../service/faultApi";

const FaultDropdown = ({ setFormData }) => {
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newFaultName, setNewFaultName] = useState("");

  useFetchFaults();

  const allFaults = useSelector((store) => store.faults.allFaults);

  const filteredFaults =
    query === ""
      ? allFaults
      : allFaults?.filter((f) =>
          f.fault?.toLowerCase().includes(query.toLowerCase())
        );

  const handleSelect = (faultObj) => {
    setQuery(faultObj.fault);
    setFormData(prev => ({
      ...prev,
      fault: faultObj.fault,
      faultID: faultObj._id,
      }));
  };
        

  const handleBlur = () => {
    const faultExists = allFaults?.some(
      (f) => f.fault?.toLowerCase() === query.toLowerCase()
    );
    if (query && !faultExists) {
      setNewFaultName(query);      
      setShowModal(true);
    }
  };

  const addFault = async (e) => {
    e.preventDefault();
    try {
      const data = await createFault({ fault: newFaultName });
      if (data.success) {
        toast.success(data.message)
        setFormData(prev => ({
          ...prev,
          fault: newFaultName,
          faultID: data.data._id
        }));
      } else{
        toast.error(data.message)
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
      faultID: ""
    }));
    setQuery("");
    setShowModal(false);
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
              placeholder="Problem"
            />
            {allFaults && filteredFaults.length > 0 && (
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

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center opacity-80 bg-black  bg-op z-20">
            <div className="bg-white p-6 rounded-lg shadow-md w-[90%] max-w-md text-center space-y-4">
              <h2 className="text-lg font-semibold">Create new Problem "{newFaultName}"?</h2>
              <div className="flex justify-center gap-4">
                <button
                  className="btn btn-success btn-sm"
                  onClick={addFault}
                >
                  Yes
                </button>
                <button
                  className="btn btn-error btn-sm"
                  onClick={cancelCreate}
                >
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
