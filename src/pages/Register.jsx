import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import { register } from "../../service/authApi";
import { toast } from "react-toastify";


const Register = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email:"",
    mobileNumber:"",
    address:"",
    password: "",
  });
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await register(formData)
      if(data.success){
        toast.success(data.message);
        navigate("/login");
      }else{
        toast.error(data.message || "Signup failed");
      }
      
    } catch (error) {

    } finally{
      setLoading(false);
    }
    
  }
  return (
    <div className="flex items-center justify-center h-screen bg-gray-500">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-center">
          
        {/* name */}
        <label className="input validator">
          <input 
            type="text" 
            placeholder="name" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        {/* email */}
        <label className="input validator">
          <input 
            type="email" 
            placeholder="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        {/* mobile no */}
        <label className="input validator">
          <input 
            type="tel" 
            placeholder="Mobile Number" 
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            pattern="[0-9]*" 
            minLength="10" 
            maxLength="10" 
            title="Must be 10 digits"
            required
          />
        </label>
        <p className="validator-hint hidden">Must be 10 digits</p>

        {/* address */}
        <label className="input validator">
        <input 
            type="text" 
            placeholder="address" 
            name="address"
            value={formData.address}
            onChange={handleChange}
             minLength="3"
            required
          />
        </label>

        {/* password */}
        <label className="input validator">
          <input 
            type="password" 
            placeholder="Password" minlength="8" 
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" />
        </label>
        <p className="validator-hint hidden">
         Must be more than 8 characters, including
          <br/>At least one number
          <br/>At least one lowercase letter
          <br/>At least one uppercase letter
        </p>

        <button className="btn btn-primary items-center">
          {loading ? "Registring..." : "Register"}
        </button>

        <p
          className="hover:text-blue-800 cursor-pointer"
          onClick={() => navigate("/login")}
          >
          Already have an account? Signup
        </p>
        
        </form>

      </div>
    </div>
  )
}

export default Register