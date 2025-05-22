import { Input } from '@repo/ui/components/input'
import { Label } from '@repo/ui/components/label'
import { formatToTwoDecimals } from '../utils/format'
import { limits } from '../duck/currencies'

interface AmountInputsProps {
	amount: number
	fromCurrency: string
	toCurrency: string
	convertedAmount?: number
	showConvertedAmount: boolean
	setAmount: (amount: number) => void
	setConvertedAmount: (amount: number) => void
	onToAmountChange: (amount: number) => void
}

const AmountInputs = ({
	amount,
	fromCurrency,
	toCurrency,
	setAmount,
	convertedAmount,
	setConvertedAmount,
	showConvertedAmount,
	onToAmountChange
}: AmountInputsProps) => {
	const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const raw = e.target.value
		const parsed = parseFloat(raw)

		if (!isNaN(parsed)) {
			const formatted = formatToTwoDecimals(parsed)
			setAmount(formatted)
		}
	}

	const handleConvertedAmountChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const raw = e.target.value
		const parsed = parseFloat(raw)

		if (!isNaN(parsed)) {
			const formatted = formatToTwoDecimals(parsed)
			setConvertedAmount(formatted)
			onToAmountChange(formatted)
		}
	}

	return (
		<div className='flex flex-row gap-14'>
			<div className='flex flex-col flex-1'>
				<Label className='text-xs uppercase'>Amount:</Label>
				<div className='relative'>
					<Input
						type='number'
						name='amount'
						value={amount}
						onChange={handleAmountChange}
					/>
					<span className='absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground'>
						{fromCurrency}
					</span>
				</div>
				{amount > limits[fromCurrency] && (
					<p className='text-sm text-red-500'>
						Max amount for {fromCurrency} is {limits[fromCurrency]}
					</p>
				)}
			</div>

			{showConvertedAmount && (
				<div className='flex flex-col flex-1'>
					<Label className='text-xs uppercase'>Converted to:</Label>
					<div className='relative'>
						<Input
							type='number'
							name='convertedAmount'
							value={convertedAmount}
							onChange={handleConvertedAmountChange}
						/>
						<span className='absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground'>
							{toCurrency}
						</span>
					</div>
					{amount > limits[toCurrency] && (
						<p className='text-sm text-red-500'>
							Max amount for {toCurrency} is {limits[toCurrency]}
						</p>
					)}
				</div>
			)}
		</div>
	)
}

export { AmountInputs }
