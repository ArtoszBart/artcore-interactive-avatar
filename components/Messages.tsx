import { LANGUAGE_LIST } from '@/app/lib/constants';
import ILanguage from '@/models/ILanguage';
import IMessage from '@/models/IMessage';
import React from 'react';

interface IProps {
	messages: IMessage[];
	language: string;
}

const Messages = ({ messages, language }: IProps) => {
	const userString = (
		LANGUAGE_LIST.find((lang) => lang.key === language) as ILanguage
	).userName;

	return (
		<div className='messages'>
			{messages.map((message, index) => {
				const displayedUser =
					message.user === 0 ? 'Hyundai Expert' : userString;
				return (
					<div
						key={index}
						className={`message ${message.user === 0 ? 'message-avatar' : 'message-human'}`}
					>
						<span>{displayedUser}:</span>
						<p>{message.message}</p>
					</div>
				);
			})}
		</div>
	);
};

export default Messages;
