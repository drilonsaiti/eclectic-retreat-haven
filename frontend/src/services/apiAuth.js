
/*
export async function login() {
    let {}
}*/

import axios from "axios";
import {apiRequest, BASE_URL} from "../utils/services.js";
import {useCookies} from "react-cookie";
import Cookies from 'universal-cookie';
import supabase from "./supabase.js";
export async function signUp(data){

    try {
        const response = await apiRequest('POST',`auth/register`,data)
        const cookies = new Cookies();

        cookies.set('accessToken', response.data.token, {
            path: '/',
            sameSite: 'strict',  // Adjust as needed
            secure: true,
            maxAge: 1800
        });
        cookies.set('refreshToken', response.data.refreshToken, {
            path: '/',
            sameSite: 'strict',  // Adjust as needed
            secure: true,
            maxAge:2592000
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error(`Can't signup right now`);
    }
}

export async function logIn(data){
    let response;
    console.log("LOGIN DATA");
    try {
         response = await apiRequest('POST',`auth/login`,data)

        //document.cookie = `accessToken=${response.data.token}`
        const cookies = new Cookies();
        cookies.set('accessToken', response.data.token, {
            path: '/',
            sameSite: 'strict',  // Adjust as needed
            secure: true,
            maxAge: 1800
        });
        cookies.set('refreshToken', response.data.refreshToken, {
            path: '/',
            sameSite: 'strict',  // Adjust as needed
            secure: true,
            maxAge:2592000
        });

        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
}

export async function logout(){
    try {
        const cookies = new Cookies();
        const data = {
            'accessToken': cookies.get("accessToken"),
            'refreshToken': cookies.get("refreshToken")
        }
        console.log("DATA",data)
        const response = await apiRequest('POST',`auth/logout`,data)

        cookies.remove("accessToken");
        cookies.remove("refreshToken");
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error(`Can't logout right now`);
    }
}

export async function profile(){
    try{
        const cookies = new Cookies();
        const data = {
            'token': cookies.get("accessToken") ?? cookies.get("refreshToken")
        };
        let response = await apiRequest('POST','auth/extract-username', data);
        console.log("===PROFILE===")
        console.log(response.data)
        if (response.status === 200){
            response = await apiRequest('GET','users/profile',null,{
                'email':response.data
            })
        }
        console.log(response.data)
        return response.data;

    }catch (error) {
        console.error(error);
        throw new Error(`Can't update full name right now`);
    }
}

export async function updateCurrentFullName({fullName, password}){
    try {
        const cookies = new Cookies();

        const data = {
            'token': cookies.get('accessToken').toString(),
            'fullName': fullName,
            'password': password
        }

        console.log("UPDATE",data)

          const response = await apiRequest('POST', `auth/change-fullname`,data )

        return response.data;

    }catch (error) {
        console.error(error);
        throw new Error(`Can't update full name right now`);
    }
}

export async function updateCurrentAvatar({avatar,user}){
    try {
        const cookies = new Cookies();
        console.log("UPDATE AVATAR:" ,user)

        const fileName = `avatar-${user}-${Math.random()}`

        const {error: storageError} = await supabase
            .storage
            .from('avatars')
            .upload(fileName, avatar);
        if (storageError) {
            console.error('Supabase Storage Error:', storageError);
            throw new Error('Error uploading image to storage');
        }


        const data = {
            'token': cookies.get('accessToken').toString(),
            'avatar': `https://tfuqnepvvdeiwssgclxl.supabase.co/storage/v1/object/public/avatars/${fileName}`,
        }
        console.log("UPDATE",data)
        const response = await apiRequest('POST', `auth/change-avatar`,data )

        return response.data;

    }catch (error) {
        console.error(error);
        throw new Error(`Can't update full name right now`);
    }
}

export async function updatePassword({oldPassword,password,confirmPassword}){
    try {
        const cookies = new Cookies();

        const data = {
            'token': cookies.get('accessToken').toString(),
            'oldPassword': oldPassword,
            'newPassword': password,
            'repeatedPassword': confirmPassword
        }

        const response = await apiRequest('POST', `auth/change-password`,data )

        return response.data;

    }catch (error) {
        console.error(error);
        throw new Error(`Can't update full name right now`);
    }
}


export async function getRoles(){
    try {
        const response = await apiRequest('GET',`auth/getRoles`)
        console.log("ROLES", response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error(`Can't login right now`);
    }
}
