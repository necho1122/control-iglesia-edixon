import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata = {
	title: 'Fuente del Nuevo Pacto',
	description:
		'Control finanzas y donaciones de la Iglesia Fuente del Nuevo Pacto',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<Navbar />
				{children}
			</body>
		</html>
	);
}
