import axios from "axios"

const baseURL = 'https://email-backend-afbq.onrender.com/api'

export const customAxios = axios.create({
    baseURL:baseURL
})