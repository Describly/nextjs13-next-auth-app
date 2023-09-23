"use client";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
    const {data: session, status} = useSession();

    if(status == 'loading') {
        return null;
    }

    return (
        <>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
                    <Link href="/" className="flex items-center">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo"/>
                        <span
                            className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">NextAuthApp</span>
                    </Link>
                    {status === 'authenticated' ? (
                        <>
                        <button
                            onClick={() => signOut()}
                            className="text-gray-800 bg-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                            type="button"> {session.user?.name} - Logout
                        </button>
                        </>
                    ) : (

                        <>
                        <div className="flex items-center">
                        <Link href="/auth/register"
                        className="mr-6 text-sm text-gray-500 dark:text-white hover:underline">Register</Link>
                        <Link href="/auth/login"
                        className="text-sm text-blue-600 dark:text-blue-500 hover:underline">Login</Link>
                        </div>
                        </>
                    )}
                </div>
            </nav>
            <nav className="bg-gray-50 dark:bg-gray-700">
                <div className="max-w-screen-xl px-4 py-3 mx-auto">
                    <div className="flex items-center">
                        <ul className="flex flex-row mt-0 mr-6 space-x-8 text-sm font-medium">
                            <li>
                                <Link href="/" className="text-gray-900 dark:text-white hover:underline"
                                   aria-current="page">Home</Link>
                            </li>
                            <li>
                                <a href="#" className="text-gray-900 dark:text-white hover:underline">Menu1</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-900 dark:text-white hover:underline">Menu2</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-900 dark:text-white hover:underline">Menu3</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;