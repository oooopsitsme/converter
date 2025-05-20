/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	output: 'standalone',
	cacheMaxMemorySize: 0,
	experimental: {
		reactCompiler: true
	},
	images: {
		minimumCacheTTL: 60 * 60 * 24,
		remotePatterns: [
			{
				hostname: ''
			}
		]
	},
	rewrites: async () => {
		return [
			{
				source: '/monitoring/health',
				destination: '/api/internal/health'
			},
			{
				source: '/monitoring/metrics',
				destination: '/api/internal/metrics'
			}
		]
	}
}

export default nextConfig
