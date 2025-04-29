import React from "react";

const SubmitSection = ({ formData, totalItemPrice, loading, handleSubmit }) => {
  return (
    <div className="bg-gray-300 my-2 p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      <div className=""></div>

        {/* Balance */}
        <div className="flex justify-between items-center mr-8">
          <label className="font-medium text-gray-600 px-4">Balance:</label>
          <span className="font-medium text-gray-800 w-20">
            ₹ {formData.repairing.length > 0 ? (totalItemPrice - formData.discountAmount) - formData.advanceAmount : "00.00"}
          </span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`btn btn-primary ${loading ? 'btn-disabled' : ''}`}
          onClick={handleSubmit}
        >
          {loading ? <span className="loading loading-spinner ">Booking...</span> : "Book" }
        </button>

    </div>
  );
};

export default SubmitSection;