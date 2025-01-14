import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addBrand } from "../store/brandSlice";


const useBrand =() =>{
    const dispatch = useDispatch();
    const brand = useSelector(store=>store.brands.allBrands);

    const getBrand = async() =>{
        const response = await axios.get(
            "http://localhost:7777/api/v1/brand/all",
            {
              withCredentials:true
            }
          );
          const allBrands = await response.data.data;
          console.log("Use brand run");
          
          dispatch(addBrand(allBrands));
          
    }

    useEffect(()=>{
         !brand && getBrand();
    });
};

export default useBrand;