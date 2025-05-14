import { useState } from "react";
import { Combobox } from "@headlessui/react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import useFetchAccounts from "../../hooks/useFetchAccounts";
import { createAccount } from "../../../service/accountApi";

const AccountDropdown = ({ formData, setFormData }) => {
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newAccountName, setNewAccountName] = useState("");

  useFetchAccounts();

  const allAccounts = useSelector((store) => store.accounts.allAccounts);

  const filteredAccount =
    query === ""
      ? allAccounts
      : allAccounts.filter((a) =>
          a.accountName?.toLowerCase().includes(query.toLowerCase())
        );

  const handleSelect = (accountObj) => {
    setQuery(accountObj.accountName);
    setFormData(prev => ({
      ...prev,
      paymentMode: accountObj.accountName,
      paymentAccount: accountObj._id
      }));
  };
        

  const handleBlur = () => {
    const accountExists = allAccounts.some(
      (a) => a.accountName.toLowerCase() === query.toLowerCase()
    );
    if (query && !accountExists) {
      setNewBrandName(query);      
      setShowModal(true);
    }
  };

  const addAccount = async (e) => {
    e.preventDefault();
    try {
      const data = await createAccount({ accountName: newAccountName });
      if (data.success) {
        toast.success(data.message)
        setFormData(prev => ({
          ...prev,
          accountName: newAccountName,
          paymentAccount: data.data._id
        }));
      } else{
        toast.error(data.message)
      }
    } catch (error) {
      
    } finally {
      setShowModal(false);
    }
  };
  

  const cancelCreate = () => {
    setFormData(prev => ({
      ...prev,
      accountName: "",
      paymentAccount: ""
    }));
    setQuery("");
    setShowModal(false);
  };
  
  return (
      <div className="form-control">
        <label className="label">
          <span className="label-text text-xs">Payment Mode *</span>
        </label>
        <Combobox value={query} onChange={handleSelect}>
          <div className="relative">
            <Combobox.Input
              className="input input-bordered input-sm text-xs w-full"
              onChange={(e) => setQuery(e.target.value)}
              onBlur={handleBlur}
              displayValue={() => query}
              placeholder="Paymant Mode"
            />
            {allAccounts && filteredAccount.length > 0 && (
              <Combobox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                {filteredAccount.map((a) => (
                  <Combobox.Option
                    key={a._id}
                    value={a}
                    className={({ active }) =>
                      `cursor-pointer px-4 py-2 ${
                        active ? "bg-blue-500 text-white" : "text-black"
                      }`
                    }
                  >
                    {a.accountName}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}
          </div>
        </Combobox>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center opacity-80 bg-black  bg-op z-20">
            <div className="bg-white p-6 rounded-lg shadow-md w-[90%] max-w-md text-center space-y-4">
              <h2 className="text-lg font-semibold">Create new Account " {newAccountName}"?</h2>

              <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-xs">Account Type</span>
          </label>
          <select
            name="accountType"
            className="select select-bordered select-sm text-xs"
            value={formData.accountType}
            onChange={handleChange}
          >
            <option value="cash">Cash</option>
            <option value="qr_code">QR Code</option>
            <option value="razorpay">Bill of Supply</option>
            <option value="bank">Bank</option>
          </select>
        </div>
              <div className="flex justify-center gap-4">
                <button
                  className="btn btn-success btn-sm"
                  onClick={addAccount}
                >
                  Yes
                </button>
                <button
                  className="btn btn-error btn-sm"
                  onClick={cancelCreate}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
  );
};

export default AccountDropdown;
