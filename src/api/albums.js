import axios from 'axios'
import { BASE_URL } from '../constants/api'

export const getAllAlbumsByUser = async (userId) => axios.get(`${BASE_URL}/albums?userId=${userId}`)
