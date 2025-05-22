import { ArrowLeftRight } from 'lucide-react'
import { Button } from '@repo/ui/components/button'
import type { Currency } from '../duck/currencies'
import { CurrencySelector } from './CurrencySelector'

interface CurrencySelectorGroupProps {
	fromCurrency: Currency
	toCurrency: Currency
	setFromCurrency: (currency: Currency) => void
	setToCurrency: (currency: Currency) => void
	onSwap: () => void
}

const CurrencySelectorGroup = ({
	fromCurrency,
	toCurrency,
	setFromCurrency,
	setToCurrency,
	onSwap
}: CurrencySelectorGroupProps) => {
	return (
		<div className='flex flex-row justify-between items-center gap-2 w-full'>
			<CurrencySelector
				label='From'
				fromCurrency={fromCurrency}
				setCurrency={setFromCurrency}
				className='flex-1'
			/>
			<Button
				variant='ghost'
				size='icon'
				className='rounded-full mt-auto'
				onClick={onSwap}
				data-testid='swap-button'
			>
				<ArrowLeftRight />
			</Button>
			<CurrencySelector
				label='To'
				fromCurrency={toCurrency}
				setCurrency={setToCurrency}
				className='flex-1'
			/>
		</div>
	)
}

export { CurrencySelectorGroup }
