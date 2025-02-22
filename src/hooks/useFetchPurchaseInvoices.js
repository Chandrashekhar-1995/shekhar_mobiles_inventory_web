import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { API_BASE_URL } from "../utils/const";
import { addPurchaseInvoices, clearPurchaseInvoices } from "../store/purchaseInvoiceSlice";

const useFetchPurchaseInvoices = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchPurchaseInvoices = async () => {
            try {
                const {data} = await axios.get(`${API_BASE_URL}purchase-invoice/all-invoice?page=1&limit=10`); 
                dispatch(addPurchaseInvoices(data.data.purchaseInvoices));
            } catch (error) {
                console.error('Failed to fetch Purchase invoices:', error);
            }
        };

        fetchPurchaseInvoices();
        return () => {
            dispatch(clearPurchaseInvoices());
        };
    }, [dispatch]);
};

export default useFetchPurchaseInvoices;
