import { useState } from "react";
import { Combobox } from "@headlessui/react";
import { useSelector } from "react-redux";
import { createRepairProcess } from "../../../../service/repairApi";
import useFetchRepairProcesses from "../../../hooks/useFetchRepairProcesses";
import { toast } from "react-toastify";
import FaultDropdown from "../repairComponents/FaultDropdown";

const CreateRepairProcess = ({ onProcessCreated }) => {
  const [showModal, setShowModal] = useState(false);
  const [newProcess, setNewProcess] = useState({
    problemType: "",
    problemSubType: "",
    deviceType: "mobile",
    processName: "",
    steps: [{ stepName: "", description: "", isCritical: false }]
  });
  const [formData, setFormData] = useState({
    fault: "",
    subFault: "",
    deviceType: "mobile",
    processName: "",
    steps: [{ stepName: "", description: "", isCritical: false }]
  });

  useFetchRepairProcesses();

  const allProblemTypes = useSelector((store) => store.repairProcesses.problemTypes);

  const addStep = () => {
    setNewProcess(prev => ({
      ...prev,
      steps: [...prev.steps, { stepName: "", description: "", isCritical: false }]
    }));
  };

  const removeStep = (index) => {
    if (newProcess.steps.length > 1) {
      setNewProcess(prev => ({
        ...prev,
        steps: prev.steps.filter((_, i) => i !== index)
      }));
    }
  };

  const updateStep = (index, field, value) => {
    const updatedSteps = [...newProcess.steps];
    updatedSteps[index][field] = value;
    setNewProcess(prev => ({
      ...prev,
      steps: updatedSteps
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate required fields
      if (!newProcess.problemType || !newProcess.processName || 
          newProcess.steps.some(step => !step.stepName)) {
        toast.error("Please fill all required fields");
        return;
      }

      const data = await createRepairProcess(newProcess);
      if (data.success) {
        toast.success(data.message);
        setShowModal(false);
        onProcessCreated(data.data);
        resetForm();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to create repair process");
    }
  };

  const resetForm = () => {
    setNewProcess({
      problemType: "",
      problemSubType: "",
      deviceType: "mobile",
      processName: "",
      steps: [{ stepName: "", description: "", isCritical: false }]
    });
  };

  return (
    <div className="form-control">
      <button
        className="btn btn-sm btn-primary"
        onClick={() => setShowModal(true)}
      >
        Create New Repair Process
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Create New Repair Process</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Problem Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FaultDropdown setFormData={setFormData} />

                {/* Problem Sub Type */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Problem Sub Type</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered input-sm"
                    value={newProcess.problemSubType}
                    onChange={(e) => setNewProcess(prev => ({
                      ...prev,
                      problemSubType: e.target.value
                    }))}
                    placeholder="Optional sub-category"
                  />
                </div>
              </div>

              {/* Device Type */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Device Type *</span>
                </label>
                <select
                  className="select select-bordered select-sm"
                  value={newProcess.deviceType}
                  onChange={(e) => setNewProcess(prev => ({
                    ...prev,
                    deviceType: e.target.value
                  }))}
                  required
                >
                  <option value="mobile">Mobile</option>
                  <option value="tablet">Tablet</option>
                  <option value="laptop">Laptop</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Process Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Process Name *</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered input-sm"
                  value={newProcess.processName}
                  onChange={(e) => setNewProcess(prev => ({
                    ...prev,
                    processName: e.target.value
                  }))}
                  placeholder="e.g., Charging Port Repair Process"
                  required
                />
              </div>

              {/* Process Steps */}
              <div className="space-y-4">
                <label className="label">
                  <span className="label-text">Process Steps *</span>
                </label>
                
                {newProcess.steps.map((step, index) => (
                  <div key={index} className="border p-3 rounded-lg space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Step {index + 1}</h3>
                      {newProcess.steps.length > 1 && (
                        <button
                          type="button"
                          className="btn btn-xs btn-error"
                          onClick={() => removeStep(index)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Step Name *</span>
                      </label>
                      <input
                        type="text"
                        className="input input-bordered input-sm"
                        value={step.stepName}
                        onChange={(e) => updateStep(index, "stepName", e.target.value)}
                        placeholder="e.g., Check charging port"
                        required
                      />
                    </div>
                    
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Description</span>
                      </label>
                      <textarea
                        className="textarea textarea-bordered textarea-sm w-full"
                        value={step.description}
                        onChange={(e) => updateStep(index, "description", e.target.value)}
                        placeholder="Detailed instructions for this step"
                        rows={2}
                      />
                    </div>
                    
                    <div className="form-control">
                      <label className="label cursor-pointer justify-start gap-2">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-xs"
                          checked={step.isCritical}
                          onChange={(e) => updateStep(index, "isCritical", e.target.checked)}
                        />
                        <span className="label-text">Critical Step (must be completed)</span>
                      </label>
                    </div>
                  </div>
                ))}
                
                <button
                  type="button"
                  className="btn btn-sm btn-outline"
                  onClick={addStep}
                >
                  + Add Another Step
                </button>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  className="btn btn-sm btn-ghost"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-sm btn-primary"
                >
                  Create Process
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateRepairProcess;