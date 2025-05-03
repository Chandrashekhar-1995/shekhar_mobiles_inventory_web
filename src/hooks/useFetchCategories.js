import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCategory, removeCategory } from "../store/categorySlice";
import { getAllCategories } from "../../service/categoryApi";

const useFetchCategories = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getAllCategories();
                dispatch(addCategory(data.data.categories))
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };

        fetchCategories();

        // Clean up categories when component unmounts
        return () => {
            dispatch(removeCategory());
        };
    }, [dispatch]);
};

export default useFetchCategories;
