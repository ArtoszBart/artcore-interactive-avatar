export enum UserType {
	AVATAR = 0,
	HUMAN = 1,
}

export default interface IMessage {
	user: UserType;
	message: string;
}
