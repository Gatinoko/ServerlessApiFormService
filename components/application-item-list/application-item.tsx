'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export type ApplicationItemProps = {
	title: string;
	href: string;
};

export default function ApplicationItem({ href, title }: ApplicationItemProps) {
	return (
		<Link href={`${usePathname()}/${href}`}>
			<li className='flex flex-col w-48 h-48 bg-primary-50 rounded-3xl transition-scale duration-100 ease-in-out hover:bg-primary-200 active:scale-95 cursor-default'>
				<h2 className='flex justify-end flex-col h-full w-full text-clip text-xl font-semibold p-6 transition-opacity duration-100 ease-in-out opacity-50 hover:opacity-100 select-none'>
					{title}
				</h2>
			</li>
		</Link>
	);
}
