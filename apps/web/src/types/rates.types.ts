export interface IRatesParams {
	from?: string
	to?: string
	amount?: number
}

export interface IRatesResponse {
	from: string
	to: string
	rate: number
	fromAmount: number
	toAmount: number
	amount: number
}
