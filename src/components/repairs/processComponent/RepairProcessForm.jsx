import React, { useState } from 'react';
import FaultDropdown from '../fault/FaultDropdown';

const RepairProcessForm = ({ onProcessCreated }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    fault: '',
    deviceType: 'mobile',
  });

  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState({
    stepName: '',
    description: '',
    checklistItems: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addChecklistItem = () => {
    setCurrentStep((prev) => ({
      ...prev,
      checklistItems: [...prev.checklistItems, { itemName: '', isChecked: false }],
    }));
  };

  const addStep = () => {
    if (currentStep.stepName && currentStep.checklistItems.length > 0) {
      setSteps((prev) => [...prev, { ...currentStep, order: prev.length + 1 }]);
      setCurrentStep({
        stepName: '',
        description: '',
        checklistItems: [],
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, steps });
  };

  const resetForm = () => {
    setFormData({
      name:"",
      fault: "",
      subFault: "",
      deviceType: "mobile",
      processName: "",
      checklistItems: [],
      stepName: "",
      steps: [],
      description: "",
      isCritical: false,
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

              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                {/* Fault Dropdown */}
                <FaultDropdown formData={formData} setFormData={setFormData} />

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
              <div className="space-y-4">
                <label className="label">
                  <span className="label-text text-xs">Process Steps *</span>
                </label>
                a
                <button
                  type="button"
                  className="btn btn-sm btn-outline"
                  onClick={addStep}
                >
                  + Add Another Step
                </button>
              </div>



              {/* Process Steps */}
              <div>
                <h3>Add Steps</h3>
                <label>Step Name</label>
                  <input
                    value={currentStep.stepName}
                    onChange={(e) =>
            setCurrentStep((prev) => ({ ...prev, stepName: e.target.value }))
          }
        />

        <label>Description</label>
        <textarea
          value={currentStep.description}
          onChange={(e) =>
            setCurrentStep((prev) => ({ ...prev, description: e.target.value }))
          }
        />

        <h4>Checklist Items</h4>
        {currentStep.checklistItems.map((item, index) => (
          <div key={index}>
            <input
              type="checkbox"
              checked={item.isChecked}
              onChange={() => {
                const newItems = [...currentStep.checklistItems];
                newItems[index].isChecked = !newItems[index].isChecked;
                setCurrentStep((prev) => ({
                  ...prev,
                  checklistItems: newItems,
                }));
              }}
            />
            <input
              value={item.itemName}
              onChange={(e) => {
                const newItems = [...currentStep.checklistItems];
                newItems[index].itemName = e.target.value;
                setCurrentStep((prev) => ({
                  ...prev,
                  checklistItems: newItems,
                }));
              }}
              placeholder="Item description"
            />
          </div>
        ))}
        <button type="button" onClick={addChecklistItem}>
          Add Checklist Item
        </button>
        <button type="button" onClick={addStep}>
          Add Step
        </button>
      </div>

      <div>
        <h3>Steps Preview</h3>
        {steps.map((step, index) => (
          <div key={index}>
            <h4>{step.stepName} (Step {index + 1})</h4>
            <p>{step.description}</p>
            <ul>
              {step.checklistItems.map((item, i) => (
                <li key={i}>
                  <input type="checkbox" checked={item.isChecked} readOnly />
                  {item.itemName}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

              <button type="submit">Save Process</button>

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
      )};

    
    </div>
  );
};

export default RepairProcessForm;


// This component is a form for creating a repair process. It allows the user to input the process name, select a fault, choose a device type, and add steps with checklist items. The form data is managed using React's useState hook. When the form is submitted, it calls the onSubmit function passed as a prop with the form data.