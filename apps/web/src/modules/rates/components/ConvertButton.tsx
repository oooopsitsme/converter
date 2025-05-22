import { Button } from '@repo/ui/components/button'

interface ConvertButtonProps {
	disabled: boolean
	onConvert: () => void
}

const ConvertButton = ({ disabled, onConvert }: ConvertButtonProps) => {
	return (
		<Button
			onClick={onConvert}
			className='w-full'
			variant='default'
			disabled={disabled}
			data-testid='convert-button'
		>
			Convert
		</Button>
	)
}

export { ConvertButton }
