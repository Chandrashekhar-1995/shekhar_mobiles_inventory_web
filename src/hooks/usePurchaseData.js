import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchLast90DaysPurchases, fetchTodayPurchaseSummary } from '../store/purchaseSlice';

const usePurchaseData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLast90DaysPurchases());
    dispatch(fetchTodayPurchaseSummary());
  }, [dispatch]);
};

export default usePurchaseData;