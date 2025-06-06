import { toast } from "react-toastify";
import { removeUser } from "../src/store/userSlice";
import { API_BASE_URL } from "../src/utils/const";

class ApiClient {
    constructor(){
        this.baseURL = API_BASE_URL;
        this.defaultHeaders = {
            "Content-Type":"application/json",
            "Accept": "application/json",
        };
    }

    async customFetch(endpoint, options = {}){
        try {
            const url = `${this.baseURL}${endpoint}`;
            const headers = {...this.defaultHeaders, ...options.headers}

            const config = {
                ...options,
                headers,
                credentials: "include",
            }
            // console.log(`Fetching ${url}`);
            const response = await fetch(url, config)
            
            // 🔴 If token is expired
            // if (response.status === 401) {
            //     toast.error("Session expired. Please login again.");
            //     store.dispatch(removeUser());
            //     window.location.href = "/";
            //     return;
            // }

            const data = await response.json()
            return data
            
        } catch (error) {
            console.error("API Error", error)
            throw error
        }
    }

}

const apiClient = new ApiClient();

export default apiClient;
