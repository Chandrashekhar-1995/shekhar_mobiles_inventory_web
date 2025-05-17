// RepairProcessSteps.js
import React from "react";

const RepairProcessSteps = ({ process, currentStatus, onCheckboxChange }) => {
  const getStepStatus = (stepId) =>
    currentStatus?.completedSteps.find(
      (s) => s.stepId.toString() === stepId.toString()
    );

  // only complete when you have clicked every item and all are checked
  const isStepCompleted = (step) => {
    const stepStatus = getStepStatus(step._id);
    if (!stepStatus) return false;
    // must match total items
    if (stepStatus.checkedItems.length !== step.checklistItems.length)
      return false;
    // and each one true
    return stepStatus.checkedItems.every((i) => i.isChecked);
  };

  const isItemCompleted = (stepStatus, itemId) => {
    if (!stepStatus) return false;
    const item = stepStatus.checkedItems.find(
      (i) => i.itemId.toString() === itemId.toString()
    );
    return item?.isChecked || false;
  };

  const isCurrentStep = (stepIndex) => currentStatus?.currentStep === stepIndex;

  return (
    <div className="border border-gray-300 rounded-md shadow-sm p-4 bg-white mb-4">
      <h3 className="text-sm font-semibold mb-3">
        Repair Process: {process.processName}
        <span className="ml-2 text-blue-600">
          (Step {currentStatus?.currentStep + 1} of {process.steps.length})
        </span>
      </h3>

      <div className="space-y-4">
        {process.steps.map((step, index) => {
          const stepStatus = getStepStatus(step._id);
          const completed = isStepCompleted(step);
          const current = isCurrentStep(index);

          return (
            <div
              key={step._id}
              className={`p-3 rounded-md border ${
                current
                  ? "border-blue-300 bg-blue-50"
                  : completed
                  ? "border-green-200 bg-green-50"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">
                  {index + 1}. {step.stepName}
                </h4>
                {completed && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    Completed
                  </span>
                )}
                {current && !completed && (
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    Current Step
                  </span>
                )}
              </div>

              {step.description && (
                <p className="text-sm text-gray-600 mb-2">
                  {step.description}
                </p>
              )}

              <div className="space-y-2 ml-4">
                {step.checklistItems.map((item) => (
                  <div key={item._id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`${step._id}-${item._id}`}
                      checked={isItemCompleted(stepStatus, item._id)}
                      onChange={(e) =>
                        onCheckboxChange(step._id, item._id, e.target.checked)
                      }
                      className="mr-2 h-4 w-4"
                      disabled={completed}
                    />
                    <label
                      htmlFor={`${step._id}-${item._id}`}
                      className={`text-sm ${
                        isItemCompleted(stepStatus, item._id)
                          ? "line-through text-gray-500"
                          : ""
                      }`}
                    >
                      {item.itemName}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RepairProcessSteps;
