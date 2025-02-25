import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { API_BASE_URL } from "../utils/const";
import { addInvoices, clearInvoices } from "../store/invoiceSlice";

const useFetchInvoices = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const {data} = await axios.get(`${API_BASE_URL}invoice/all-invoice?page=1&limit=10`);
                // console.log(data.data.invoices);                
                dispatch(addInvoices(data.data.invoices));
            } catch (error) {
                console.error('Failed to fetch invoices:', error);
            }
        };

        fetchInvoices();

        // Clean up invoices when component unmounts
        return () => {
            dispatch(clearInvoices());
        };
    }, [dispatch]);
};

export default useFetchInvoices;
