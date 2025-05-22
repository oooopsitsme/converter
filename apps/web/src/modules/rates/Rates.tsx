'use client'

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle
} from '@repo/ui/components/card'
import { useEffect, useState } from 'react'

import { AmountInputs } from './components/AmountInputs'
import { ConvertButton } from './components/ConvertButton'
import type { Currency } from './duck/currencies'
import { CurrencySelectorGroup } from './components/CurrencySelectorGroup'
import { RateInfo } from './components/RateInfo'
import { formatToTwoDecimals } from './utils/format'
import { limits } from './duck/currencies'
import { useRates } from './hooks/useRates'

export function Rates() {
	const [fromCurrency, setFromCurrency] = useState<Currency>('EUR')
	const [toCurrency, setToCurrency] = useState<Currency>('GBP')
	const [fromAmount, setFromAmount] = useState(1.0)
	const [toAmount, setToAmount] = useState(0)
	const [showConvert, setShowConvert] = useState(true)
	const [pendingToAmount, setPendingToAmount] = useState<number>(toAmount)
	const [swapPending, setSwapPending] = useState(false)

	const { data, refetch } = useRates({
		from: fromCurrency,
		to: toCurrency,
		amount: fromAmount
	})

	const isValidAmount = () => {
		const amount = parseFloat(String(fromAmount))
		if (isNaN(amount)) return false
		const limit = limits[fromCurrency]
		return amount <= limit
	}

	const handleConvert = async () => {
		if (!isValidAmount()) return alert('Amount exceeds limit')

		const result = await refetch()
		if (result.data) {
			setShowConvert(false)
			setToAmount(result.data.toAmount)
		}
	}

	const handleSwap = () => {
		setFromCurrency(toCurrency)
		setToCurrency(fromCurrency)
		setSwapPending(true)
	}

	const handleToAmountChange = (newToAmount: number) => {
		setPendingToAmount(newToAmount)
		setToAmount(newToAmount)
	}

	useEffect(() => {
		if (data) setToAmount(data.toAmount)
	}, [data])

	useEffect(() => {
		const timer = setTimeout(() => {
			if (!showConvert && data?.rate && isFinite(data.rate)) {
				const rawFrom = pendingToAmount / data.rate
				const calculatedFrom = formatToTwoDecimals(rawFrom)

				if (isValidAmount()) {
					setFromAmount(calculatedFrom)
					refetch()
				}
			}
		}, 500)

		return () => clearTimeout(timer)
	}, [pendingToAmount])

	useEffect(() => {
		const timer = setTimeout(() => {
			if (!showConvert && fromAmount && isValidAmount()) {
				refetch()
			}
		}, 500)
		return () => clearTimeout(timer)
	}, [fromAmount, fromCurrency, toCurrency])

	return (
		<div className='flex justify-center items-center min-h-screen p-4'>
			<div className='flex w-full max-w-[450px]'>
				<Card className='w-full max-w-md shadow-xl'>
					<CardHeader>
						<CardTitle>Currency Converter</CardTitle>
					</CardHeader>
					<CardContent className='space-y-6'>
						<CurrencySelectorGroup
							fromCurrency={fromCurrency}
							toCurrency={toCurrency}
							setFromCurrency={setFromCurrency}
							setToCurrency={setToCurrency}
							onSwap={handleSwap}
						/>

						<AmountInputs
							fromCurrency={fromCurrency}
							toCurrency={toCurrency}
							amount={fromAmount}
							setAmount={setFromAmount}
							convertedAmount={toAmount}
							setConvertedAmount={setToAmount}
							showConvertedAmount={!showConvert}
							onToAmountChange={handleToAmountChange}
						/>

						{showConvert && (
							<ConvertButton
								disabled={!isValidAmount()}
								onConvert={handleConvert}
							/>
						)}

						{!showConvert && (
							<RateInfo
								from={data?.from}
								to={data?.to}
								rate={data?.rate}
							/>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
