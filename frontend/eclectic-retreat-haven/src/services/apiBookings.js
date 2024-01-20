import {getToday, PAGE_SIZE} from "../utils/helpers";
import supabase from "./supabase";

import axios from "axios";
import {apiRequest} from "../utils/services.js";

export async function getBookings({page,types,status,sort}) {
  try {
    const response = await apiRequest('GET',`bookings`,null, {
      page: page,
          types: types,
          status: status,
          sort: sort,
    })
    return {
      content: response.data.content,
      totalElements: response.data.totalElements
    };
  } catch (error) {
    console.error(error);
    throw new Error('Bookings could not be loaded');
  }
}

export async function getMyBookings({page,types,status,sort}) {
  try {
    const response = await apiRequest('GET',`bookings/myBookings`,null, {
      page: page,
      types: types,
      status: status,
      sort: sort,
    })
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

  try {
    const  response = await apiRequest('POST','bookings',newBooking.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Bookings could not be created');
  }
}


export async function getBooking(id) {
  try {
    const response = await apiRequest('GET',`bookings/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Booking could not be loaded');
  }
}

export async function getBookingsAfterDate(date) {
  try {
    const response = await apiRequest('GET',`bookings/last`,null,{
      last: date,
    });
    return response.data;
  } catch (error) {
    throw new Error('Booking could not be loaded');
  }
}


export async function getStaysAfterDate(date) {
  try {
    const response = await apiRequest('GET',`bookings/stays`,null,{
        stays: date,
    });
    return response.data;
  } catch (error) {
    throw new Error('Booking could not be loaded');
  }
}

export async function getStaysTodayActivity() {
  try {
    const response = await apiRequest('GET',`bookings/activity`);
    return response.data;
  } catch (error) {
    throw new Error('Booking could not be loaded');
  }
}

export async function updateBooking(obj,id) {
  try {
    const response = await apiRequest('PUT',`bookings/${id}`, obj.data);
    return response.data;
  } catch (error) {
    throw new Error('Booking could not be loaded');
  }
}

export async function deleteBooking(id) {
  try {
    const response = await apiRequest('DELETE',`bookings/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Booking could not be loaded');
  }
}

export async function getBookedDates(id) {
  try {
    const response = await apiRequest('GET',`bookings/booked-dates/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Booking could not be loaded');
  }
}