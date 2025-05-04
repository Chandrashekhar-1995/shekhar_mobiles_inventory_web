import React, { useState } from "react";

const RepairProcessDropdown = ({ formData, setFormData }) => {
  // Standard repair processes
  const standardProcesses = [
    {
      id: 1,
      name: "Initial Diagnosis",
      steps: [
        "Visual inspection",
        "Power on test",
        "Functional testing",
        "Diagnostic software run"
      ]
    },
    {
      id: 2,
      name: "Disassembly",
      steps: [
        "Remove back cover",
        "Disconnect battery",
        "Remove damaged components",
        "Clean internal components"
      ]
    },
    {
      id: 3,
      name: "Repair/Replacement",
      steps: [
        "Replace faulty parts",
        "Repair damaged circuits",
        "Reapply thermal paste",
        "Solder loose connections"
      ]
    },
    {
      id: 4,
      name: "Reassembly",
      steps: [
        "Reconnect all components",
        "Secure all screws",
        "Replace protective films",
        "Ensure proper sealing"
      ]
    },
    {
      id: 5,
      name: "Quality Check",
      steps: [
        "Final functional test",
        "Cosmetic inspection",
        "Performance benchmark",
        "Battery calibration"
      ]
    }
  ];

  // State for completed steps
  const [completedSteps, setCompletedSteps] = useState(
    formData.repairProcessSteps || {}
  );

  // State for repair completion status
  const [repairStatus, setRepairStatus] = useState(
    formData.repairStatus || "In Progress"
  );

  // Handle checkbox toggle
  const handleStepToggle = (processId, stepIndex) => {
    const key = `${processId}-${stepIndex}`;
    const newCompletedSteps = {
      ...completedSteps,
      [key]: !completedSteps[key]
    };
    
    setCompletedSteps(newCompletedSteps);
    setFormData({
      ...formData,
      repairProcessSteps: newCompletedSteps
    });
  };

  // Handle status change
  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setRepairStatus(newStatus);
    setFormData({
      ...formData,
      repairStatus: newStatus
    });
  };

  return (
    <div className="mt-6 border-t pt-4">
      <h3 className="text-sm font-medium mb-3">Repair Process Checklist</h3>
      
      <div className="space-y-6">
        {standardProcesses.map((process) => (
          <div key={process.id} className="border rounded-lg p-4 bg-white">
            <h4 className="font-medium text-sm mb-3">{process.name}</h4>
            
            <div className="space-y-2">
              {process.steps.map((step, stepIndex) => (
                <div key={stepIndex} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`step-${process.id}-${stepIndex}`}
                    checked={completedSteps[`${process.id}-${stepIndex}`] || false}
                    onChange={() => handleStepToggle(process.id, stepIndex)}
                    className="checkbox checkbox-xs mr-2"
                  />
                  <label htmlFor={`step-${process.id}-${stepIndex}`} className="text-xs">
                    {step}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-xs">Repair Status</span>
          </label>
          <select
            value={repairStatus}
            onChange={handleStatusChange}
            className="select select-bordered select-sm text-xs"
          >
            <option value="In Progress">In Progress</option>
            <option value="Waiting for Parts">Waiting for Parts</option>
            <option value="Diagnosis Complete">Diagnosis Complete</option>
            <option value="Repair Complete">Repair Complete</option>
            <option value="Quality Check Passed">Quality Check Passed</option>
            <option value="Ready for Pickup">Ready for Pickup</option>
          </select>
        </div>

        <div className="text-xs text-gray-500 mt-6">
          {Object.values(completedSteps).filter(Boolean).length} steps completed
        </div>
      </div>
    </div>
  );
};

export default RepairProcessDropdown;