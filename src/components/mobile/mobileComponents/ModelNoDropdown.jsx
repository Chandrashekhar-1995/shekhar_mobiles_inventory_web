import { useState } from "react";
import { Combobox } from "@headlessui/react";
import { useSelector } from "react-redux";
import useFetchModels from "../../../hooks/useFetchModels";
import { createNewModel } from "../../../../service/modelNoApi";
import { toast } from "react-toastify";

const ModelNoDropdown = ({ formData, setFormData }) => {
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newModelName, setNewModelName] = useState("");

  useFetchModels();

  const allModels = useSelector((store) => store.models.allModels);

  const filteredModels = query === "" 
    ? allModels 
    : allModels.filter((model) =>
        model.modelNo?.toLowerCase().includes(query.toLowerCase())
      );

  const handleSelect = (modelObj) => {
    setQuery(modelObj.modelNo);
    setFormData(prev => ({
      ...prev,
      modelNo: modelObj.modelNo
    }));
  };

  const handleBlur = () => {
    const modelExists = allModels.some(
      (m) => m.modelNo.toLowerCase() === query.toLowerCase()
    );
    if (query && !modelExists) {
      setNewModelName(query);
      setShowModal(true);
    }
  };

  const addModel = async (e) => {
    e.preventDefault();
    try {
      const data = await createNewModel({ modelNo: newModelName });
      if (data.success) {
        toast.success(data.message)
        setFormData(prev => ({
          ...prev,
          modelNo: newModelName
        }));
      } else{
        toast.error(data.message);
      }
    } catch (error) {
    } finally {
      setShowModal(false);
    }
  };

  const cancelCreate = () => {
    setFormData(prev => ({ 
      ...prev,
      modelNo: ""
    }));
    setQuery("");
    setShowModal(false);
  };

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text text-xs">Model *</span>
      </label>
      <Combobox value={query} onChange={handleSelect}>
        <div className="relative">
          <Combobox.Input
            className="input input-bordered input-sm text-xs w-full"
            onChange={(e) => setQuery(e.target.value)}
            onBlur={handleBlur}
            displayValue={() => query}
            placeholder="Type Model No"
          />
          {allModels && filteredModels.length > 0 && (
            <Combobox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
              {filteredModels.map((model) => (
                <Combobox.Option
                  key={model._id}
                  value={model}
                  className={({ active }) =>
                    `cursor-pointer px-4 py-2 ${
                      active ? "bg-blue-500 text-white" : "text-black"
                    }`
                  }
                >
                  {model.modelNo}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}
        </div>
      </Combobox>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center opacity-80 bg-black bg-op z-20">
          <div className="bg-white p-6 rounded-lg shadow-md w-[90%] max-w-md text-center space-y-4">
            <h2 className="text-lg font-semibold">
              Create new model No "{newModelName}"?
            </h2>
            <div className="flex justify-center gap-4">
              <button className="btn btn-success btn-sm" onClick={addModel}>
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

export default ModelNoDropdown;
