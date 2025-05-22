'use client'

import { Suspense } from 'react'

const GlobalNotFoundInner = () => {
	return (
		<html lang='en'>
			<body
				id='__next'
				className='p-0 m-0 h-full'
			>
				<p>Oops, Something went wrong! Please try again later.</p>
			</body>
		</html>
	)
}

const GlobalNotFound = () => (
	<Suspense>
		<GlobalNotFoundInner />
	</Suspense>
)

export default GlobalNotFound
