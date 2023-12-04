'use server';

import { PropsWithChildren } from 'react';

export type ApplicationItemListProps = {
	className?: string;
} & PropsWithChildren;

export default async function ApplicationItemList({
	className,
	children,
}: ApplicationItemListProps) {
	return <ul className={`flex gap-4 flex-wrap ${className}`}>{children}</ul>;
}
