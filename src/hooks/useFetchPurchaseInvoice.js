import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllPurchaseInvoice } from "../../service/purchaseInvoiceApi";
import { addPurchaseInvoices } from "../store/purchaseInvoiceSlice";
import { toast } from "react-toastify";
import { data } from "react-router-dom";

const useFetchPurchaseInvoices = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const data = await getAllPurchaseInvoice();               
                dispatch(addPurchaseInvoices(data.data.purchaseInvoices));
            } catch (error) {
                toast.error(data.error || "Failed to fetch purchase invoices");
            }
        };

        fetchInvoices();

    }, [dispatch]);
};

export default useFetchPurchaseInvoices;
