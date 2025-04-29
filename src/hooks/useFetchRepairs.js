import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllRepair } from "../../service/repairApi";
import { addRepair, removeRepair } from "../store/repairSlice";

const useFetchRepairs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchRepairs = async () => {
            try {
                const data = await getAllRepair();
                dispatch(addRepair(data.data.invoices ))
            } catch (error) {
                console.error('Failed to fetch brands:', error);
            }
        };

        fetchRepairs();

        return () => {
            dispatch(removeRepair());
        };
    }, [dispatch]);
};

export default useFetchRepairs;
