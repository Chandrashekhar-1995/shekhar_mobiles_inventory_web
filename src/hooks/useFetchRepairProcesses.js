import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllRepairProcesses } from "../../service/repairApi";
import { setFaultTypes } from "../store/repairProcessSlice";

const useFetchRepairProcesses = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProblemTypes = async () => {
            try {
                const data = await getAllRepairProcesses();
                if(data.success){
                    dispatch(setFaultTypes(data.data))
                }
            } catch (error) {
                console.error('Failed to fetch types:', error);
            }
        };

        fetchProblemTypes();

    }, [dispatch]);
};

export default useFetchRepairProcesses;
