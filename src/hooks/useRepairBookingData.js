import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchLast90DaysRepairBooking, fetchTodayRepairBookingSummary } from "../store/repairBookingSlice";


const useRepairBookingData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLast90DaysRepairBooking());
    dispatch(fetchTodayRepairBookingSummary());
  }, [dispatch]);
};

export default useRepairBookingData;