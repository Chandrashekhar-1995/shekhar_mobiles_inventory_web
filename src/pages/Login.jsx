import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../store/userSlice';
import { login } from '../../service/authApi';
import { toast } from 'react-toastify';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    identifier: '', 
    password: '',
  });

  const dispatch = useDispatch();
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
        const data = await login(formData);

        if(data.success){
          toast.success(data.message);
          dispatch(addUser(data.data))
          const role = data.data.designation;
          const userRoles = [
            "relationship_manager",
            "admin",
            "marketing_executive", 
            "manager", 
            "accountant", 
            "clerk", 
            "peon", 
            "office_boy", 
            "receptionist", 
            "trainee"
          ];

          if (role === "admin") {
            navigate("/user/admin");
          } else if(role === "customer") {
            navigate("/customer");
          } else if (userRoles.includes(role)) {
            navigate("/user");
          } else {
            navigate("/");
          }
      }else{
        toast.error(data.message || "Login failed");
      }
        
      } catch (error) {
        console.error(error)
      } finally{
        setLoading(false);
      }
      
    }
  return (
    <div className="flex items-center justify-center h-screen bg-gray-500">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-center">
          
        {/* email or mobile number */}
        <label className="input validator">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></g></svg>
          <input 
            type="text" 
            placeholder="email or mobile number" 
            name="identifier"
            value={formData.identifier}
            onChange={handleChange}
            required
          />
        </label>

        {/* password */}
        <label className="input validator">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></g></svg>
          <input 
            type="password" 
            placeholder="Password"
            minLength="8"
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
          {loading ? "Login..." : "Login"}
        </button>

        <p
              className="hover:text-blue-800 cursor-pointer"
              onClick={() => navigate('/register')}
            >
              Don't have an account? Signup
            </p>
        
        </form>

      </div>
    </div>
  )
}

export default Login;