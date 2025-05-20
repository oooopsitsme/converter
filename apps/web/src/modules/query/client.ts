import { DefaultOptions, QueryClient } from '@tanstack/react-query'

const ONE_MINUTE = 60 * 1000
const STALE_TTL = ONE_MINUTE * 5
const SSR_GC_TIME = 1000 * 15
const SSR_STALE_TIME = SSR_GC_TIME * 2

const defaultOptions: DefaultOptions = {
	queries: {
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		retry: false,
		staleTime: STALE_TTL
	}
}

const queryClient = new QueryClient({
	defaultOptions
})

export { queryClient, defaultOptions, SSR_GC_TIME, SSR_STALE_TIME }
