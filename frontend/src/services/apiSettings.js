import axios from "axios";

export async function getSettings() {
  try {
    const response = await axios.get('http://localhost:9092/api/settings');
    console.log(response.data[0])
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
      response = await axios.post('http://localhost:9092/api/settings', newSetting);
    }

    if (newSetting.settingsId) {
      response = await axios.put(`http://localhost:9092/api/settings/${newSetting.settingsId}`, newSetting);
    }
    return response.data;

  } catch (error) {
    console.error(error);
    throw new Error('Accommodations could not be loaded');
  }
}
