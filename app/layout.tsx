import Header from '@/components/Header';
import '@/styles/globals.scss';
import { Metadata } from 'next';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
	subsets: ['latin'],
	variable: '--font-sans',
	weight: ['300', '400', '500', '600'],
});

export const metadata: Metadata = {
	title: {
		default: 'Interaktywny Avatar - Demo',
		template: `%s - Interaktywny Avatar - Demo`,
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
