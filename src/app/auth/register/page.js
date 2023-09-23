"use client";

import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';

let validationSchema = yup.object({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(6).max(32)
});

const Register = () => {
    const [message, setMessage] = useState(null);
    const {setError, reset, register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(validationSchema)
    });

    const handleFormSubmit = async data => {
        setMessage(null);
        const url = process.env.NEXT_PUBLIC_API_URL + '/users'
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        if(res.ok) {
            setMessage("User registered succesfully.")
            reset()
        } else {
            const response = await res.json();
            setError('email', {message: response?.detail ?? "User Registration Failed", type: "error"})
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(handleFormSubmit)} autoComplete="off">
                {message && (
                    <div className='text-sm text-green-500'>{message}</div>
                )}
                <div className="mb-2">
                    <label htmlFor="first_name"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                    <input type="text" id="first_name"
                            {...register('first_name')}
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                        {errors['first_name'] ? (
                            <div className='text-sm text-red-500'>{errors['first_name'].message}</div>
                        ) : null}
                </div>
                <div className="mb-2">
                    <label htmlFor="last_name"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                    <input type="text" id="last_name"
                            {...register('last_name')}
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                    {errors['last_name'] ? (
                            <div className='text-sm text-red-500'>{errors['last_name'].message}</div>
                        ) : null}
                </div>
                <div className="mb-2">
                    <label htmlFor="email"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
                    <input type="email" id="email"
                            {...register('email')}
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                    {errors['email'] ? (
                            <div className='text-sm text-red-500'>{errors['email'].message}</div>
                        ) : null}
                </div>
                <div className="mb-4">
                    <label htmlFor="password"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="password" id="password"
                            {...register('password')}
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                    {errors['password'] ? (
                            <div className='text-sm text-red-500'>{errors['password'].message}</div>
                        ) : null}
                </div>
                <button type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Register
                </button>
            </form>
        </>
    );
}
export default Register;