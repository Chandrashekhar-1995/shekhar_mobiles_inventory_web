import React, { useState } from 'react';
import FaultDropdown from '../fault/FaultDropdown';
import { toast } from 'react-toastify';
import { createRepairProcess } from '../../../../service/repairApi';

const CreateRepairProcess = ({ onSubmit }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    fault: "",
    subFaults: "",
    faultName: "",
    deviceType: "mobile",
    processName: "",
    steps: [], // Steps array ko initially empty rakhein
    createdBy: "",
    updatedBy: "",
    isActive: true,
  });

  const [currentStep, setCurrentStep] = useState({
    stepName: "",
    description: "",
    checklistItems: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStepChange = (e) => {
    const { name, value } = e.target;
    setCurrentStep((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addChecklistItem = () => {
    setCurrentStep(prev => ({
      ...prev,
      checklistItems: [...prev.checklistItems, { itemName: '', isChecked: false }]
    }));
  };

  const handleChecklistItemChange = (index, event) => {
    const { value } = event.target;
    const newChecklistItems = currentStep.checklistItems.map((item, i) =>
      i === index ? { ...item, itemName: value } : item
    );
    setCurrentStep(prev => ({ ...prev, checklistItems: newChecklistItems }));
  };

  const handleCheckboxChange = (index) => {
    const newChecklistItems = currentStep.checklistItems.map((item, i) =>
      i === index ? { ...item, isChecked: !item.isChecked } : item
    );
    setCurrentStep(prev => ({ ...prev, checklistItems: newChecklistItems }));
  };

  const addStep = () => {
    if (currentStep.stepName) {
      setFormData(prev => ({
        ...prev,
        steps: [...prev.steps, { ...currentStep, order: prev.steps.length + 1 }],
      }));
      setCurrentStep({ stepName: '', description: '', checklistItems: [] });
    }
  };

  const removeStep = (index) => {
    const newSteps = formData.steps.filter((_, i) => i !== index);
    // Re-order the steps after removal
    const updatedSteps = newSteps.map((step, i) => ({ ...step, order: i + 1 }));
    setFormData(prev => ({ ...prev, steps: updatedSteps }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate required fields
      if (!formData.fault || !formData.processName || formData.steps.length === 0 || formData.steps.some(step => !step.stepName)) {
        toast.error("Please fill all required fields and add at least one step");
        return;
      }

      const data = await createRepairProcess(formData);
      console.log("create process data:", data);
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
      faultName: "",
      deviceType: "mobile",
      processName: "",
      steps: [],
    });
    setCurrentStep({ stepName: "", description: "", checklistItems: [] });
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FaultDropdown formData={formData} setFormData={setFormData} />

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

              </div>

              {/* Process Steps */}
              <div className="mt-3">
                <label className="label">
                  <span className="label-text text-xs">Process Steps *</span>
                </label>

                {/* Steps creation */}
                <div className="grid grid-cols-1 gap-4 border p-3 rounded-lg space-y-2">

                  {/* Step name  */}
                  <div className="form-control">
                    <label className="label mr-3">
                      <span className="label-text">Step Name *</span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered input-sm text-xs"
                      name="stepName"
                      value={currentStep.stepName}
                      onChange={handleStepChange}
                      placeholder="e.g., Check charging port"
                      // required
                    />
                  </div>

                  {/* Checklist Items */}
                  <div className="space-y-2">
                    <label className="label">
                      <span className="label-text text-xs">Checklist Items *</span>
                    </label>
                    {currentStep.checklistItems.map((item, index) => (
                      <div key={index} className='flex items-center space-x-2'>
                        <input
                          type="checkbox"
                          checked={item.isChecked}
                          onChange={() => handleCheckboxChange(index)}
                        />
                        <input
                          type="text"
                          value={item.itemName}
                          onChange={(e) => handleChecklistItemChange(index, e)}
                          placeholder="Checklist name"
                          className="input input-bordered input-sm text-xs w-full"
                        />
                      </div>
                    ))}
                    <button type="button" className='btn btn-sm mt-2' onClick={addChecklistItem}>Add Checklist Item</button>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="label">
                      <span className="label-text text-xs">Description</span>
                    </label>
                    <textarea
                      className="textarea textarea-bordered textarea-sm text-xs w-full"
                      name='description'
                      placeholder="Detailed instructions for this step"
                      value={currentStep.description}
                      onChange={handleStepChange}
                    />
                  </div>

                  <button type="button" className='btn btn-sm bg-green-300' onClick={addStep}>Add Step</button>

                </div>
              </div>


              {/* Step preview */}
              <div>
                <h3>Steps Preview</h3>
                {formData.steps.map((step, index) => (
                  <div key={index} className="border p-3 rounded-md mb-2">
                    <div className="flex justify-between items-center">
                      <h4>{step.stepName} (Step {index + 1})</h4>
                      <button
                        type="button"
                        className="btn btn-sm btn-error"
                        onClick={() => removeStep(index)}
                      >
                        Remove
                      </button>
                    </div>
                    <p className="text-xs mt-1">{step.description}</p>
                    <ul className="list-disc pl-5 mt-2">
                      {step.checklistItems.map((item, i) => (
                        <li key={i} className="text-xs">
                          <input type="checkbox" checked={item.isChecked} readOnly className="mr-2" />
                          {item.itemName}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                {formData.steps.length === 0 && <p className="text-sm italic">No steps added yet.</p>}
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