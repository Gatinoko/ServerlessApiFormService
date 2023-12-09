'use client';

import React from 'react';
import {
	Navbar as Navigation,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	Button,
	Link,
	Dropdown,
	DropdownTrigger,
	Avatar,
	DropdownMenu,
	DropdownItem,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
('./login-signup-buttons/nav-content');
import { useContext } from 'react';
import { AuthContext } from '@/context/auth-context';
import { logoutUser } from './_actions/logout-user-action';

type NavbarProps = {};

export default function Navbar(props: NavbarProps) {
	// Router reference
	const router = useRouter();

	// Auth context information
	const { authInformation } = useContext(AuthContext);

	// Logout button handler function
	async function logoutButtonHandler() {
		await logoutUser();
	}

	return (
		<Navigation>
			<NavbarBrand
				as={Link}
				href='/'>
				<div className='w-fit h-fit p-1 py-0 bg-primary-100 rounded-md me-2 flex items-center justify-center font-medium text-2xl text-default-foreground'>
					SFAS
				</div>
				<p className='font-semibold text-default-foreground'>
					Serverless Form API Service
				</p>
			</NavbarBrand>

			<NavbarContent
				justify='end'
				className='flex gap-4'>
				{authInformation.isAuthenticated ? (
					<>
						{/* Avatar with dropdown menu */}
						<Dropdown placement='bottom-end'>
							{/* Avatar */}
							<DropdownTrigger>
								<Avatar
									isBordered
									as='button'
									className='transition-transform'
									size='sm'
									src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
								/>
							</DropdownTrigger>

							{/* Dropdown menu */}
							<DropdownMenu
								key='dropdown-menu'
								aria-label='Profile Actions'
								variant='flat'>
								{/* User profile */}
								<DropdownItem
									key='profile'
									className='h-14 gap-2'>
									<p className='font-semibold'>
										{`Welcome, ${authInformation.username}!`}
									</p>
									<p className='font-semibold text-primary-600'>
										{authInformation.email}
									</p>
								</DropdownItem>

								{/* User applications button */}
								<DropdownItem
									key='userApplications'
									href={`/user/${authInformation.username}/applications`}>
									Applications
								</DropdownItem>

								{/* My api keys page button */}
								<DropdownItem
									key='userApiKeys'
									href={`/user/${authInformation.username}/api-keys`}>
									API Keys
								</DropdownItem>

								{/* Logout button */}
								<DropdownItem
									key='logout'
									onClick={logoutButtonHandler}>
									Log Out
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</>
				) : (
					<>
						{/* Sign-up page button */}
						<NavbarItem>
							<Button
								as={Link}
								href='/sign-up'
								variant='light'>
								Sign Up
							</Button>
						</NavbarItem>

						{/* Login page button */}
						<NavbarItem>
							<Button
								as={Link}
								href='/login'
								variant='light'>
								Login
							</Button>
						</NavbarItem>
					</>
				)}
			</NavbarContent>
		</Navigation>
	);
}
