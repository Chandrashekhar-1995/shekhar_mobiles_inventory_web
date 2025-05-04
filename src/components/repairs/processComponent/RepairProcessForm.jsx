import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const RepairProcessForm = ({ faults, onSubmit }) => {
  const { register, handleSubmit, control } = useForm();
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState({
    stepName: '',
    description: '',
    checklistItems: []
  });

  const addChecklistItem = () => {
    setCurrentStep(prev => ({
      ...prev,
      checklistItems: [...prev.checklistItems, { itemName: '', isChecked: false }]
    }));
  };

  const addStep = () => {
    if (currentStep.stepName && currentStep.checklistItems.length > 0) {
      setSteps(prev => [...prev, { ...currentStep, order: prev.length + 1 }]);
      setCurrentStep({
        stepName: '',
        description: '',
        checklistItems: []
      });
    }
  };

  const submitForm = (data) => {
    onSubmit({
      ...data,
      steps
    });
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div>
        <label>Process Name</label>
        <input {...register('name', { required: true })} />
      </div>
      
      <div>
        <label>Fault</label>
        <select {...register('fault', { required: true })}>
          {faults.map(fault => (
            <option key={fault._id} value={fault._id}>{fault.name}</option>
          ))}
        </select>
      </div>
      
      <div>
        <label>Device Type</label>
        <select {...register('deviceType', { required: true })}>
          <option value="mobile">Mobile</option>
          <option value="lcd">LCD</option>
          <option value="pc_laptop">PC/Laptop</option>
          <option value="others">Others</option>
        </select>
      </div>
      
      <div>
        <h3>Add Steps</h3>
        <div>
          <label>Step Name</label>
          <input 
            value={currentStep.stepName}
            onChange={(e) => setCurrentStep(prev => ({ ...prev, stepName: e.target.value }))}
          />
        </div>
        <div>
          <label>Description</label>
          <textarea 
            value={currentStep.description}
            onChange={(e) => setCurrentStep(prev => ({ ...prev, description: e.target.value }))}
          />
        </div>
        
        <div>
          <h4>Checklist Items</h4>
          {currentStep.checklistItems.map((item, index) => (
            <div key={index}>
              <input
                type="checkbox" 
                checked={item.isChecked}
                onChange={() => {
                  const newItems = [...currentStep.checklistItems];
                  newItems[index].isChecked = !newItems[index].isChecked;
                  setCurrentStep(prev => ({ ...prev, checklistItems: newItems }));
                }}
              />
              <input
                value={item.itemName}
                onChange={(e) => {
                  const newItems = [...currentStep.checklistItems];
                  newItems[index].itemName = e.target.value;
                  setCurrentStep(prev => ({ ...prev, checklistItems: newItems }));
                }}
                placeholder="Item description"
              />
            </div>
          ))}
          <button type="button" onClick={addChecklistItem}>Add Checklist Item</button>
        </div>
        
        <button type="button" onClick={addStep}>Add Step</button>
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
    </form>
  );
};

export default RepairProcessForm;