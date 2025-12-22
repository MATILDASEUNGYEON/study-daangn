'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/lib/authSlice';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/icons/logo.png';
import subfooter from '@/assets/images/subfooter.png';

export default function Login() {
    const router = useRouter();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        id: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            console.log(data);
            if (!res.ok) {
                throw new Error(data.message || '로그인에 실패했습니다.');
            }

            dispatch(
                loginSuccess({
                    user: data.user,
                    token: data.token,
                }),
            );

            router.push('/');
        } catch (err: unknown) {
            setError(
                err instanceof Error ? err.message : '로그인에 실패했습니다.',
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <div className="flex flex-col items-center pt-20 pb-30 px-4">
                <div className="flex flex-col items-center mb-10">
                    <Image
                        src={logo}
                        alt="logo"
                        width={200}
                        height={60}
                        className="object-contain"
                    />
                </div>

                <div className="w-full max-w-md rounded-xl border border-gray-300 p-8 shadow-sm">
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                            {error}
                        </div>
                    )}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label
                                htmlFor="id"
                                className="block text-sm font-medium text-gray-700"
                            >
                                ID
                            </label>
                            <input
                                id="id"
                                name="id"
                                type="text"
                                value={formData.id}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-700 focus:border-amber-500 focus:ring-amber-500"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-700 focus:border-amber-500 focus:ring-amber-500"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full rounded-md bg-amber-500 py-2 text-white font-semibold hover:bg-amber-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {isLoading ? '로그인 중...' : 'Sign In'}
                        </button>

                        <div className="flex justify-between text-sm mt-4">
                            <Link
                                href="/signup"
                                className="text-amber-600 hover:underline"
                            >
                                Register
                            </Link>
                            <a
                                href="#"
                                className="text-gray-600 hover:underline"
                            >
                                Forgot password?
                            </a>
                        </div>
                    </form>
                </div>
            </div>
            <div className="w-full mt-10">
                <Image src={subfooter} alt="subfooter" className="w-full" />
            </div>
        </div>
    );
}
