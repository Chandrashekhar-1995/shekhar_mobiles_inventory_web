import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchLast90DaysSales, fetchTodaySummary } from "../store/salesSlice";

const useSalesData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLast90DaysSales());
    dispatch(fetchTodaySummary());
  }, [dispatch]);
};

export default useSalesData;