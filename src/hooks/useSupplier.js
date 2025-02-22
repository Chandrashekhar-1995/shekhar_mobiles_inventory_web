import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addSupplier } from "../store/supplierSlice";
import { API_BASE_URL } from "../utils/const";

const useSupplier = () => {
    const dispatch = useDispatch();
    const supplier = useSelector(store => store.suppliers.allSuppliers);

    const getSupplier = async () => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}customer/feed`,
                { withCredentials: true }
            );

            const allSuppliers = response.data.data;

            // Filter only those suppliers whose designation is "Customer"
            const filteredSuppliers = allSuppliers.filter(supplier => supplier.designation === "Supplier")

            dispatch(addSupplier(filteredSuppliers));
        } catch (error) {
            console.error("Error fetching suppliers:", error);
        }
    };

    useEffect(() => {
        if (!supplier || supplier.length === 0) {
            getSupplier();
        }
    }, [supplier, dispatch]);

    return supplier;
};

export default useSupplier;
