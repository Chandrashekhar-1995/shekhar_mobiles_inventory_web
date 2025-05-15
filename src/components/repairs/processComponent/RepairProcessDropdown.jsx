import { useState } from "react";
import { Combobox } from "@headlessui/react";
import { useSelector } from "react-redux";
import useFetchRepairProcesses from "../../../hooks/useFetchRepairProcesses";
import { toast } from "react-toastify";

const capitalizeWords = (str) => {
  if (!str) return '';
  return str.toLowerCase().split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};

const RepairProcessDropdown = ({ formData, setFormData, handleChange }) => {
  const [query, setQuery] = useState("");

  useFetchRepairProcesses();

  const processes = useSelector((store) => store.repairProcesses.allProcesses);

  const filteredProcesses =
    query === ""
      ? processes
      : processes.filter((p) =>
          p.processName?.toLowerCase().includes(query.toLowerCase())
        );

  const handleSelect = (process) => {
    setQuery(process.processName);
    setFormData(prev => ({
      ...prev,
      repairProcess: process._id,
      repairProcessName: capitalizeWords(process.processName)
    }));
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">  
        {/* Repair Process Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-xs">Repair Process</span>
          </label>
          <Combobox value={formData.repairProcessName} onChange={handleSelect}>
            <div className="relative">
              <Combobox.Input
                className="input input-bordered input-sm text-xs"
                onChange={(e) => setQuery(e.target.value)}
                displayValue={() => formData.repairProcessName || ""}
                placeholder="Type repair process name"
              />
              {processes && filteredProcesses.length > 0 && (
                <Combobox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                  {filteredProcesses.map((process) => (
                    <Combobox.Option
                      key={process._id}
                      value={process}
                      className={({ active }) => 
                        `cursor-pointer px-4 py-2 ${
                          active ? "bg-blue-500 text-white" : "text-black"
                        }`
                      }
                    >
                      {capitalizeWords(process.processName)}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              )}
            </div>
          </Combobox>
        </div>
      </div>
    </div>
  );
};

export default RepairProcessDropdown;