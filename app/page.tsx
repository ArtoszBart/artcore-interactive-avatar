import FancyButton from '@/components/FancyButton';
import InteractiveAvatar from '@/components/InteractiveAvatar';

export default function App() {
	return (
		<>
			<div className='info-container'>
				<div className='info-container-text'>
					<h1>Lorem ipsum dolor sit</h1>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu
						ligula dui. Quisque aliquam sapien sit amet leo mattis, eget
						sollicitudin tortor efficitur. Fusce venenatis elit at ultricies
						sagittis. Integer neque lacus, mollis congue sem facilisis,
						elementum posuere leo. Maecenas finibus augue sollicitudin, tempor
						ex vitae, tincidunt purus.
					</p>
				</div>
				<FancyButton label='Lorem Ipsum' href='/' />
			</div>
			<InteractiveAvatar />
		</>
	);
}
