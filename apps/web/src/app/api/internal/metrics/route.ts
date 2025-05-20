import { NextResponse } from 'next/server'
import { getRegistryInstance } from '@repo/monitoring/dist/registry'

const createMetricsHandler = () => {
	const revalidate = 0
	async function GET(_: Request) {
		const registry = getRegistryInstance()
		const res = new NextResponse(await registry.metrics(), {
			headers: {
				'Content-type': registry.contentType,
				'Cache-Control': 'no-store'
			}
		})
		return res
	}
	return {
		GET,
		revalidate
	}
}

const { GET, revalidate } = createMetricsHandler()
export { GET, revalidate }
