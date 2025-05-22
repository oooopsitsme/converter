import { Circle } from 'lucide-react'

interface RateInfoProps {
	from?: string
	to?: string
	rate?: number
}

const RateInfo = ({ from, to, rate }: RateInfoProps) => {
	return (
		<div className='flex flex-col gap-2'>
			<p className='flex flex-row gap-1 items-center'>
				<Circle className='text-yellow-500 w-2 h-2' />
				<span className='body-md font-semibold uppercase'>{`${from && rate && to ? `1 ${from} = ${rate} ${to}` : 'loading...'}`}</span>
			</p>
			<span className='text-[10px] text-gray-400 leading-3'>
				All figures are live mid-market rates, which are for informational
				purposes only. <br />
				To see the rates for money transfer, please select sending money option.
			</span>
		</div>
	)
}

export { RateInfo }
