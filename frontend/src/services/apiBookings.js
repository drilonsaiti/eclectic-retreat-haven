import {getToday, PAGE_SIZE} from "../utils/helpers";
import supabase from "./supabase";

import axios from "axios";

export async function getBookings({page,types,status,sort}) {
  try {

    const response = await axios.get(`http://localhost:9092/api/bookings`, {
      params: {
        page: page,
        types: types,
        status: status,
        sort: sort,
      }
    });    console.log("DATA",response.data);
    return {
      content: response.data.content,
      totalElements: response.data.totalElements
    };
  } catch (error) {
    console.error(error);
    throw new Error('Bookings could not be loaded');
  }
}

export async function createBookingApi(newBooking) {
  console.log("NEW BOOKING " , newBooking);
  try {
    const response = await axios.post('http://localhost:9092/api/bookings',newBooking.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Bookings could not be created');
  }
}


export async function getBooking(id) {
  try {
    const response = await axios.get(`http://localhost:9092/api/bookings/${id}`);
    console.log("BY ID" , response.data)
    return response.data;
  } catch (error) {
    throw new Error('Booking could not be loaded');
  }
}

export async function getBookingsAfterDate(date) {
  try {
    const response = await axios.get(`http://localhost:9092/api/bookings/last`,{
      params: {
        last: date,
      }
    });

    console.log("DATE " , response.data);
    return response.data;
  } catch (error) {
    throw new Error('Booking could not be loaded');
  }
}


export async function getStaysAfterDate(date) {
  try {
    const response = await axios.get(`http://localhost:9092/api/bookings/stays`,{
      params: {
        stays: date,
      }
    });
    console.log("STAYS",response.data)
    return response.data;
  } catch (error) {
    throw new Error('Booking could not be loaded');
  }
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  try {
    const response = await axios.get(`http://localhost:9092/api/bookings/activity`);
    console.log("ACTIVITY",response.data)
    return response.data;
  } catch (error) {
    throw new Error('Booking could not be loaded');
  }
}

export async function updateBooking(obj,id) {


  console.log("UPDATE ",obj)
  try {
    const response = await axios.put(`http://localhost:9092/api/bookings/${id}`, obj.data);
    return response.data;
  } catch (error) {
    throw new Error('Booking successfully deleted');
  }
}

export async function deleteBooking(id) {
  try {
    const response = await axios.delete(`http://localhost:9092/api/bookings/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Settings could not be loaded');
  }
}

export async function getBookedDates(id) {
  try {
    const response = await axios.get(`http://localhost:9092/api/bookings/booked-dates/${id}`);
    console.log("DATES API:",response.data);
    return response.data;
  } catch (error) {
    throw new Error('Settings could not be loaded');
  }
}