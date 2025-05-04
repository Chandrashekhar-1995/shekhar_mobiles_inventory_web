import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllMobile } from "../../service/mobileApi";
import { addMobile, removeMobile } from "../store/mobileSlice";

const useFetchMobiles = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchMobiles = async () => {
            try {
                const data = await getAllMobile();
                dispatch(addMobile(data.data.mobiles))
            } catch (error) {
                console.error('Failed to fetch mobiles:', error);
            }
        };

        fetchMobiles();

        // return () => {
        //     dispatch(removeMobile());
        // };
    }, [dispatch]);
};

export default useFetchMobiles;
