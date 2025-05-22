import { Currency, currencyWithFlags } from '../duck/currencies'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@repo/ui/components/select'

import { Label } from '@repo/ui/components/label'

interface CurrencySelectorProps {
	label: string
	fromCurrency: Currency
	setCurrency: (currency: Currency) => void
	className?: string
}

const CurrencySelector = ({
	label,
	fromCurrency,
	setCurrency,
	className
}: CurrencySelectorProps) => {
	return (
		<div className={`flex flex-col ${className}`.trim()}>
			<Label className='text-xs uppercase'>{label}:</Label>
			<Select
				value={fromCurrency}
				onValueChange={setCurrency}
			>
				<SelectTrigger>
					<SelectValue placeholder='Select currency' />
				</SelectTrigger>
				<SelectContent>
					{currencyWithFlags.map(({ code, flag }) => (
						<SelectItem
							key={code}
							value={code}
						>
							{flag} {code}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	)
}

export { CurrencySelector }
