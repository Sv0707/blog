import axios from 'axios'
import { BASE_URL } from '../constants/api'
import pickBy from 'lodash.pickby'

export const getAllUsers = async (queryVariables) => axios.get(`${BASE_URL}/users`, { params: pickBy(queryVariables) })

export const getOneUser = async (id) => axios.get(`${BASE_URL}/users/${id}`)
