import { useEffect } from "react";
 import { useDispatch } from "react-redux";
 import { getAllRepairs } from "../../service/repairApi";
 import { addRepair, removeRepair } from "../store/repairSlice";
 
 const useFetchRepairs = () => {
     const dispatch = useDispatch();
 
     useEffect(() => {
         const fetchRepairs = async () => {
             try {
                 const data = await getAllRepairs();
                 dispatch(addRepair(data.data ))
             } catch (error) {
                 console.error('Failed to fetch repairs:', error);
             }
         };
 
         fetchRepairs();
 
         return () => {
             dispatch(removeRepair());
         };
     }, [dispatch]);
 };
 
 export default useFetchRepairs;