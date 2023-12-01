'use client';

import React, { useEffect, useState } from 'react';
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
	Input,
	Image,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
('./login-signup-buttons/nav-content');
import { useContext } from 'react';
import { AuthContext } from '@/context/auth-context';
import { logoutUser } from './actions/logout-user-action';

type NavigationProps = {
	jwtToken?: any;
};

export default function Navbar({ jwtToken }: NavigationProps) {
	// Router reference
	const router = useRouter();

	// Auth context information
	const { authInformation, setAuthInformation } = useContext(AuthContext);

	// Logout button handler function
	async function logoutButtonHandler() {
		await logoutUser();
		router.refresh();
	}

	useEffect(() => {
		// If token is present, update the auth context
		if (jwtToken)
			setAuthInformation({
				isAuthenticated: true,
				firstName: jwtToken.firstName,
				lastName: jwtToken.lastName,
				email: jwtToken.email,
				username: jwtToken.username,
			});
	}, [jwtToken, setAuthInformation]);

	return (
		<Navigation className=''>
			<NavbarBrand
				as={Link}
				href='/'>
				<div className='w-fit h-fit p-1 py-0 bg-primary-600 rounded-md me-2 flex items-center justify-center font-extralight text-2xl text-white'>
					SFAS
				</div>
				<p className='font-semibold text-default-foreground'>
					Serverless Form API Service
				</p>
			</NavbarBrand>

			<NavbarContent
				justify='end'
				className='flex gap-4'>
				{jwtToken ? (
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
								aria-label='Profile Actions'
								variant='flat'>
								{/* User profile */}
								<DropdownItem
									key='profile'
									className='h-14 gap-2'>
									<p className='font-semibold'>
										{`Welcome, ${authInformation.username}!`}
									</p>
									<p className=' text-green-500'>zoey@example.com</p>
								</DropdownItem>

								{/* Logout button */}
								<DropdownItem
									key='logout'
									onClick={logoutButtonHandler}>
									Log Out
								</DropdownItem>

								{/* My videos page button */}
								<DropdownItem
									key='myVideos'
									href='/my-videos'>
									My Videos
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
