import Link from 'next/link';

interface IProps {
	label: string;
	href: string;
}

export default function FancyButton({ label, href }: IProps) {
	return (
		<a
			href={href}
			className='btn fancy-btn'
			target='_blank'
			rel='noopener noreferrer'
		>
			{label}
		</a>
	);
}
