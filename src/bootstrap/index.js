import axios from 'axios'
import { URI_BASE_API, API_ACCEPT } from '../config/api'

axios.defaults.baseURL = URI_BASE_API
axios.defaults.headers.accept = API_ACCEPT