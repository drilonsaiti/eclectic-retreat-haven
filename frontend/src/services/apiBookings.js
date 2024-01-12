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

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  try {
    const response = await axios.get(`http://localhost:9092/api/bookings/${date}`);
    return response.data;
  } catch (error) {
    throw new Error('Booking could not be loaded');
  }
}

// Returns all STAYS that are were created after the given date
export async function getStatusAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(obj,id) {

  console.log(obj.data,id);
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
