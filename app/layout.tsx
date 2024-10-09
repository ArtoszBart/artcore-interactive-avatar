import '@/styles/globals.scss';
import Header from '@/components/Header';
import { Poppins } from 'next/font/google';
import { Metadata } from 'next';

const poppins = Poppins({
	subsets: ['latin'],
	variable: '--font-sans',
	weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
	title: {
		default: 'Interaktywny Avatar - Art Core',
		template: `%s - Interaktywny Avatar - Art Core`,
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			suppressHydrationWarning
			lang='pl'
			className={`${poppins.variable} font-sans`}
		>
			<head />
			<body>
				<Header />
				<main className=''>{children}</main>
			</body>
		</html>
	);
}
