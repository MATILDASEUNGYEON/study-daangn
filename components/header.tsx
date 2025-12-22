'use client';

import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../lib/store';
import { logout } from '../lib/authSlice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import logo from '@/assets/icons/logo.png';
import profileIcon from '@/assets/icons/profileIcon.png';

export function HeaderImpl() {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLogin);
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });

            dispatch(logout());

            router.push('/');
        } catch (error) {
            console.error('로그아웃 오류:', error);
        }
    };

    return (
        <header className="w-full h-20 bg-white flex items-center">
            <Link href="/" className="flex cursor-pointer ">
                <Image
                    src={logo}
                    alt="logo"
                    width={180}
                    height={60}
                    className="object-contain"
                />
            </Link>

            <div className="flex-1"></div>

            <div className="flex items-center gap-6">
                {isLoggedIn ? (
                    <>
                        <Link href="/mypage">
                            <Button
                                variant="ghost"
                                size="lg"
                                className="bg-amber-500 text-white hover:bg-amber-600"
                            >
                                <Image
                                    src={profileIcon}
                                    alt="profileIcon"
                                    width={20}
                                    height={20}
                                    className="object-contain mr-2"
                                />
                                {user?.username}
                            </Button>
                        </Link>
                        <Button
                            variant="ghost"
                            size="lg"
                            className="bg-amber-500 text-white hover:bg-amber-600"
                            onClick={handleLogout}
                        >
                            로그아웃
                        </Button>
                    </>
                ) : (
                    <>
                        <Link href="/login">
                            <Button
                                variant="ghost"
                                size="lg"
                                className="bg-amber-500 text-white hover:bg-amber-600"
                            >
                                로그인
                            </Button>
                        </Link>
                        <Link href="/signup">
                            <Button
                                variant="ghost"
                                size="lg"
                                className="bg-amber-500 text-white hover:bg-amber-600"
                            >
                                회원가입
                            </Button>
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
}
