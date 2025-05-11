import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllBrand } from "../../service/brandApi";
import { addBrand, removeBrand } from "../store/brandSlice";

const useFetchBrands = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const data = await getAllBrand();
                dispatch(addBrand(data.data.brands))
            } catch (error) {
                console.error("Failed to fetch brands:", error);
            }
        };

        fetchBrands();

        // return () => {
        //     dispatch(removeBrand());
        // };
    }, [dispatch]);
};

export default useFetchBrands;
