import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addProduct, removeProduct } from "../store/productSlice";
import { getAllProduct } from "../../service/productApi";

const useFetchProducts = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getAllProduct();
                dispatch(addProduct(data.data))
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };

        fetchProducts();

        return () => {
            dispatch(removeProduct());
        };
    }, [dispatch]);
};

export default useFetchProducts;
