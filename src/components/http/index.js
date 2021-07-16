import axios from 'axios'

const GET_TIMEOUT = 5000
const BASE_URL = 'https://api.github.com/search'
const instance = axios.create({ baseURL: BASE_URL, timeout: GET_TIMEOUT })

export default instance
