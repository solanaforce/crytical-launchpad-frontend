import axios from "axios"

export async function getBotUsername(apiToken) {
  const url = `https://api.telegram.org/bot${apiToken}/getMe`;
  try {
      const response = await axios.get(url);
      if (response.data.ok) {
          return response.data.result.username; // Return the bot's username
      } else {
          console.error("Failed to fetch bot info:", response.data.description);
          return null;
      }
  } catch (error) {
      console.error("Error fetching bot username:", error);
      return null;
  }
}

export const testgetUpdates = async (apiToken) => {
  try {
    const url = `https://api.telegram.org/bot${apiToken}/getUpdates`;
    
    const result = await axios.get(url)

    return result.data
  } catch (err) {
    console.log("Authentication failed.")
    return null
  }
}