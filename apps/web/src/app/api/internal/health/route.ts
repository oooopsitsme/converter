import { NextResponse } from 'next/server'
import { logger } from '@repo/logger/dist/server/logger'

const createHealthHandler = () => {
	const revalidate = 0
	const GET = async (_: Request) => {
		logger.silly(`@health ${JSON.stringify(_.headers)}`)
		return NextResponse.json({ status: 'OK' })
	}

	return {
		GET,
		revalidate
	}
}

const { GET, revalidate } = createHealthHandler()
export { GET, revalidate }
