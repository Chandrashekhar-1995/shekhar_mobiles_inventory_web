import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addCategory } from "../store/categorySlice";


const useCategory =() =>{
    const dispatch = useDispatch();
    const category = useSelector(store=>store.categories.allCategories);

    const getCategory = async() =>{
        const response = await axios.get(
            "http://localhost:7777/api/v1/category/all",
            {
              withCredentials:true
            }
          );
          const allCategories = await response.data.data;
          
          dispatch(addCategory(allCategories));
          
    }

    useEffect(()=>{
         !category && getCategory();
    });
};

export default useCategory;