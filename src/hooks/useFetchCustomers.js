import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllCustomers } from "../../service/customerApi";
import { addCustomer, removeCustomer } from "../store/customerSlice";

const useFetchCustomers = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const data = await getAllCustomers();
                dispatch(addCustomer(data.data.customers))
            } catch (error) {
                console.error("Failed to fetch customers :", error);
            }
        };

        fetchCustomers();
        // return () => {
        //     dispatch(removeCustomer());
        // };
    }, [dispatch]);
};

export default useFetchCustomers;
