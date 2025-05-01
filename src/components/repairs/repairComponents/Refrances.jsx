import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Refrances = ({formData, handleChange,}) => {
    const allUsers = useSelector((store) => store.allUsers.allUsers);
    const user = useSelector((store)=>store.user);

    useEffect(() => {
        if (allUsers?.length > 0) {
            if (!formData.bookBy) {
                handleChange({ target: { name: "bookBy", value: user._id } });
            }
            if (!formData.repairUnder) {
                handleChange({ target: { name: "repairUnder", value: allUsers[0]._id } });
            }
        }
    }, [allUsers]);

  return (
    <div className="border border-base-300 rounded-md shadow-sm p-4 bg-base-100">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">

            {/* Book By */}
            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text text-xs">Book By</span>
                </label>
                <select
                    name="bookBy"
                    value={formData.bookBy}
                    className="select select-bordered select-sm text-xs"
                    onChange={handleChange}
                >
                    {allUsers && (
                        allUsers.map((user) => (
                            <option
                                key={user._id} 
                                value={user._id} >{user.name}</option>
                            ))
                    )}
                </select>
            </div> 

            {/* repair Under */}
            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text text-xs">Repair Under</span>
                </label>
                <select
                    name="repairUnder"
                    value={formData.repairUnder}
                    className="select select-bordered select-sm text-xs"
                    onChange={handleChange}
                >
                    {allUsers && (
                        allUsers.map((user) => (
                            <option
                                key={user._id} 
                                value={user._id} >{user.name}</option>
                            ))
                    )}
                </select>
            </div> 

            {/* Refer By */}
            <div className="form-control w-full">
            <label className="label">
                <span className="label-text text-xs">Refer By</span>
            </label>
            <input
                type="text"
                name="referBy"
                className="input input-bordered input-sm text-xs"
                value={formData.referBy}
                onChange={handleChange}
                />
            </div>   

            {/* Expect Delivery Date */}
            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text text-xs">Expect Delivery Date</span>
                </label>
                <input
                type="date"
                name="expectDeliveryDate"
                className="input input-bordered input-sm text-xs"
                value={formData.expectDeliveryDate}
                onChange={handleChange}
                />
            </div>   

        </div>
    </div>
  )
}

export default Refrances