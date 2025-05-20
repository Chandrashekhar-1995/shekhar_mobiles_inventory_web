import React, { useState } from "react";
import { passwordReset } from "../../../service/authApi";
import { toast } from "react-toastify";

const ResetPasswordForm = ({ userId }) => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
        const data = await passwordReset({ userId, newPassword: password });
        if(data.success) {
          toast.success(data.message || "Password updated successfully");
        }
    } catch (err) {
      toast.error(err.message ||"Error updating password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Set New Password</h2>
      <div className="form-control">
        <label className="label">New Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="input input-bordered" />
      </div>
      <div className="form-control">
        <label className="label">Confirm Password</label>
        <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required className="input input-bordered" />
      </div>
      <button type="submit" className="btn btn-primary mt-4" disabled={loading}>
        {loading ? 'Updating...' : 'Change Password'}
      </button>
    </form>
  );
}


export default ResetPasswordForm;