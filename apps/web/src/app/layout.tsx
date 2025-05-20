import '@repo/ui/globals.css'

import { ReactNode } from 'react'

const RootLayout = ({ children }: { children: ReactNode }) => {
	return (
		<html
			lang='en'
			suppressHydrationWarning
			className='w-full h-full'
		>
			<body className='w-full h-full'>{children}</body>
		</html>
	)
}

export default RootLayout
