import { IRatesParams } from '@/types/rates.types'
import { ratesService } from '@services/rates.service'
import { useQuery } from '@tanstack/react-query'

export function useRates(params: IRatesParams) {
	const { data, isLoading, refetch, isFetching } = useQuery({
		queryKey: ['fx-rates', params],
		queryFn: () => ratesService.getRates(params),
		enabled: false
	})

	return { data, isLoading, refetch, isFetching }
}
