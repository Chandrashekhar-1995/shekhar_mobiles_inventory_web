import { useState } from "react";
import { passwordResetRequest } from "../../../service/authApi";
import { toast } from "react-toastify";

const ResetRequestForm = ({ onVerified }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
      name: "", 
      mobileNumber: "",
      email: "",
    });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await passwordResetRequest(formData);
      if(data.success) {
          onVerified(data.data.userId);
      } else {
        toast.error(data.message || "Error verifying account"); 
      }
    } catch (err) {

    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Verify Your Account</h2>
      <div className="form-control">
        <label className="label">Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required className="input input-bordered" />
      </div>
      <div className="form-control">
        <label className="label">Mobile Number</label>
        <input type="text" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} required className="input input-bordered" />
      </div>
      <div className="form-control">
        <label className="label">Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required className="input input-bordered" />
      </div>
      <button type="submit" className="btn btn-primary mt-4" disabled={loading}>
        {loading ? 'Verifying...' : 'Verify'}
      </button>
    </form>
  );
}

export default ResetRequestForm;
