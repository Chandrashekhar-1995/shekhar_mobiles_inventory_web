import React from "react";

const ActionButton = () => {
  return (
    <div className="container mx-auto py-4 grid grid-cols-2 gap-2 bg-gray-100">
        <button className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 ">
          New Sale
        </button>

        <button className="bg-primary hover:bg-green-700 text-white font-bold py-2 px-4 ">
          Add Purchase
        </button>

        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 ">
          Add Customer
        </button>

        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 ">
          Payment In
        </button>

        <button className="bg-primary hover:bg-green-700 text-white font-bold py-2 px-4 ">
          Payment Out
        </button>

        <button className="bg-primary hover:bg-green-700 text-white font-bold py-2 px-4 ">
          Test 2
        </button>
    </div>
  )
}

export default ActionButton;