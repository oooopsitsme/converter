'use client'

import { QueryClientProvider } from '@modules/query/QueryClientProvider'
import type { ReactNode } from 'react'

const AppTemplate = ({ children }: { children: ReactNode }) => {
	return <QueryClientProvider>{children}</QueryClientProvider>
}

export default AppTemplate
