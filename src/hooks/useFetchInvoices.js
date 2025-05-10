import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllInvoice } from "../../service/invoiceApi";
import { addInvoices } from "../store/invoiceSlice";
import { toast } from "react-toastify";

const useFetchInvoices = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await getAllInvoice();
        dispatch(addInvoices(response.data.invoices));
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch invoices");
      }
    };

    fetchInvoices();
  }, [dispatch]);
};

export default useFetchInvoices;