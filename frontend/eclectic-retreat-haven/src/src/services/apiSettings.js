import axios from "axios";
import {apiRequest} from "../utils/services.js";

export async function getSettings() {
  try {

    const response = await apiRequest('GET','settings')
    return response.data[0];
  } catch (error) {
    console.error(error);
    throw new Error('Settings could not be loaded');
  }
}

export async function updateSetting(newSetting) {
  try {
    let response = {};

    if (!newSetting.settingsId) {
      response = await apiRequest('POST','settings',newSetting)
    }

    if (newSetting.settingsId) {

      response = await  apiRequest('PUT',`settings/${newSetting.settingsId}`,newSetting);
    }
    return response.data;

  } catch (error) {
    console.error(error);
    throw new Error('Accommodations could not be loaded');
  }
}
