import { useState } from "react";
import { useSelector } from "react-redux";
import { createRepairProcess } from "../../../../service/repairApi";
import useFetchRepairProcesses from "../../../hooks/useFetchRepairProcesses";
import { toast } from "react-toastify";
import FaultDropdown from "../repairComponents/FaultDropdown";

const CreateRepairProcess = ({ onProcessCreated }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    fault: "",
    subFault: "",
    deviceType: "mobile",
    processName: "",
    steps: [{ stepName: "", description: "", isCritical: false }],
    createdBy:"",
    updatedBy:"",
    isActive:true,
  });

  useFetchRepairProcesses();

  const allProblemTypes = useSelector((store) => store.repairProcesses.problemTypes);
  console.log("allProblemTypes", allProblemTypes);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addStep = () => {
    setFormData(prev => ({
      ...prev,
      steps: [...prev.steps, { stepName: "", description: "", isCritical: false }]
    }));
  };

  const removeStep = (index) => {
    if (formData.steps.length > 1) {
      setFormData(prev => ({
        ...prev,
        steps: prev.steps.filter((_, i) => i !== index)
      }));
    }
  };

  const updateStep = (index, field, value) => {
    const updatedSteps = [...formData.steps];
    updatedSteps[index][field] = value;
    setFormData(prev => ({
      ...prev,
      steps: updatedSteps
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate required fields
      if (!formData.fault || !formData.processName || formData.steps.some(step => !step.stepName)) {
        toast.error("Please fill all required fields");
        return;
      }

      const data = await createRepairProcess(formData);
      console.log("create process", data);
      
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
    setFormData({
      fault: "",
      subFault: "",
      deviceType: "mobile",
      processName: "",
      steps: [{ stepName: "", description: "", isCritical: false }],
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
                    <span className="label-text text-xs">Problem Sub Type</span>
                  </label>
                  <input
                    type="text"
                    name="subFault"
                    value={formData.subFault}
                    onChange={handleChange}
                    className="input input-bordered input-sm text-xs"
                    placeholder="Optional sub-category"
                  />
                </div>
              </div>

              {/* Device Type */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xs">Device Type *</span>
                </label>
                <select
                  className="select select-bordered select-sm"
                  value={formData.deviceType}
                  onChange={handleChange}
                  required
                >
                  <option value="mobile">Mobile</option>
                  <option value="lcd">LCD</option>
                  <option value="pc_laptop">PC/Laptop</option>
                  <option value="others">Others</option>
                </select>
              </div>

              {/* Process Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xs">Process Name *</span>
                </label>
                <input
                  type="text"
                  name="processName"
                  value={formData.processName}
                  onChange={handleChange}
                  className="input input-bordered input-sm text-xs"
                  placeholder="e.g., Charging Port Repair Process"
                  required
                />
              </div>

              {/* Process Steps */}
              <div className="space-y-4">
                <label className="label">
                  <span className="label-text text-xs">Process Steps *</span>
                </label>
                
                {formData.steps.map((step, index) => (
                  <div key={index} className="border p-3 rounded-lg space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Step {index + 1}</h3>
                      {formData.steps.length > 1 && (
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
                        className="input input-bordered input-sm text-xs"
                        value={step.stepName}
                        onChange={(e) => updateStep(index, "stepName", e.target.value)}
                        placeholder="e.g., Check charging port"
                        required
                      />
                    </div>
                    
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-xs">Description</span>
                      </label>
                      <textarea
                        className="textarea textarea-bordered textarea-sm text-xs w-full"
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