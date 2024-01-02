// Assuming you're using a library like Axios for making HTTP requests
import axios from 'axios';

export async function getAccommodations() {
    try {
        const response = await axios.get('http://localhost:9092/api/accommodations');
       return  response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Accommodations could not be loaded');
    }
}

export async function createAccommodation(newAccommodation){
    try {
        const response = await axios.post('http://localhost:9092/api/accommodations',newAccommodation);
        return  response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Accommodations could not be loaded');
    }
}

export async function deleteAccommodation(id) {
    try {
        const response = await axios.delete(`http://localhost:9092/api/accommodations/${id}`);
        return  response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Accommodations could not be loaded');
    }
}

export async function getAccommodationsTypes() {
    try {
        const response = await axios.get('http://localhost:9092/api/accommodations/types');
        return  response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Accommodations types could not be loaded');
    }
}


