'use client';

import StreamingAvatar, {
	AvatarQuality,
	StreamingEvents,
	VoiceEmotion,
} from '@heygen/streaming-avatar';
import {
	Card,
	CardBody,
	CardFooter,
	Divider,
	Select,
	SelectItem,
	Spinner,
} from '@nextui-org/react';
import { useEffect, useRef, useState } from 'react';
import { usePrevious } from 'ahooks';

import InteractiveAvatarTextInput from './InteractiveAvatarTextInput';

import { LANGUAGE_LIST } from '@/app/lib/constants';

export default function InteractiveAvatar() {
	const [isLoadingSession, setIsLoadingSession] = useState(false);
	const [isLoadingRepeat, setIsLoadingRepeat] = useState(false);
	const [stream, setStream] = useState<MediaStream>();
	const [language, setLanguage] = useState<string>('pl');

	const [text, setText] = useState<string>('');
	const mediaStream = useRef<HTMLVideoElement>(null);
	const avatar = useRef<StreamingAvatar | null>(null);
	const [isAvatarTalking, setIsAvatarTalking] = useState(false);

	async function fetchAccessToken() {
		try {
			const response = await fetch('/api/get-access-token', {
				method: 'POST',
			});
			const token = await response.text();

			return token;
		} catch (error) {
			console.error('Error fetching access token:', error);
		}

		return '';
	}

	async function startSession() {
		setIsLoadingSession(true);
		const newToken = await fetchAccessToken();

		avatar.current = new StreamingAvatar({
			token: newToken,
		});
		avatar.current.on(StreamingEvents.AVATAR_START_TALKING, () => {
			setIsAvatarTalking(true);
		});
		avatar.current.on(StreamingEvents.AVATAR_STOP_TALKING, () => {
			setIsAvatarTalking(false);
		});
		avatar.current.on(StreamingEvents.STREAM_DISCONNECTED, () => {
			endSession();
		});
		avatar.current?.on(StreamingEvents.STREAM_READY, (event) => {
			setStream(event.detail);
		});
		try {
			await avatar.current.createStartAvatar({
				quality: AvatarQuality.High,
				avatarName: '37f4d912aa564663a1cf8d63acd0e1ab',
				knowledgeId: '4eec5d4c68304528b885efdf795e6edd',
				voice: {
					emotion: VoiceEmotion.SERIOUS,
				},
				language: language,
			});

			// await avatar.current?.startVoiceChat();
		} catch (error) {
			console.error('Error starting avatar session:', error);
		} finally {
			setIsLoadingSession(false);
		}
	}

	async function handleSpeak() {
		setIsLoadingRepeat(true);
		if (!avatar.current) {
			return;
		}
		await avatar.current.speak({ text: text }).catch((e) => {
			console.log(e.message);
		});
		setIsLoadingRepeat(false);
	}

	async function endSession() {
		await avatar.current?.stopAvatar();
		setStream(undefined);
	}

	const previousText = usePrevious(text);
	useEffect(() => {
		if (!previousText && text) {
			avatar.current?.startListening();
		} else if (previousText && !text) {
			avatar?.current?.stopListening();
		}
	}, [text, previousText]);

	useEffect(() => {
		return () => {
			endSession();
		};
	}, []);

	useEffect(() => {
		const sendInitText = async () => {
			setIsLoadingRepeat(true);
			await avatar.current?.speak({ text: 'hi' }).catch((e) => {
				console.log(e.message);
			});
			setIsLoadingRepeat(false);
		};
		if (stream && mediaStream.current) {
			mediaStream.current.srcObject = stream;
			mediaStream.current.onloadedmetadata = () => {
				mediaStream.current!.play();
				sendInitText();
			};
		}

		return () => {
			sendInitText();
		};
	}, [mediaStream, stream]);

	useEffect(() => {
		if (stream && mediaStream.current) {
			console.log('LOADED', new Date());
		}
	}, [mediaStream, stream]);

	return (
		<div className='avatar'>
			<Card>
				<CardBody className='h-[500px] flex flex-col justify-center items-center'>
					{stream ? (
						<div className='h-[500px] w-[846px] justify-center items-center flex rounded-lg overflow-hidden video-container'>
							<video
								ref={mediaStream}
								autoPlay
								playsInline
								style={{
									width: '100%',
									height: '100%',
									objectFit: 'contain',
								}}
							>
								<track kind='captions' />
							</video>
						</div>
					) : !isLoadingSession ? (
						<div className='preconnect-container'>
							<Select
								label='Wybierz język'
								placeholder='Wybierz język'
								className='max-w-xs'
								selectedKeys={[language]}
								onChange={(e) => {
									setLanguage(e.target.value);
								}}
							>
								{LANGUAGE_LIST.map((lang) => (
									<SelectItem key={lang.key}>
										{lang.label}
									</SelectItem>
								))}
							</Select>
							<button id='start-session' onClick={startSession}>
								Rozpocznij sesję
							</button>
						</div>
					) : (
						<Spinner color='default' size='lg' />
					)}
				</CardBody>
				<Divider />
				{stream && (
					<CardFooter className='flex flex-col gap-3 relative'>
						<div className='w-full flex relative'>
							<InteractiveAvatarTextInput
								disabled={!stream || isAvatarTalking}
								input={text}
								label='Okno czatu'
								loading={isLoadingRepeat}
								placeholder='Napisz wiadomość, aby avatar odpowiedział'
								setInput={setText}
								onSubmit={handleSpeak}
							/>
						</div>
					</CardFooter>
				)}
			</Card>
		</div>
	);
}
