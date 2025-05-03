import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllFault } from "../../service/faultApi";
import { addFaults, removeFaults } from "../store/faultSlice";

const useFetchFaults = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchFaults = async () => {
            try {
                const data = await getAllFault();
                dispatch(addFaults(data.data.faults))
            } catch (error) {
                console.error("Failed to fetch faults:", error);
            }
        };

        fetchFaults();

        return () => {
            dispatch(removeFaults());
        };
    }, [dispatch]);
};

export default useFetchFaults;
