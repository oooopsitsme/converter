'use client'

import NextError from 'next/error'
import { useEffect } from 'react'

const GlobalError = ({
	error
}: {
	error: Error & { digest?: string }
	reset: () => void
}) => {
	useEffect(() => {
		console.error(error)
	}, [error])

	return (
		<html lang='en'>
			<body
				id='__next'
				className='p-0 m-0 h-full text-base'
			>
				<NextError statusCode={0} />
			</body>
		</html>
	)
}

export default GlobalError
