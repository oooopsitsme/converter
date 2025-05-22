export const currencyWithFlags = [
	{ code: 'EUR', flag: '🇪🇺' },
	{ code: 'GBP', flag: '🇬🇧' },
	{ code: 'PLN', flag: '🇵🇱' },
	{ code: 'UAH', flag: '🇺🇦' }
]

export const supportedCurrencies = ['EUR', 'GBP', 'PLN', 'UAH'] as const
export const limits: Record<string, number> = {
	PLN: 20000,
	EUR: 5000,
	GBP: 1000,
	UAH: 50000
}

export type Currency = (typeof supportedCurrencies)[number]
