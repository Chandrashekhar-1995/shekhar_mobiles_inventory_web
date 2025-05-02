import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllAccount } from "../../service/accountApi";
import { addAccount, removeAccount } from "../store/accountSlice";

const useFetchAccounts = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const data = await getAllAccount();
                dispatch(addAccount(data.data))
            } catch (error) {
                console.error('Failed to fetch brands:', error);
            }
        };

        fetchAccount();

        return () => {
            dispatch(removeAccount());
        };
    }, [dispatch]);
};

export default useFetchAccounts;
