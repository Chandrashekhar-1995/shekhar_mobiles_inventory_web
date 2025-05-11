import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const user = useSelector((store)=>store.user);
  
  useEffect(() =>{
    if (user) {
      const role = user.designation;
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
      } else if (userRoles.includes(role)) {
        navigate("/user")
      } 
    }
  },[user]);

  return (
    <div>HomePage</div>
  )
}

export default HomePage;