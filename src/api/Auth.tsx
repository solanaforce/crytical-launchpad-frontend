import axios from "axios"
import { API_ENDPOINT } from "config/constants"

export const signIn = async (isConnected, walletProvider) => {
  try {
    if (!walletProvider || !isConnected) {
      throw Error('user is disconnected')
    }

    const message = "By signing, you are providing you own this wallet and logging in Crytical.AI."
    const encodedMessage = new TextEncoder().encode(message)
    const signature = await walletProvider.signMessage(encodedMessage)

    const data = {
      publicKey: walletProvider.publicKey,
      signature,
      message
    }

    const result = await axios.post(`${API_ENDPOINT}/auth/signin`, data)

    localStorage.setItem("access_token", result.data.access_token);

    return result.data.data
  } catch (err) {
    console.log("Authentication failed.")
    return null
  }
}