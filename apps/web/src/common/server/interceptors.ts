import axios, { type CreateAxiosDefaults } from 'axios'

const options: CreateAxiosDefaults = {
	baseURL: process.env.NEXT_PUBLIC_SERVER_URL_API,
	headers: {
		'Content-Type': 'application/json'
	}
}

const axiosClassic = axios.create(options)

export { axiosClassic }
