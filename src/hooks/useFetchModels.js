import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllModel } from "../../service/modelNoApi";
import { addModel, removeModel } from "../store/modelSlice";

const useFetchModels = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchModels = async () => {
            try {
                const data = await getAllModel();
                dispatch(addModel(data.data.models))
            } catch (error) {
                console.error('Failed to fetch models:', error);
            }
        };

        fetchModels();

        return () => {
            dispatch(removeModel());
        };
    }, [dispatch]);
};

export default useFetchModels;
