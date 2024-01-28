import axios from 'axios'
import { BASE_URL } from '../constants/api'

export const getAllPostsByUser = async (userId) => axios.get(`${BASE_URL}/posts?userId=${userId}`)
