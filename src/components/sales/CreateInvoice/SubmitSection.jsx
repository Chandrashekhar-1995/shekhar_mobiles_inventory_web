import React from "react";
import { Button, CircularProgress } from "@mui/material";

const SubmitSection = ({ formData, totalItemPrice, loading, handleSubmit }) => {
  return (
    <div className="bg-gray-300 my-2 p-2 flex justify-between">
      <div className="">Coming soon tools</div>
      <div className="flex justify-between">
        {/* Balance */}
        <div className="flex justify-between items-center mr-8">
          <label className="font-medium text-gray-600 px-4">Balance:</label>
          <span className="font-medium text-gray-800 w-20">
            ₹ {formData.items.length > 0 ? (totalItemPrice - formData.discountAmount) - formData.receivedAmount : "00.00"}
          </span>
        </div>
        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          className="bg-blue-500 hover:bg-blue-600 text-white"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? <CircularProgress size={24} className="text-white" /> : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default SubmitSection;