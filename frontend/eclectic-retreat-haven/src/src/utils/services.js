import axios from "axios";
import Cookies from "universal-cookie";
import {useGetRole} from "../services/useGetRole.js";

export const BASE_URL = "http://localhost:9092/api";
const cookies = new Cookies();
export const HEADERS = {
    "content-type": "application/json",
    "accept": "application/json",
    "Authorization": `Bearer ${cookies?.get('accessToken') ?? cookies.get("refreshToken")}`
};


function shouldIncludeHeaders(url) {
    const excludeHeadersURLs = ['auth/login', 'auth/register'];
    return !excludeHeadersURLs.includes(url);
}


export const apiRequest = async (method, url, data = null,params = null) => {
    try {
        const config = {
            method,
            url: `${BASE_URL}/${url}`,
            headers: shouldIncludeHeaders(url) ? HEADERS : {},
            data: method !== 'GET' ? data : null,
            params: {...params} // Corrected here, no need for an additional 'params' key
        };

        return await axios(config);
    } catch (error) {
        console.error(error.response.data);
        throw new Error(error.response.data);
    }
};

export function Roles(){
    const {roles,isLoading} = useGetRole();
    console.log("ROLES FUNC")
    console.log(roles);
    if(!isLoading)
        return roles;
}

export const getInitialRoute = () => {
    const roles = Roles();
    return roles.includes("ADMIN") ? "/dashboard" : "/accommodations";
};
