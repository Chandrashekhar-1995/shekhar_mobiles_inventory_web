import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllRepairProcesses } from "../../service/repairApi";
import { setAllProcesses } from "../store/repairProcessSlice";
import { toast } from "react-toastify";

const useFetchRepairProcesses = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProblemTypes = async () => {
            try {
                const data = await getAllRepairProcesses();
                if(data.success){
                    dispatch(setAllProcesses(data.data.processes))
                } else {
                    toast.error(data.message)
                }
            } catch (error) {
                toast.error("Failed to fetch types:", error);
            }
        };

        fetchProblemTypes();

    }, [dispatch]);
};

export default useFetchRepairProcesses;
