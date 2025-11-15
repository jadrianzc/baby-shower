import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Alice, Bree_Serif } from 'next/font/google';
import './globals.css';
import AntdConfig from '@/components/AntConfig';

const railey = localFont({
	src: [
		{
			path: '../public/fonts/Railey.ttf',
			weight: '400',
			style: 'normal',
		},
	],
	variable: '--font-railey',
	// display: 'swap',
});

const breeSerif = Bree_Serif({
	variable: '--font-bree-serif',
	subsets: ['latin'],
	weight: ['400'],
});

const alice = Alice({
	variable: '--font-alice',
	subsets: ['latin'],
	weight: ['400'],
});

export const metadata: Metadata = {
	title: 'Baby Shower Stefano',
	description: 'Invitación al baby shower de Stefano',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='es'>
			<body
				className={`${breeSerif.variable} ${alice.variable} ${railey.variable} antialiased`}>
				<AntdConfig>{children}</AntdConfig>
			</body>
		</html>
	);
}
