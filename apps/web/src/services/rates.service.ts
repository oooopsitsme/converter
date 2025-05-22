import { IRatesParams, IRatesResponse } from '@/types/rates.types'

import { axiosClassic } from '@common/server/interceptors'

class RatesService {
	private BASE_URL = '/fx-rates'

	async getRates(params: IRatesParams) {
		const response = await axiosClassic.get<IRatesResponse>(this.BASE_URL, {
			params
		})

		return response.data
	}
}

export const ratesService = new RatesService()
