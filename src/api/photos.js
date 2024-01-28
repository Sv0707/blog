import axios from 'axios'
import { BASE_URL } from '../constants/api'

export const getPhotosByAlbumId = async (albumId) => axios.get(`${BASE_URL}/photos?albumId=${albumId}`)
