import axios from "axios";
import {apiRequest, BASE_URL, HEADERS} from "../utils/services.js";
import {useQuery} from "@tanstack/react-query";
import Cookies from "universal-cookie";

async function checkToken() {
    const cookies = new Cookies();

    let accessToken = cookies?.get('accessToken');
    let refreshToken = cookies?.get('refreshToken');

    let isExpired = true;
    if (accessToken){

        const token = {token:accessToken};
        HEADERS["Authorization"] = `Bearer ${accessToken}`
        console.log("HEADERS",HEADERS);
        const response = await axios.post(BASE_URL+"/users/token/expired",token,{
            headers:HEADERS
        });
        isExpired = response.data;
        console.log(isExpired);
        if (accessToken && !isExpired) return false;
    }
    console.log("AFTER accestoken")
    if (!accessToken || !isExpired){
        console.log("!accessToken || !isExpired")
        if(!refreshToken){
            console.log("!refreshToken")
            return true;
        }else{
            console.log("else !refreshToken")
            HEADERS["Authorization"] = `Bearer ${refreshToken}`
            console.log(HEADERS);
            const response = await apiRequest('GET',"users/token/refresh");

            if (!response.data.startsWith("Refresh") && !response.data.startsWith("No auth")){
                console.log("!response.data.startsWith(\"Refresh\") && !response.data.startsWith(\"No auth\")")
                cookies.set('accessToken', response.data, {
                    path: '/',
                    sameSite: 'strict',  // Adjust as needed
                    secure: true,
                    maxAge: 1800
                });
                return false;
            }
            console.log("else !refreshToken - FALSE")
            return true;
        }
    }
    console.log("isExpired last",isExpired);
    return isExpired;

}

export function useGetToken() {
    const {data:goToLogin,isLoading} = useQuery({
        queryFn:checkToken,
        queryKey: ["user"]
    })

    return {goToLogin,isLoading};
}