import Link from 'next/link';

interface IProps {
	label: string;
	href: string;
}

export default function FancyButton({ label, href }: IProps) {
	return (
		<Link href={href} className='btn fancy-btn'>
			{label}
		</Link>
	);
}
