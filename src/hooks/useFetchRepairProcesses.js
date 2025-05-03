import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllRepairProcesses } from "../../service/repairApi";
import { setAllProcesses } from "../store/repairProcessSlice";

const useFetchRepairProcesses = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProblemTypes = async () => {
            try {
                const data = await getAllRepairProcesses();
                if(data.success){
                    dispatch(setAllProcesses(data.data.repairProcesses))
                }
            } catch (error) {
                console.error('Failed to fetch types:', error);
            }
        };

        fetchProblemTypes();

    }, [dispatch]);
};

export default useFetchRepairProcesses;
