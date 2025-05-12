import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import useFetchCustomers from "../../hooks/useFetchCustomers";
import { toast } from "react-toastify";
import { deleteCustomer } from "../../../service/customerApi";
import { removeCustomer } from "../../store/customerSlice";

const SupplierTable = () => {
  useFetchCustomers();
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customers.allCustomers);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    if (customers) {
      const filteredSuppliers = customers.filter(
        (customer) => customer?.designation === "supplier"
      );
      setSuppliers(filteredSuppliers);
    }
  }, [customers]);

  const handleDeleteClick = (customer) => {
    setCustomerToDelete(customer);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const data = await deleteCustomer(customerToDelete._id);
      if (data.success) {
        toast.success(data.message);
        dispatch(removeCustomer(customerToDelete._id)); // Update Redux store
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error deleting customer. Please try again.");
    } finally {
      setShowDeleteModal(false);
      setCustomerToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setCustomerToDelete(null);
  };

  return (
    <div className="overflow-x-auto mb-6">
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">
              Confirm Delete
            </h3>
            <p className="mb-6">
              Are you sure you want to delete supplier{" "}
              <span className="font-bold">{customerToDelete?.name}</span>?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                No, Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="px-4 py-2">S.No.</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Mobile No.</th>
            <th className="px-4 py-2">Address</th>
            <th className="px-4 py-2">Balance</th>
            <th className="px-4 py-2">Edit</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {suppliers &&
            suppliers.map((supplier, index) => (
              <tr
                key={supplier._id}
                className="odd:bg-white even:bg-gray-100"
              >
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{supplier.name}</td>
                <td className="border px-4 py-2">{supplier.mobileNumber}</td>
                <td className="border px-4 py-2">{supplier.address}</td>
                <td className="border px-4 py-2">{supplier.balance}</td>
                <td className="border px-4 py-2">
                  <Link
                    to={`/user/customer/profile/${supplier._id}`}
                    className="text-blue-500 hover:underline"
                  >
                    View/Edit
                  </Link>
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDeleteClick(supplier)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default SupplierTable;