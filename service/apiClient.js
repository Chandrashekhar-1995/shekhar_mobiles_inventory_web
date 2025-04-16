class ApiClient {
    constructor(){
        this.baseURL = "http://localhost:7777/api/v1";
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
            console.log(`Fetching ${url}`);
            const response = await fetch(url, config)
            // check if response.ok === value

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
