import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllInvoice } from "../../service/invoiceApi";
import { addInvoices, clearInvoices } from "../store/invoiceSlice";

const useFetchInvoices = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const data = await getAllInvoice();               
                dispatch(addInvoices(data.data));
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
