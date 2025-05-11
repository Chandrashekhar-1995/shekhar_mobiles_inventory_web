import React, { useState, useEffect } from "react";

const RepairTracking = ({ repair, repairItemIndex, process, onUpdate }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [checklist, setChecklist] = useState([]);

  useEffect(() => {
    // Initialize checklist from process or saved data
    if (process && process.steps && process.steps.length > 0) {
      const initialChecklist = process.steps.map(step => ({
        stepId: step._id,
        stepName: step.stepName,
        isCompleted: false,
        checklistItems: step.checklistItems.map(item => ({
          itemName: item.itemName,
          isChecked: false
        }))
      }));
      setChecklist(initialChecklist);
    }
  }, [process]);

  const handleCheckItem = (stepIndex, itemIndex) => {
    const newChecklist = [...checklist];
    newChecklist[stepIndex].checklistItems[itemIndex].isChecked = 
      !newChecklist[stepIndex].checklistItems[itemIndex].isChecked;
    setChecklist(newChecklist);
  };

  const completeStep = (stepIndex) => {
    const newChecklist = [...checklist];
    newChecklist[stepIndex].isCompleted = true;
    setChecklist(newChecklist);
    
    if (stepIndex < checklist.length - 1) {
      setCurrentStepIndex(stepIndex + 1);
    }
    
    // Save progress
    onUpdate({
      currentStep: stepIndex < checklist.length - 1 ? stepIndex + 1 : stepIndex,
      steps: newChecklist
    });
  };

  return (
    <div className="repair-tracking">
      <h2>Repair Process: {process?.name}</h2>
      
      <div className="progress-steps">
        {checklist.map((step, stepIndex) => (
          <div 
            key={stepIndex} 
            className={`step ${stepIndex === currentStepIndex ? "active" : ""} ${step.isCompleted ? "completed" : ""}`}
          >
            <h3>
              Step {stepIndex + 1}: {step.stepName}
              {step.isCompleted && <span> ✓</span>}
            </h3>
            
            {stepIndex === currentStepIndex && (
              <div className="checklist">
                <h4>Checklist:</h4>
                <ul>
                  {step.checklistItems.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <label>
                        <input
                          type="checkbox"
                          checked={item.isChecked}
                          onChange={() => handleCheckItem(stepIndex, itemIndex)}
                        />
                        {item.itemName}
                      </label>
                    </li>
                  ))}
                </ul>
                
                <button 
                  onClick={() => completeStep(stepIndex)}
                  disabled={step.checklistItems.some(item => !item.isChecked)}
                >
                  Complete Step
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RepairTracking;