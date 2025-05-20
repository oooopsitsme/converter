'use client'

import { QueryClientProvider as Provider } from '@tanstack/react-query'
import { useState, type ReactNode } from 'react'
import { queryClient } from './client'

const QueryClientProvider = ({ children }: { children: ReactNode }) => {
	const [client] = useState(queryClient)

	return <Provider client={client}>{children}</Provider>
}

export { QueryClientProvider }
