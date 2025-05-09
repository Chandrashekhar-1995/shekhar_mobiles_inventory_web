import React from "react";

const MoreDetails = ({formData, handleChange}) => {
  return (
    <>
    <div className="outline text-center text-2xl font-bold bg-white mt-6">MORE DETAILS</div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

      {/* dateOfBirth */}
      <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-xs">Date Of Birth</span>
          </label>
          <input
            type="date"
            name="dateOfBirth"
            className="input input-bordered input-sm text-xs"
            value={formData.dateOfBirth || ""}
            onChange={handleChange}
          />
      </div>

      {/* Marrige Aniversary */}
      <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-xs">Marrige Aniversary</span>
          </label>
          <input
            type="date"
            name="marrigeAniversary"
            className="input input-bordered input-sm text-xs"
            value={formData.marrigeAniversary || ""}
            onChange={handleChange}
          />
      </div>

        {/* gender */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-xs">Gender</span>
          </label>
          <select
            name="gender"
            className="select select-bordered select-sm text-xs"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
        </div>

        {/* creditLimit */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-xs">creditLimit</span>
          </label>
          <input
            type="number"
            name="creditLimit"
            className="input input-bordered input-sm text-xs"
            value={formData.creditLimit}
            onChange={handleChange}
          />
        </div>

    </div>
    </>
  )
}

export default MoreDetails;