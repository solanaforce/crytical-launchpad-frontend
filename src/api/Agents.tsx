import axios from "axios"
import { API_ENDPOINT } from "config/constants"

export const createAgent = async (data) => {
  try {

    const accessToken = localStorage.getItem("access_token")

    const headers = {
      'Content-Type': "application/json",
      Authorization: `Bearer ${accessToken}`
    }
    const result = await axios.post(`${API_ENDPOINT}/agent/createAgent`, data, {headers})

    return result.data.result
  } catch (err) {
    console.log("Authentication failed.")
    return null
  }
}

export const editAgent = async (data) => {
  try {

    const accessToken = localStorage.getItem("access_token")

    const headers = {
      'Content-Type': "application/json",
      Authorization: `Bearer ${accessToken}`
    }
    const result = await axios.post(`${API_ENDPOINT}/agent/editAgent`, data, {headers})

    return result.data
  } catch (err) {
    console.log("Authentication failed.")
    return null
  }
}

export const bindTelegram = async (data) => {
  try {

    const accessToken = localStorage.getItem("access_token")

    const headers = {
      'Content-Type': "application/json",
      Authorization: `Bearer ${accessToken}`
    }
    const result = await axios.post(`${API_ENDPOINT}/agent/bindTelegram`, data, {headers})

    return result.data
  } catch (err) {
    console.log("Authentication failed.")
    return null
  }
}

export const unbindTelegram = async (data) => {
  try {

    const accessToken = localStorage.getItem("access_token")

    const headers = {
      'Content-Type': "application/json",
      Authorization: `Bearer ${accessToken}`
    }
    const result = await axios.post(`${API_ENDPOINT}/agent/unbindTelegram`, data, {headers})

    return result.data
  } catch (err) {
    console.log("Authentication failed.")
    return null
  }
}

export const getUserAgents = async () => {
  try {

    const accessToken = localStorage.getItem("access_token")

    const headers = {
      'Content-Type': "application/json",
      Authorization: `Bearer ${accessToken}`
    }
    const result = await axios.get(`${API_ENDPOINT}/agent/getUserAgents`, {headers})

    return result.data
  } catch (err) {
    console.log("Authentication failed.")
    return null
  }
}

export const getUserAgent = async (id) => {
  try {

    const accessToken = localStorage.getItem("access_token")

    const headers = {
      'Content-Type': "application/json",
      Authorization: `Bearer ${accessToken}`
    }
    const result = await axios.get(`${API_ENDPOINT}/agent/getUserAgent?id=${id}`, {headers})

    return result.data
  } catch (err) {
    console.log("Authentication failed.")
    return null
  }
}