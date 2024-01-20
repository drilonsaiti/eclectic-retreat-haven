// Assuming you're using a library like Axios for making HTTP requests
import axios from 'axios';
import supabase, {supabaseUrl} from "./supabase";
import {apiRequest} from "../utils/services.js";

export async function getAccommodations() {
    try {
        const response = await apiRequest('GET','accommodations')
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Accommodations could not be loaded');
    }
}

export async function createEditAccommodation(newAccommodation, id) {
    const hasImagePath = !!newAccommodation?.image?.startsWith?.(supabaseUrl);
    const imageName = `${Math.floor((Math.random() * 100 - 1 + 1) + 1)}-${newAccommodation.image.name}`.replaceAll("/", "");
    const imagePath = hasImagePath ? newAccommodation.image : `https://tfuqnepvvdeiwssgclxl.supabase.co/storage/v1/object/public/accommodations/${imageName}`


    try {
        let response = {};
        if (!hasImagePath) {
            const {error: storageError} = await supabase
                .storage
                .from('accommodations')
                .upload(imageName, newAccommodation.image);
            if (storageError) {
                console.error('Supabase Storage Error:', storageError);
                throw new Error('Error uploading image to storage');
            }
        }
        newAccommodation.image = imagePath;
        if (!id) {

            response = await apiRequest('POST','accommodations',newAccommodation)
        }

        if (id) {
            response = await apiRequest('PUT',`accommodations/${id}`,newAccommodation)
        }
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Accommodations could not be loaded');
    }
}

export async function deleteAccommodation(id) {
    try {
        const accm = await axios.get(`http://localhost:9092/api/accommodations/${id}`);
        const imageUrl = accm.data.image.toString();
        const {storageError} = await supabase
            .storage
            .from('accommodations')
            .remove([imageUrl.substring(imageUrl.lastIndexOf("/") + 1)])

        if (storageError) {
            console.error('Supabase Storage Error:', storageError);
            throw new Error('Error uploading image to storage');
        }
        const response = await apiRequest('DELETE',`accommodations/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Accommodations could not be loaded');
    }
}

export async function getAccommodationsTypes() {
    try {
        const response = await apiRequest('GET',`accommodations/types`)
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Accommodations types could not be loaded');
    }
}


