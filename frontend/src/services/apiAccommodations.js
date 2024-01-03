// Assuming you're using a library like Axios for making HTTP requests
import axios from 'axios';
import supabase from "./supabase";

export async function getAccommodations() {
    try {
        const response = await axios.get('http://localhost:9092/api/accommodations');
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Accommodations could not be loaded');
    }
}

export async function createEditAccommodation(newAccommodation, id) {
    const hasImagePath = newAccommodation.image?.startsWith?.(supabase);
    console.log(newAccommodation);
    const imageName = `${Math.floor((Math.random() * 100 - 1 + 1) + 1)}-${newAccommodation.image.name}`.replaceAll("/", "");
    const imagePath = hasImagePath ? newAccommodation.image : `https://tfuqnepvvdeiwssgclxl.supabase.co/storage/v1/object/public/accommodations/${imageName}`
    const accomdationData = {...newAccommodation, image: imagePath};

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
        if (!id) {
            accomdationData.data.image = imagePath;
            console.log("ACMMMM")
            console.log(accomdationData.data)
            response = await axios.post('http://localhost:9092/api/accommodations', accomdationData.data);
        }

        if (id) {
            response = await axios.put(`http://localhost:9092/api/accommodations/${id}`, accomdationData);
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
        const response = await axios.delete(`http://localhost:9092/api/accommodations/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Accommodations could not be loaded');
    }
}

export async function getAccommodationsTypes() {
    try {
        const response = await axios.get('http://localhost:9092/api/accommodations/types');
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Accommodations types could not be loaded');
    }
}


