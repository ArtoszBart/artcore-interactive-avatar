import FancyButton from '@/components/FancyButton';
import InteractiveAvatar from '@/components/InteractiveAvatar';

export default function App() {
	return (
		<>
			<div className='info-container'>
				<div className='info-container-text'>
					<h1>Skonfiguruj swoje wymarzone auto</h1>
					{/* <p>
						Doradca klienta Automotive pomoże ci dobrać samochód
						idealnie dopasowany pod twoje preferencje
					</p> */}
				</div>
				<FancyButton
					label='Bezpłatna Konsultacja'
					href='https://www.artcore.pl/kontakt'
				/>
			</div>
			<InteractiveAvatar />
		</>
	);
}
