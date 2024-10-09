import Image from 'next/image';
import logo from '@/assets/logo.png';

export default function Header() {
	return (
		<header>
			<div className='logo-container'>
				<Image
					src={logo}
					alt='logo'
					height={312}
					width={261}
					style={{ width: '100%', height: 'auto' }}
				/>
			</div>
		</header>
	);
}
